"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cgnirfmiqkhplauezrqs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4CGmhhkYc_3cSJklGwb8xA_VBLv5_jB";

const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Holder {
  wallet: string;
  username: string;
  emoji: string;
  balance: number;
  score: number;
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

const MEDAL = ["🥇", "🥈", "🥉"];

export default function GameLeaderboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [rows, setRows] = useState<Holder[]>([]);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState<string | null>(null); // wallet that just updated

  const fetchLeaderboard = async () => {
    const { data, error } = await sb
      .from("holders")
      .select("wallet,username,emoji,balance,score")
      .order("score", { ascending: false })
      .order("balance", { ascending: false })
      .limit(20);

    if (!error && data) {
      setRows(data as Holder[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();

    // Real-time: subscribe to any INSERT or UPDATE on holders table
    const channel = sb
      .channel("leaderboard-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "holders" },
        (payload) => {
          const updated = payload.new as Holder;
          setPulse(updated.wallet);
          setTimeout(() => setPulse(null), 2000);

          setRows((prev) => {
            const idx = prev.findIndex((r) => r.wallet === updated.wallet);
            let next: Holder[];
            if (idx >= 0) {
              next = [...prev];
              next[idx] = {
                wallet: updated.wallet,
                username: updated.username,
                emoji: updated.emoji,
                balance: Number(updated.balance) || 0,
                score: Number(updated.score) || 0,
              };
            } else {
              next = [
                ...prev,
                {
                  wallet: updated.wallet,
                  username: updated.username,
                  emoji: updated.emoji,
                  balance: Number(updated.balance) || 0,
                  score: Number(updated.score) || 0,
                },
              ];
            }
            return next
              .sort((a, b) => b.score - a.score || b.balance - a.balance)
              .slice(0, 20);
          });
        },
      )
      .subscribe();

    return () => {
      sb.removeChannel(channel);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative section-padding"
      style={{ paddingTop: "2rem" }}
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
              Live Rankings
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-none">
              Gorilla <span className="gradient-text">Leaderboard</span>
            </h3>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 pb-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "#4ade80",
                boxShadow: "0 0 8px rgba(74,222,128,0.7)",
                animation: "glowPulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(74,222,128,0.8)" }}
            >
              Live
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
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
            <span
              className="text-[9px] uppercase tracking-widest font-bold"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              #
            </span>
            <span
              className="text-[9px] uppercase tracking-widest font-bold"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Player
            </span>
            <span
              className="text-[9px] uppercase tracking-widest font-bold text-right"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Score
            </span>
            <span
              className="text-[9px] uppercase tracking-widest font-bold text-right"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Holdings
            </span>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="py-12 flex flex-col items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent"
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
                Loading leaderboard…
              </span>
            </div>
          ) : rows.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-4xl mb-3">🦍</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                No players yet. Be the first gorilla!
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {rows.map((row, i) => {
                const isTop3 = i < 3;
                const isPulsing = pulse === row.wallet;

                return (
                  <motion.div
                    key={row.wallet}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="grid px-5 py-3.5 transition-all duration-500"
                    style={{
                      gridTemplateColumns: "36px 1fr auto auto",
                      gap: "0.75rem",
                      alignItems: "center",
                      borderBottom:
                        i < rows.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                      background: isPulsing
                        ? "rgba(74,222,128,0.06)"
                        : isTop3
                          ? "rgba(200,169,75,0.04)"
                          : "transparent",
                    }}
                  >
                    {/* Rank */}
                    <span
                      className="font-black text-center"
                      style={{
                        fontSize: isTop3 ? 16 : 13,
                        color: isTop3 ? undefined : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {isTop3 ? MEDAL[i] : `${i + 1}`}
                    </span>

                    {/* Player */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg leading-none flex-shrink-0">
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
                      {isPulsing && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{
                            background: "rgba(74,222,128,0.15)",
                            color: "#4ade80",
                            border: "1px solid rgba(74,222,128,0.3)",
                          }}
                        >
                          ↑ Updated
                        </motion.span>
                      )}
                    </div>

                    {/* Score */}
                    <span
                      className="font-black text-sm text-right"
                      style={{
                        color: isTop3 ? "#c8a94b" : "rgba(255,255,255,0.8)",
                      }}
                    >
                      {formatNum(row.score)}
                      <span
                        className="text-[9px] font-normal ml-0.5"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        pts
                      </span>
                    </span>

                    {/* Holdings */}
                    <span
                      className="text-xs font-medium text-right"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {formatNum(row.balance)}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-[10px] mt-4"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          Rankings update in real-time · Score = game points · Holdings = $KIYO
          balance
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
