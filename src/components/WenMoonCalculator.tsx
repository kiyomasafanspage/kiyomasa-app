"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useTokenData, fmtPrice } from "@/hooks/useTokenData";

const MULTIPLIERS = [2, 5, 10, 50, 100];

function wagmiMsg(roi: number): { text: string; color: string } {
  if (roi < 10)
    return { text: "Basically flat 😴 Hold longer bro", color: "#ffd700" };
  if (roi < 100) return { text: "Solid. WAGMI 🤝", color: "#7fff00" };
  if (roi < 500)
    return { text: "BASED. You're making it 🔥", color: "#00e5ff" };
  if (roi < 1000)
    return { text: "MASSIVE BAGS. Future millionaire 🤑", color: "#ff6bff" };
  return {
    text: "KIYOMASA TO THE MOON!!! 🚀🌙 NGMI if you sell",
    color: "#00ff88",
  };
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

/* ── confetti piece ── */
const CONFETTI_COLORS = [
  "#ff2d2d",
  "#ffd700",
  "#ffffff",
  "#ff6b6b",
  "#00ff88",
  "#a78bfa",
];

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 55 }}>
      {Array.from({ length: 50 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            width: 6 + Math.random() * 8,
            height: 6 + Math.random() * 8,
            background:
              CONFETTI_COLORS[
                Math.floor(Math.random() * CONFETTI_COLORS.length)
              ],
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [1, 1, 0],
            rotate: (Math.random() - 0.5) * 720,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 1.8 + Math.random() * 1.2,
            delay: Math.random() * 0.6,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

/* ── result card ── */
function ResultCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <motion.div
      className="glass rounded-2xl p-5 text-center"
      style={{ border: `1px solid ${accent}20` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-[10px] text-white/35 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-xl font-black" style={{ color: accent }}>
        {value}
      </p>
      {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
    </motion.div>
  );
}

export default function WenMoonCalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data } = useTokenData(30_000);

  const [amount, setAmount] = useState("1000000");
  const [mult, setMult] = useState<number>(10);
  const [customMult, setCustomMult] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const currentPrice = data?.price ?? 0;
  const tokens = parseFloat(amount.replace(/,/g, "")) || 0;
  const activeMult = isCustom ? parseFloat(customMult) || 1 : mult;
  const targetPrice = currentPrice * activeMult;

  const currentVal = tokens * currentPrice;
  const targetVal = tokens * targetPrice;
  const profit = targetVal - currentVal;
  const roi = currentVal > 0 ? (profit / currentVal) * 100 : 0;
  const msg = wagmiMsg(roi);

  const handleCalc = () => {
    if (!currentPrice || !tokens) return;
    setShowResult(true);
    setConfetti(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setConfetti(false), 2800);
  };

  return (
    <section
      id="calculator"
      ref={ref}
      className="relative section-padding jp-pattern"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,160,23,0.06) 0%, transparent 70%)",
        }}
      />

      <Confetti active={confetti} />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">
            Dream Big · WAGMI
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            Wen <span className="gradient-text-gold">Moon?</span> 🌙
          </h2>
          <p className="text-white/45 text-sm">
            Masukkan jumlah token, pilih target, dan lihat masa depanmu.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-6 md:p-10 neon-border-gold"
        >
          {/* Current price */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div>
              <p className="text-xs text-white/35 uppercase tracking-widest">
                Current Price
              </p>
              <p className="text-xl font-black gradient-text-gold">
                {currentPrice ? fmtPrice(currentPrice) : "Loading…"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/35 uppercase tracking-widest">
                Token
              </p>
              <p className="text-xl font-black text-white">$KIYOMASA</p>
            </div>
          </div>

          {/* Token amount input */}
          <div className="mb-6">
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">
              How many $KIYOMASA do you hold?
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setShowResult(false);
              }}
              placeholder="e.g. 1000000"
              className="w-full glass rounded-xl px-4 py-3 text-white font-bold text-lg outline-none border border-white/10 focus:border-[#ffd700]/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
          </div>

          {/* Multiplier */}
          <div className="mb-8">
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-3">
              Target Multiplier
            </label>
            <div className="flex flex-wrap gap-2">
              {MULTIPLIERS.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMult(m);
                    setIsCustom(false);
                    setShowResult(false);
                  }}
                  className="px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200"
                  style={
                    !isCustom && mult === m
                      ? {
                          background: "linear-gradient(135deg,#d4a017,#ffd700)",
                          color: "#050505",
                          boxShadow: "0 0 20px rgba(255,215,0,0.4)",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.6)",
                        }
                  }
                >
                  {m}x
                </button>
              ))}
              <button
                onClick={() => {
                  setIsCustom(true);
                  setShowResult(false);
                }}
                className="px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200"
                style={
                  isCustom
                    ? {
                        background: "linear-gradient(135deg,#d4a017,#ffd700)",
                        color: "#050505",
                        boxShadow: "0 0 20px rgba(255,215,0,0.4)",
                      }
                    : {
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)",
                      }
                }
              >
                Custom
              </button>
            </div>

            {isCustom && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                type="number"
                value={customMult}
                onChange={(e) => {
                  setCustomMult(e.target.value);
                  setShowResult(false);
                }}
                placeholder="e.g. 500"
                min="1"
                className="mt-3 w-full glass rounded-xl px-4 py-3 text-white font-bold outline-none border border-[#ffd700]/30 focus:border-[#ffd700]/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            )}
          </div>

          {/* Calculate button */}
          <motion.button
            onClick={handleCalc}
            disabled={!currentPrice || !tokens || activeMult < 1}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl font-black text-lg uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #d4a017, #ffd700, #c8860e)",
              color: "#050505",
              boxShadow:
                currentPrice && tokens
                  ? "0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.15)"
                  : "none",
            }}
          >
            🔮 Calculate My Moon Bag
          </motion.button>

          {/* Results */}
          <AnimatePresence>
            {showResult && currentPrice > 0 && tokens > 0 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8 pt-6 border-t border-white/5"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <ResultCard
                    label="Current Value"
                    value={fmtNum(currentVal)}
                    accent="#ffd700"
                  />
                  <ResultCard
                    label={`At ${activeMult}x Target`}
                    value={fmtNum(targetVal)}
                    accent="#00e5ff"
                  />
                  <ResultCard
                    label="Your Profit"
                    value={fmtNum(profit)}
                    sub={`+${roi.toFixed(0)}% ROI`}
                    accent="#00ff88"
                  />
                  <ResultCard
                    label="Target Price"
                    value={fmtPrice(targetPrice)}
                    sub={`${activeMult}x current`}
                    accent="#a78bfa"
                  />
                </div>

                <motion.div
                  className="glass-red rounded-2xl p-4 text-center"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p
                    className="text-base font-black"
                    style={{ color: msg.color }}
                  >
                    {msg.text}
                  </p>
                  <p className="text-xs text-white/25 mt-1">
                    Not financial advice. Do your own research. 🦍
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
