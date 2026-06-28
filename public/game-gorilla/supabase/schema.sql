-- =====================================================================
--  Kiyomasa Holder Hub — Supabase schema
--  Paste this whole file into the Supabase SQL Editor and click "Run".
--  Gives you: shared registration, globally-unique usernames, a shared
--  leaderboard, and an automatic weekly archive (airdrop list) via pg_cron.
-- =====================================================================

-- ---------- Tables ----------

-- Persistent holder registrations (username does NOT reset weekly)
create table if not exists public.holders (
  wallet     text primary key,
  username   text not null,
  bio        text        default '',
  emoji      text        default '🦍',
  balance    numeric     default 0,
  joined_at  timestamptz default now(),
  updated_at timestamptz default now()
);

-- Globally unique username (case-insensitive): "Gorilla" == "gorilla"
create unique index if not exists holders_username_lc_idx on public.holders (lower(username));
create index if not exists holders_balance_idx on public.holders (balance desc);

-- Weekly snapshot of standings = your airdrop record / "previous weeks"
create table if not exists public.weekly_results (
  id          bigint generated always as identity primary key,
  week_id     text not null,                 -- e.g. 2026-W26
  wallet      text not null,
  username    text not null,
  balance     numeric not null,
  rank        int not null,
  snapshot_at timestamptz default now()
);
create index if not exists weekly_results_week_idx on public.weekly_results (week_id);

-- ---------- Write functions (enforce unique username) ----------
-- All writes go through these SECURITY DEFINER functions so the tables stay
-- locked down (see RLS below). Username uniqueness is enforced here AND by the
-- unique index, so two people can never share a name.

create or replace function public.register_holder(
  p_wallet text, p_username text, p_bio text, p_emoji text, p_balance numeric
) returns public.holders
language plpgsql security definer set search_path = public as $$
declare result public.holders;
begin
  if exists (select 1 from public.holders
             where lower(username) = lower(p_username) and wallet <> p_wallet) then
    raise exception 'USERNAME_TAKEN';
  end if;

  insert into public.holders (wallet, username, bio, emoji, balance)
  values (p_wallet, left(p_username,20), left(coalesce(p_bio,''),80), coalesce(nullif(p_emoji,''),'🦍'), coalesce(p_balance,0))
  on conflict (wallet) do update
    set username = excluded.username, bio = excluded.bio,
        emoji = excluded.emoji, balance = excluded.balance, updated_at = now()
  returning * into result;
  return result;
end $$;

create or replace function public.update_username(p_wallet text, p_username text)
returns public.holders
language plpgsql security definer set search_path = public as $$
declare result public.holders;
begin
  if exists (select 1 from public.holders
             where lower(username) = lower(p_username) and wallet <> p_wallet) then
    raise exception 'USERNAME_TAKEN';
  end if;
  update public.holders set username = left(p_username,20), updated_at = now()
  where wallet = p_wallet returning * into result;
  return result;
end $$;

create or replace function public.set_balance(p_wallet text, p_balance numeric)
returns public.holders
language plpgsql security definer set search_path = public as $$
declare result public.holders;
begin
  update public.holders set balance = coalesce(p_balance,0), updated_at = now()
  where wallet = p_wallet returning * into result;
  return result;
end $$;

-- ---------- Row Level Security ----------
-- Anyone may READ holders + weekly_results (public leaderboard).
-- Nobody may write tables directly; writes only via the functions above.

alter table public.holders        enable row level security;
alter table public.weekly_results enable row level security;

drop policy if exists holders_read on public.holders;
create policy holders_read on public.holders for select using (true);

drop policy if exists weekly_read on public.weekly_results;
create policy weekly_read on public.weekly_results for select using (true);

-- allow the browser (anon) to call the write functions
grant execute on function public.register_holder(text,text,text,text,numeric) to anon;
grant execute on function public.update_username(text,text)                  to anon;
grant execute on function public.set_balance(text,numeric)                   to anon;

-- ---------- Weekly archive (airdrop list) via pg_cron ----------
-- Snapshots the PREVIOUS week's standings into weekly_results every Monday 00:05 UTC.

create extension if not exists pg_cron;

create or replace function public.snapshot_week() returns void
language sql security definer set search_path = public as $$
  insert into public.weekly_results (week_id, wallet, username, balance, rank)
  select to_char(now() - interval '1 day', 'IYYY-"W"IW'),
         wallet, username, balance,
         row_number() over (order by balance desc)
  from public.holders;
$$;

-- (re)schedule the job
select cron.unschedule('kiyomasa-weekly-snapshot')
  where exists (select 1 from cron.job where jobname = 'kiyomasa-weekly-snapshot');
select cron.schedule('kiyomasa-weekly-snapshot', '5 0 * * 1', $$ select public.snapshot_week(); $$);

-- =====================================================================
--  GAME POINTS (score) — leaderboard ranks by this. Safe to re-run.
-- =====================================================================
alter table public.holders        add column if not exists score numeric default 0;
alter table public.weekly_results add column if not exists score numeric default 0;
create index if not exists holders_score_idx on public.holders (score desc);

create or replace function public.set_score(p_wallet text, p_score numeric)
returns public.holders
language plpgsql security definer set search_path = public as $$
declare result public.holders;
begin
  update public.holders set score = coalesce(p_score,0), updated_at = now()
  where wallet = p_wallet returning * into result;
  return result;
end $$;
grant execute on function public.set_score(text,numeric) to anon;

-- weekly snapshot now ranks by game points (score), holdings as tiebreak
create or replace function public.snapshot_week() returns void
language sql security definer set search_path = public as $$
  insert into public.weekly_results (week_id, wallet, username, balance, score, rank)
  select to_char(now() - interval '1 day', 'IYYY-"W"IW'),
         wallet, username, balance, score,
         row_number() over (order by score desc, balance desc)
  from public.holders;
$$;

-- =====================================================================
--  IMPORTANT (airdrop fairness):
--  The leaderboard balances are written by browsers, so they are best-effort
--  and could be gamed. For a TRUSTWORTHY airdrop, snapshot real on-chain
--  holdings instead — see supabase/functions/snapshot-holders (Edge Function)
--  in the README. Use that function's output as the payout list.
-- =====================================================================
