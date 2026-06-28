// =====================================================================
//  Supabase Edge Function: snapshot-holders   (OPTIONAL but recommended)
// ---------------------------------------------------------------------
//  Re-checks every registered wallet's REAL on-chain Kiyomasa balance and
//  writes verified balances + a weekly snapshot. Run this weekly to get a
//  TRUSTWORTHY airdrop list (browsers can't fake these numbers).
//
//  Deploy:
//    supabase functions deploy snapshot-holders --no-verify-jwt
//    supabase secrets set SOLANA_RPC_URL="https://mainnet.helius-rpc.com/?api-key=KEY"
//    supabase secrets set TOKEN_MINT="ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
//  (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)
//
//  Schedule weekly (Supabase Dashboard → Edge Functions → Schedules, or via
//  pg_cron + pg_net). Example cron: 0 0 * * 1  (Mondays 00:00 UTC).
// =====================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RPC   = Deno.env.get('SOLANA_RPC_URL')!;
const MINT  = Deno.env.get('TOKEN_MINT')!;
const SB_URL = Deno.env.get('SUPABASE_URL')!;
const SB_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

async function getBalance(wallet: string): Promise<number> {
  const res = await fetch(RPC, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'getTokenAccountsByOwner',
      params: [wallet, { mint: MINT }, { encoding: 'jsonParsed' }],
    }),
  });
  const json = await res.json();
  let total = 0;
  for (const acc of json.result?.value ?? []) {
    const amt = acc.account?.data?.parsed?.info?.tokenAmount;
    if (amt && typeof amt.uiAmount === 'number') total += amt.uiAmount;
  }
  return total;
}

const isoWeek = (d = new Date()) => {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - day + 3);
  const firstThu = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((+t - +firstThu) / 864e5 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
};

Deno.serve(async () => {
  const sb = createClient(SB_URL, SB_KEY);

  // 1) fetch all registered wallets
  const { data: holders, error } = await sb.from('holders').select('wallet, username');
  if (error) return new Response(error.message, { status: 500 });

  // 2) re-check each balance on-chain (throttled) and store the verified value
  const verified: { wallet: string; username: string; balance: number }[] = [];
  for (const h of holders ?? []) {
    try {
      const balance = await getBalance(h.wallet);
      await sb.from('holders').update({ balance, updated_at: new Date().toISOString() }).eq('wallet', h.wallet);
      verified.push({ wallet: h.wallet, username: h.username, balance });
    } catch (_e) { /* skip on RPC error */ }
    await new Promise((r) => setTimeout(r, 120));
  }

  // 3) write the weekly snapshot (ranked) = the airdrop list
  verified.sort((a, b) => b.balance - a.balance);
  const week_id = isoWeek();
  const rows = verified.map((v, i) => ({ week_id, ...v, rank: i + 1 }));
  if (rows.length) await sb.from('weekly_results').insert(rows);

  return new Response(JSON.stringify({ ok: true, week_id, count: rows.length }), {
    headers: { 'content-type': 'application/json' },
  });
});
