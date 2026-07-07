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
        <div
          className="w-16 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(200,169,75,0.4), transparent)",
          }}
        />
        <p
          className="text-sm text-center max-w-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          The first weekly winners will be revealed soon. Play the game, climb
          the leaderboard, and earn your spot on the podium.
        </p>
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
      transition={{ duration: 0.5, delay: 0.05 + rankIndex * 0.1 }}
      className="flex flex-col items-center rounded-2xl p-4 relative"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 24px ${c.glow}`,
        order: rankIndex === 0 ? 0 : rankIndex === 1 ? -1 : 1,
      }}
    >
      <span className="text-3xl mb-1.5">{MEDAL[rankIndex]}</span>
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `2px solid ${c.border}`,
          boxShadow: isFirst ? `0 0 16px ${c.glow}` : undefined,
        }}
      >
        {row.emoji || "🦍"}
      </div>
      <p className="font-black text-white text-xs mb-0.5 truncate max-w-full text-center">
        {row.username || "Anonymous"}
      </p>
      <p
        className="text-[9px] font-mono mb-2 truncate max-w-full"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {shortWallet(row.wallet)}
      </p>
      <div
        className="w-full text-center py-1.5 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${c.border}`,
        }}
      >
        <p className="font-black text-base" style={{ color: c.label }}>
          {formatNum(row.score)}
          <span
            className="text-[9px] font-normal ml-1"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            pts
          </span>
        </p>
        <p
          className="text-[8px] uppercase tracking-widest font-bold"
          style={{ color: c.label, opacity: 0.6 }}
        >
          {RANK_LABEL[rankIndex]}
        </p>
      </div>
    </motion.div>
  );
}

function WeekAccordion({
  weekData,
  isExpanded,
  onToggle,
  inView,
  isLatest,
}: {
  weekData: WeekData;
  isExpanded: boolean;
  onToggle: () => void;
  inView: boolean;
  isLatest: boolean;
}) {
  const top3 = weekData.rows.slice(0, 3);
  const rest = weekData.rows.slice(3);
  const winner = top3[0];

  return (
    <div
      className="rounded-2xl overflow-hidden mb-3"
      style={{
        background: isExpanded
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.015)",
        border: isExpanded
          ? "1px solid rgba(200,169,75,0.2)"
          : "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      {/* Accordion header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Badge */}
          {isLatest && (
            <span
              className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: "rgba(200,169,75,0.15)",
                border: "1px solid rgba(200,169,75,0.4)",
                color: "#c8a94b",
              }}
            >
              Latest
            </span>
          )}
          <span className="font-black text-sm text-white">
            {formatWeekId(weekData.week_id)}
          </span>
          {winner && (
            <span
              className="text-[10px] truncate hidden sm:block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              🥇 {winner.username || "Anonymous"} · {formatNum(winner.score)}{" "}
              pts
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
          <span
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {weekData.rows.length} players
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: "rgba(255,255,255,0.3)",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              flexShrink: 0,
            }}
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </button>

      {/* Accordion content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-4 pb-4 pt-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Week label */}
              <p
                className="text-[9px] uppercase tracking-widest font-bold text-center py-3"
                style={{ color: "rgba(200,169,75,0.5)" }}
              >
                {formatWeekId(weekData.week_id)} — Airdrop Results
              </p>

              {/* Podium */}
              {top3.length >= 1 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {top3.map((row, i) => (
                    <PodiumCard
                      key={row.wallet}
                      row={row}
                      rankIndex={i}
                      inView={inView}
                    />
                  ))}
                </div>
              )}

              {/* Ranks 4–20 */}
              {rest.length > 0 && (
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Table header */}
                  <div
                    className="grid px-4 py-2"
                    style={{
                      gridTemplateColumns: "32px 1fr auto auto",
                      gap: "0.75rem",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {["#", "Player", "Score", "Holdings"].map((h, i) => (
                      <span
                        key={h}
                        className="text-[8px] uppercase tracking-widest font-bold"
                        style={{
                          color: "rgba(255,255,255,0.18)",
                          textAlign: i >= 2 ? "right" : "left",
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  {rest.map((row, i) => (
                    <div
                      key={row.wallet}
                      className="grid px-4 py-3"
                      style={{
                        gridTemplateColumns: "32px 1fr auto auto",
                        gap: "0.75rem",
                        alignItems: "center",
                        borderBottom:
                          i < rest.length - 1
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
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm leading-none flex-shrink-0">
                          {row.emoji || "🦍"}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-white truncate leading-tight">
                            {row.username || "Anonymous"}
                          </p>
                          <p
                            className="text-[9px] font-mono truncate leading-tight"
                            style={{ color: "rgba(255,255,255,0.22)" }}
                          >
                            {shortWallet(row.wallet)}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-black text-xs text-right"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {formatNum(row.score)}
                        <span
                          className="text-[8px] font-normal ml-0.5"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          pts
                        </span>
                      </span>
                      <span
                        className="text-[10px] font-medium text-right"
                        style={{ color: "rgba(255,255,255,0.28)" }}
                      >
                        {formatNum(row.balance)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WeeklyWinnersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeks = async () => {
      const { data, error } = await sb
        .from("weekly_results")
        .select("week_id,wallet,username,balance,score,rank")
        .order("week_id", { ascending: false })
        .order("rank", { ascending: true });

      if (error || !data || data.length === 0) {
        setLoading(false);
        return;
      }

      const weekMap = new Map<string, WeekRow[]>();
      for (const row of data) {
        const rows = weekMap.get(row.week_id) ?? [];
        if (rows.length < 20) rows.push(row as WeekRow);
        weekMap.set(row.week_id, rows);
      }

      const allWeeks: WeekData[] = Array.from(weekMap.entries()).map(
        ([week_id, rows]) => ({ week_id, rows }),
      );

      setWeeks(allWeeks);
      // Auto-expand most recent week only
      if (allWeeks.length > 0) setExpanded(new Set([allWeeks[0].week_id]));
      setLoading(false);
    };

    fetchWeeks();
  }, []);

  const toggleWeek = (week_id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(week_id)) next.delete(week_id);
      else next.add(week_id);
      return next;
    });
  };

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
          {hasData && (
            <span
              className="text-[10px] pb-1"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {weeks.length} week{weeks.length > 1 ? "s" : ""} recorded
            </span>
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
              key="weeks"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {weeks.map((week, idx) => (
                <WeekAccordion
                  key={week.week_id}
                  weekData={week}
                  isExpanded={expanded.has(week.week_id)}
                  onToggle={() => toggleWeek(week.week_id)}
                  inView={inView}
                  isLatest={idx === 0}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-[10px] mt-5"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          Winners snapshotted every Monday · Scores reset weekly · Airdrop to
          top holders
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
