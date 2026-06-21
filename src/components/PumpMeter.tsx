"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTokenData, fmtUsd } from "@/hooks/useTokenData";
import type { TokenData } from "@/hooks/useTokenData";
import { useLang } from "@/contexts/LanguageContext";

/* ── score calc ── */
function calcScore(d: TokenData): number {
  const total = d.buys24h + d.sells24h;
  const buyPct = total > 0 ? d.buys24h / total : 0.5;
  const buyScore = Math.max(-25, Math.min(25, (buyPct - 0.5) * 80));
  const volScore = Math.min(
    25,
    Math.max(0, Math.log10(Math.max(10, d.volume24h)) * 5 - 5),
  );
  const priceScore = Math.max(-20, Math.min(20, d.priceChange24h * 0.7));
  return Math.max(0, Math.min(100, 50 + buyScore + volScore + priceScore - 8));
}

type PumpKey = "rekt" | "bearish" | "neutral" | "bullish" | "pumping" | "moon";
const LABEL_DEFS: { min: number; max: number; key: PumpKey; color: string }[] =
  [
    { min: 0, max: 25, key: "rekt", color: "#ff2d2d" },
    { min: 25, max: 42, key: "bearish", color: "#ff6b35" },
    { min: 42, max: 58, key: "neutral", color: "#ffd700" },
    { min: 58, max: 73, key: "bullish", color: "#7fff00" },
    { min: 73, max: 88, key: "pumping", color: "#00e5ff" },
    { min: 88, max: 101, key: "moon", color: "#00ff88" },
  ];
const getLabelDef = (s: number) =>
  LABEL_DEFS.find((l) => s >= l.min && s < l.max) ?? LABEL_DEFS[2];

/* ── animated SVG gauge ── */
function Gauge({ target, inView }: { target: number; inView: boolean }) {
  const { tr } = useLang();
  const [score, setScore] = useState(0);
  const animRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(target * eased);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [target, inView]);

  const R = 72;
  const cx = 100;
  const cy = 92;
  const SW = 14;
  const circ = Math.PI * R;
  const dashOff = circ * (1 - score / 100);

  const angle = Math.PI * (1 - score / 100);
  const nLen = 58;
  const nx = cx + Math.cos(angle) * nLen;
  const ny = cy - Math.sin(angle) * nLen;
  const lblDef = getLabelDef(score);
  const lblText = tr.pump[lblDef.key];

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="100" viewBox="0 0 200 100">
        <defs>
          <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2d2d" />
            <stop offset="45%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </defs>
        {/* track */}
        <path
          d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={SW}
          strokeLinecap="round"
        />
        {/* fill */}
        <path
          d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none"
          stroke="url(#pgGrad)"
          strokeWidth={SW}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOff}
        />
        {/* needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="rgba(255,255,255,0.92)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        {/* needle shadow */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke={lblDef.color}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.15}
        />
        {/* hub */}
        <circle cx={cx} cy={cy} r={7} fill="rgba(255,255,255,0.08)" />
        <circle cx={cx} cy={cy} r={4} fill="white" />
        {/* score */}
        <text
          x={cx}
          y={cy - 22}
          textAnchor="middle"
          fill={lblDef.color}
          fontSize="28"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          {Math.round(score)}
        </text>
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill="rgba(255,255,255,0.28)"
          fontSize="6.5"
          fontFamily="system-ui, sans-serif"
          letterSpacing="2"
        >
          {tr.pump.score}
        </text>
        {/* tick marks */}
        {[0, 25, 50, 75, 100].map((v) => {
          const a = Math.PI * (1 - v / 100);
          const ox = cx + Math.cos(a) * (R + SW);
          const oy = cy - Math.sin(a) * (R + SW);
          return (
            <text
              key={v}
              x={ox}
              y={oy + 3}
              textAnchor="middle"
              fill="rgba(255,255,255,0.2)"
              fontSize="6"
              fontFamily="system-ui, sans-serif"
            >
              {v}
            </text>
          );
        })}
      </svg>
      <motion.p
        className="text-base font-black tracking-wide mt-1"
        style={{ color: lblDef.color }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {lblText}
      </motion.p>
    </div>
  );
}

/* ── stat pill ── */
function StatPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <p className="font-black text-sm" style={{ color }}>
        {value}
      </p>
      <p className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}

export default function PumpMeter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data, loading } = useTokenData(30_000);
  const { tr } = useLang();

  const score = data ? calcScore(data) : 50;
  const total = data ? data.buys24h + data.sells24h : 0;
  const buyPct = total > 0 ? Math.round((data!.buys24h / total) * 100) : 50;
  const lblDef = getLabelDef(score);

  const p1h = data?.priceChange1h ?? 0;
  const p24h = data?.priceChange24h ?? 0;
  const pColor = (v: number) => (v >= 0 ? "#00ff88" : "#ff4444");
  const pFmt = (v: number) =>
    `${v >= 0 ? "▲" : "▼"} ${Math.abs(v).toFixed(2)}%`;

  return (
    <section
      id="pump"
      ref={ref}
      className="relative section-padding"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(192,57,43,0.05) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">
            {tr.pump.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            {tr.pump.heading}
            <span className="gradient-text">{tr.pump.headingAccent}</span>
          </h2>
          <p className="text-white/45 max-w-md mx-auto text-sm">
            {tr.pump.sub}
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-6 md:p-10 neon-border-red">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-1 gap-3"
            >
              <StatPill
                label={tr.pump.volume}
                value={loading ? "—" : fmtUsd(data?.volume24h ?? 0)}
                color="#ffd700"
              />
              <StatPill
                label={tr.pump.liquidity}
                value={loading ? "—" : fmtUsd(data?.liquidity ?? 0)}
                color="#a78bfa"
              />
              <StatPill
                label={tr.pump.marketCap}
                value={loading ? "—" : fmtUsd(data?.marketCap ?? 0)}
                color="#ff6b6b"
              />
            </motion.div>

            {/* Center gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <Gauge target={score} inView={inView} />

              {/* Buy/sell bar */}
              {!loading && total > 0 && (
                <div className="w-full max-w-[200px]">
                  <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest mb-1">
                    <span>
                      {tr.pump.buy} {buyPct}%
                    </span>
                    <span>
                      {tr.pump.sell} {100 - buyPct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
                    <div
                      className="h-full rounded-l-full transition-all duration-700"
                      style={{
                        width: `${buyPct}%`,
                        background: "linear-gradient(90deg,#00ff88,#00cc66)",
                      }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-1 gap-3"
            >
              <StatPill
                label={tr.pump.price1h}
                value={loading ? "—" : pFmt(p1h)}
                color={pColor(p1h)}
              />
              <StatPill
                label={tr.pump.price24h}
                value={loading ? "—" : pFmt(p24h)}
                color={pColor(p24h)}
              />
              <StatPill
                label={tr.pump.txns}
                value={loading ? "—" : total.toLocaleString()}
                color="#00e5ff"
              />
            </motion.div>
          </div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-white/5 text-center"
          >
            <p className="text-xs text-white/25 uppercase tracking-widest">
              {tr.pump.verdict} —{" "}
              <span className="font-black" style={{ color: lblDef.color }}>
                {tr.pump[lblDef.key]}
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
