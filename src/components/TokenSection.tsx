"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTokenData, fmtUsd, fmtPrice } from "@/hooks/useTokenData";
import DexChart from "@/components/DexChart";
import { useLang } from "@/contexts/LanguageContext";

const CA = "ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump";

const tokenInfo = [
  { label: "Token Name", value: "KIYOMASA" },
  { label: "Symbol", value: "$KIYOMASA" },
  { label: "Network", value: "Solana" },
  { label: "Community", value: "CTO Driven" },
  { label: "Tax", value: "0 / 0" },
  { label: "Supply", value: "1,000,000,000" },
];

function PriceChange({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-sm font-bold px-2 py-0.5 rounded-lg"
      style={{
        color: up ? "#00ff88" : "#ff4444",
        background: up ? "rgba(0,255,136,0.1)" : "rgba(255,68,68,0.1)",
      }}
    >
      {up ? "▲" : "▼"} {Math.abs(pct).toFixed(2)}%
    </span>
  );
}

function LiveDot() {
  const { tr } = useLang();
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] glow-pulse" />
      {tr.token.live}
    </span>
  );
}

function Skeleton() {
  return (
    <span className="inline-block w-16 h-4 rounded bg-white/10 animate-pulse" />
  );
}

function StatCard({
  label,
  value,
  sub,
  loading,
  accent = "#ffd700",
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  loading?: boolean;
  accent?: string;
}) {
  return (
    <div
      className="glass rounded-2xl p-5 flex flex-col gap-1 group hover:scale-[1.03] transition-transform"
      style={{ borderColor: `${accent}20`, border: `1px solid ${accent}18` }}
    >
      <p className="text-xs text-white/40 uppercase tracking-widest">{label}</p>
      <p className="text-xl md:text-2xl font-black" style={{ color: accent }}>
        {loading ? <Skeleton /> : value}
      </p>
      {sub && <div className="mt-0.5">{sub}</div>}
    </div>
  );
}

export default function TokenSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const { data, loading } = useTokenData(30_000);
  const { tr } = useLang();
  const [updatedStr, setUpdatedStr] = useState("");

  useEffect(() => {
    if (!data?.updatedAt) return;
    const fmt = () => {
      const s = Math.floor((Date.now() - data.updatedAt.getTime()) / 1000);
      setUpdatedStr(
        s < 5
          ? tr.token.updatedJustNow
          : tr.token.updatedAgo.replace("{n}", String(s)),
      );
    };
    fmt();
    const id = setInterval(fmt, 5000);
    return () => clearInterval(id);
  }, [data?.updatedAt]);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const txTotal = data ? data.buys24h + data.sells24h : 0;
  const buyPct = txTotal > 0 ? Math.round((data!.buys24h / txTotal) * 100) : 50;

  return (
    <section id="token" ref={ref} className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,57,43,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">
            {tr.token.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            {tr.token.heading}{" "}
            <span className="gradient-text">{tr.token.headingAccent}</span>
          </h2>
          <div
            className="w-24 h-0.5 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ffd700, transparent)",
            }}
          />
        </motion.div>

        {/* ── Price ticker ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-red rounded-2xl p-4 md:p-5 mb-6 neon-border-red flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                {tr.token.price}
              </p>
              <p className="text-3xl md:text-4xl font-black gradient-text-gold">
                {loading ? <Skeleton /> : fmtPrice(data?.price ?? null)}
              </p>
            </div>
            {!loading && data && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">1h</span>
                  <PriceChange pct={data.priceChange1h} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">24h</span>
                  <PriceChange pct={data.priceChange24h} />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <LiveDot />
            {updatedStr && (
              <span className="text-[10px] text-white/20">
                {tr.token.updated} {updatedStr}
              </span>
            )}
          </div>
        </motion.div>

        {/* ── 4 stat cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <StatCard
            label={tr.token.marketCap}
            value={loading ? "—" : fmtUsd(data?.marketCap ?? 0)}
            loading={loading}
            accent="#ffd700"
          />
          <StatCard
            label={tr.token.volume24h}
            value={loading ? "—" : fmtUsd(data?.volume24h ?? 0)}
            loading={loading}
            accent="#ff6b6b"
          />
          <StatCard
            label={tr.token.liquidity}
            value={loading ? "—" : fmtUsd(data?.liquidity ?? 0)}
            loading={loading}
            accent="#00ff88"
          />
          <StatCard
            label={tr.token.fdv}
            value={loading ? "—" : fmtUsd(data?.fdv ?? 0)}
            loading={loading}
            accent="#a78bfa"
          />
        </motion.div>

        {/* ── Buy/Sell pressure bar ── */}
        {!loading && data && txTotal > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-4 mb-6 flex flex-col gap-2"
          >
            <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest">
              <span>
                🟢 {tr.token.buys} {data.buys24h.toLocaleString()}
              </span>
              <span>
                {tr.token.txTotal.replace("{n}", txTotal.toLocaleString())}
              </span>
              <span>
                {tr.token.sells} {data.sells24h.toLocaleString()} 🔴
              </span>
            </div>
            <div className="relative h-2.5 rounded-full overflow-hidden bg-white/5">
              <div
                className="absolute left-0 top-0 h-full rounded-l-full transition-all duration-700"
                style={{
                  width: `${buyPct}%`,
                  background: "linear-gradient(90deg, #00ff88, #00cc66)",
                }}
              />
              <div
                className="absolute right-0 top-0 h-full rounded-r-full"
                style={{
                  width: `${100 - buyPct}%`,
                  background: "linear-gradient(270deg, #ff4444, #cc2222)",
                }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-bold text-[#00ff88]">
                {tr.token.buyPct.replace("{n}", String(buyPct))}
              </span>
              <span className="text-xs font-bold text-[#ff4444]">
                {tr.token.sellPct.replace("{n}", String(100 - buyPct))}
              </span>
            </div>
          </motion.div>
        )}

        {/* ── DEX Chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black text-white/60 uppercase tracking-widest">
              {tr.token.chartLabel}
            </h3>
            <a
              href={`https://dexscreener.com/solana/${CA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#ffd700]/60 hover:text-[#ffd700] transition-colors uppercase tracking-widest"
            >
              {tr.token.openFull}
            </a>
          </div>
          <DexChart pairAddress={data?.pairAddress} />
        </motion.div>

        {/* ── Token info + CA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass rounded-2xl p-8 neon-border-red"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-black gradient-text mb-6">
                {tr.token.detailsHeading}
              </h3>
              <div className="space-y-3">
                {tokenInfo.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center justify-between py-2 border-b border-white/5"
                  >
                    <span className="text-sm text-white/50 uppercase tracking-wider">
                      {t.label}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {t.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black gradient-text-gold mb-4">
                  {tr.token.caHeading}
                </h3>
                <div className="glass-red rounded-xl p-4 neon-border-red mb-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
                    {tr.token.caLabel}
                  </p>
                  <p className="text-xs font-mono text-[#ffd700] break-all leading-relaxed">
                    {CA}
                  </p>
                </div>
                <button
                  onClick={copyCA}
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                    copied
                      ? "bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40"
                      : "btn-primary text-white"
                  }`}
                >
                  {copied ? tr.token.copyOk : tr.token.copyBtn}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="https://jup.ag/swap/SOL-ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-white text-xs font-bold py-3 rounded-xl text-center tracking-widest uppercase"
                >
                  {tr.token.buyJup}
                </a>
                <a
                  href={`https://dexscreener.com/solana/${CA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs font-bold py-3 rounded-xl text-center tracking-widest uppercase"
                >
                  {tr.token.dex}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
