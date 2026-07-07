"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cgnirfmiqkhplauezrqs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4CGmhhkYc_3cSJklGwb8xA_VBLv5_jB";

const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface WeekRow {
  wallet: string;
  username: string;
  emoji?: string;
  balance: number;
  score: number;
  rank: number;
}

interface WeekData {
  week_id: string;
  rows: WeekRow[];
}

function shortWallet(w: string) {
  if (!w || w.length < 10) return w;
  return w.slice(0, 4) + "…" + w.slice(-4);
}

function formatNum(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

function formatWeekId(id: string) {
  // "2026-W26" → "Week 26 · 2026"
  const [year, week] = id.split("-W");
  return `Week ${week} · ${year}`;
}

const PODIUM_COLORS = [
  {
    border: "rgba(255,215,0,0.6)",
    glow: "rgba(255,215,0,0.2)",
    label: "rgba(255,215,0,0.9)",
  },
  {
    border: "rgba(192,192,192,0.6)",
    glow: "rgba(192,192,192,0.15)",
    label: "rgba(192,192,192,0.9)",
  },
  {
    border: "rgba(205,127,50,0.6)",
    glow: "rgba(205,127,50,0.15)",
    label: "rgba(205,127,50,0.9)",
  },
];

const MEDAL = ["🥇", "🥈", "🥉"];
const RANK_LABEL = ["1st", "2nd", "3rd"];

/* ── Announcement placeholder (shown when no data yet) ── */
function ComingSoonState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Top banner */}
      <div
        className="w-full py-3 flex items-center justify-center gap-2"
        style={{
          background: "rgba(200,169,75,0.08)",
          borderBottom: "1px solid rgba(200,169,75,0.15)",
        }}
      >
        <span
          className="text-[10px] font-black uppercase tracking-[0.35em]"
          style={{ color: "rgba(200,169,75,0.7)" }}
        >
          Season 1 · First Airdrop
        </span>
      </div>

      <div className="py-14 px-6 flex flex-col items-center gap-5">
        {/* Trophy */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(200,169,75,0.08)",
            border: "1px solid rgba(200,169,75,0.25)",
            boxShadow: "0 0 32px rgba(200,169,75,0.1)",
          }}
        >
          <span className="text-4xl">🏆</span>
        </div>

        {/* Headline */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
            Will be announced
          </h3>
          <p
            className="text-2xl md:text-3xl font-black"
            style={{ color: "#c8a94b" }}
          >
            next week
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-16 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(200,169,75,0.4), transparent)",
          }}
        />

        {/* Sub text */}
        <p
          className="text-sm text-center max-w-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          The first weekly winners will be revealed soon. Play the game, climb
          the leaderboard, and earn your spot on the podium.
        </p>

        {/* Fake podium silhouette */}
        <div className="flex items-end gap-3 mt-2 opacity-20">
          {[60, 80, 48].map((h, i) => (
            <div
              key={i}
              className="w-14 rounded-t-lg flex items-end justify-center pb-2"
              style={{
                height: h,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="text-lg">
                {MEDAL[i === 0 ? 1 : i === 1 ? 0 : 2]}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#game"
          className="mt-1 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(200,169,75,0.12)",
            border: "1px solid rgba(200,169,75,0.35)",
            color: "#c8a94b",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Play Now to Qualify
        </a>
      </div>
    </motion.div>
  );
}

/* ── Podium card for top 3 ── */
function PodiumCard({
  row,
  rankIndex,
  inView,
}: {
  row: WeekRow;
  rankIndex: number;
  inView: boolean;
}) {
  const c = PODIUM_COLORS[rankIndex];
  const isFirst = rankIndex === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + rankIndex * 0.12 }}
      className="flex flex-col items-center rounded-2xl p-5 relative"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 32px ${c.glow}`,
        order: rankIndex === 0 ? 0 : rankIndex === 1 ? -1 : 1,
      }}
    >
      {/* Medal */}
      <span className="text-4xl mb-2">{MEDAL[rankIndex]}</span>

      {/* Avatar circle */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `2px solid ${c.border}`,
          boxShadow: isFirst ? `0 0 20px ${c.glow}` : undefined,
        }}
      >
        {row.emoji || "🦍"}
      </div>

      {/* Name */}
      <p className="font-black text-white text-sm mb-0.5 truncate max-w-full">
        {row.username || "Anonymous"}
      </p>
      <p
        className="text-[10px] font-mono mb-3"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {shortWallet(row.wallet)}
      </p>

      {/* Score */}
      <div
        className="w-full text-center py-2 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${c.border}`,
        }}
      >
        <p className="font-black text-lg" style={{ color: c.label }}>
          {formatNum(row.score)}
          <span
            className="text-[10px] font-normal ml-1"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            pts
          </span>
        </p>
        <p
          className="text-[9px] uppercase tracking-widest font-bold"
          style={{ color: c.label, opacity: 0.6 }}
        >
          {RANK_LABEL[rankIndex]}
        </p>
      </div>
    </motion.div>
  );
}

export default function WeeklyWinnersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeks = async () => {
      // Get all distinct week_ids
      const { data: weekIds } = await sb
        .from("weekly_results")
        .select("week_id")
        .order("week_id", { ascending: false });

      if (!weekIds || weekIds.length === 0) {
        setLoading(false);
        return;
      }

      const uniqueWeeks = [...new Set(weekIds.map((r) => r.week_id))];

      // Fetch all rows for each week
      const allWeeks: WeekData[] = [];
      for (const wid of uniqueWeeks) {
        const { data } = await sb
          .from("weekly_results")
          .select("wallet,username,balance,score,rank")
          .eq("week_id", wid)
          .order("rank", { ascending: true })
          .limit(20);

        if (data && data.length > 0) {
          allWeeks.push({ week_id: wid, rows: data as WeekRow[] });
        }
      }

      setWeeks(allWeeks);
      if (allWeeks.length > 0) setSelectedWeek(allWeeks[0].week_id);
      setLoading(false);
    };

    fetchWeeks();
  }, []);

  const currentWeekData = weeks.find((w) => w.week_id === selectedWeek);
  const hasData = !loading && weeks.length > 0;

  return (
    <section
      ref={ref}
      className="relative section-padding"
      style={{ paddingTop: "1rem" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <span
              className="text-[10px] tracking-[0.4em] uppercase font-medium block mb-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Weekly Airdrop
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-none">
              Hall of <span className="gradient-text">Fame</span>
            </h3>
          </div>

          {/* Week selector — only shown when there's data */}
          {hasData && weeks.length > 1 && (
            <select
              value={selectedWeek ?? ""}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="text-[10px] font-bold uppercase tracking-wider rounded-lg px-3 py-2 outline-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {weeks.map((w) => (
                <option
                  key={w.week_id}
                  value={w.week_id}
                  style={{ background: "#0a0a0a" }}
                >
                  {formatWeekId(w.week_id)}
                </option>
              ))}
            </select>
          )}
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 flex flex-col items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-full border-2"
                style={{
                  borderColor: "rgba(200,169,75,0.4)",
                  borderTopColor: "transparent",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Loading…
              </span>
            </motion.div>
          ) : !hasData ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ComingSoonState />
            </motion.div>
          ) : (
            <motion.div
              key={selectedWeek}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {/* Week label */}
              {selectedWeek && (
                <p
                  className="text-[10px] uppercase tracking-widest font-bold text-center mb-6"
                  style={{ color: "rgba(200,169,75,0.6)" }}
                >
                  {formatWeekId(selectedWeek)}
                </p>
              )}

              {/* Podium — top 3 */}
              {currentWeekData && currentWeekData.rows.length >= 1 && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {currentWeekData.rows.slice(0, 3).map((row, i) => (
                    <PodiumCard
                      key={row.wallet}
                      row={row}
                      rankIndex={i}
                      inView={inView}
                    />
                  ))}
                </div>
              )}

              {/* Remaining ranks 4–20 */}
              {currentWeekData && currentWeekData.rows.length > 3 && (
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Table header */}
                  <div
                    className="grid px-5 py-3"
                    style={{
                      gridTemplateColumns: "36px 1fr auto auto",
                      gap: "0.75rem",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {["#", "Player", "Score", "Holdings"].map((h) => (
                      <span
                        key={h}
                        className="text-[9px] uppercase tracking-widest font-bold"
                        style={{
                          color: "rgba(255,255,255,0.2)",
                          textAlign:
                            h === "Score" || h === "Holdings"
                              ? "right"
                              : "left",
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {currentWeekData.rows.slice(3).map((row, i) => (
                    <div
                      key={row.wallet}
                      className="grid px-5 py-3.5"
                      style={{
                        gridTemplateColumns: "36px 1fr auto auto",
                        gap: "0.75rem",
                        alignItems: "center",
                        borderBottom:
                          i < currentWeekData.rows.length - 4
                            ? "1px solid rgba(255,255,255,0.04)"
                            : "none",
                      }}
                    >
                      <span
                        className="text-xs font-black text-center"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      >
                        {row.rank}
                      </span>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base leading-none flex-shrink-0">
                          {row.emoji || "🦍"}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-white truncate leading-tight">
                            {row.username || "Anonymous"}
                          </p>
                          <p
                            className="text-[10px] font-mono truncate leading-tight"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                          >
                            {shortWallet(row.wallet)}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-black text-sm text-right"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {formatNum(row.score)}
                        <span
                          className="text-[9px] font-normal ml-0.5"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          pts
                        </span>
                      </span>
                      <span
                        className="text-xs font-medium text-right"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {formatNum(row.balance)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-[10px] mt-5"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          Winners are snapshotted every Monday · Airdrop distributed to top
          holders
        </motion.p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
