"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const CA = "ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump";

function CandlestickCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const candles: {
      x: number;
      open: number;
      close: number;
      high: number;
      low: number;
      bull: boolean;
    }[] = [];
    const cW = 18,
      gap = 6,
      total = Math.floor(canvas.width / (cW + gap));
    let baseY = canvas.height * 0.5;

    for (let i = 0; i < total; i++) {
      const move = (Math.random() - 0.45) * 30;
      const open = baseY;
      const close = Math.max(40, Math.min(canvas.height - 40, open + move));
      const high = Math.min(open, close) - Math.random() * 20;
      const low = Math.max(open, close) + Math.random() * 20;
      candles.push({
        x: i * (cW + gap) + cW,
        open,
        close,
        high,
        low,
        bull: close < open,
      });
      baseY = close;
    }

    let frame = 0;
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      candles.forEach((c) => {
        const color = c.bull ? "#00ff88" : "#ff2d2d";
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.5 + 0.3 * Math.sin(frame * 0.05 + c.x * 0.1);
        ctx.beginPath();
        ctx.moveTo(c.x + cW / 2, c.high);
        ctx.lineTo(c.x + cW / 2, c.low);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fillRect(
          c.x,
          Math.min(c.open, c.close),
          cW,
          Math.max(2, Math.abs(c.close - c.open)),
        );
        ctx.restore();
      });
      frame++;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={ref} className="w-full h-full" />;
}

function TempleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Temple silhouette SVG */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-10"
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Torii Gate */}
        <rect x="600" y="80" width="240" height="16" fill="#c0392b" />
        <rect x="580" y="110" width="280" height="10" fill="#c0392b" />
        <rect x="620" y="120" width="20" height="280" fill="#c0392b" />
        <rect x="800" y="120" width="20" height="280" fill="#c0392b" />
        {/* Pagoda */}
        <polygon points="240,300 320,180 400,300" fill="#1a0000" />
        <polygon
          points="255,300 320,200 385,300"
          fill="#c0392b"
          opacity="0.3"
        />
        <polygon points="260,250 320,150 380,250" fill="#1a0000" />
        <polygon
          points="272,250 320,165 368,250"
          fill="#c0392b"
          opacity="0.3"
        />
        <polygon points="278,205 320,120 362,205" fill="#1a0000" />
        <rect x="312" y="300" width="16" height="100" fill="#1a0000" />
        {/* Mountains */}
        <polygon points="0,400 200,150 400,400" fill="#0d0000" />
        <polygon points="300,400 550,100 800,400" fill="#0d0000" />
        <polygon points="700,400 950,200 1200,400" fill="#0d0000" />
        <polygon points="1100,400 1300,180 1440,400" fill="#0d0000" />
        {/* Cherry blossom trees */}
        <circle cx="100" cy="220" r="50" fill="#c0392b" opacity="0.2" />
        <rect x="96" y="268" width="8" height="80" fill="#3d0000" />
        <circle cx="1350" cy="230" r="45" fill="#c0392b" opacity="0.2" />
        <rect x="1346" y="273" width="8" height="80" fill="#3d0000" />
      </svg>

      {/* Red moon */}
      <motion.div
        className="absolute top-16 right-1/4 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,57,43,0.4) 0%, rgba(192,57,43,0) 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating petals */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 4) * 15}%`,
            background:
              i % 3 === 0 ? "#ff2d2d" : i % 3 === 1 ? "#ffd700" : "#ff6b6b",
            boxShadow: `0 0 6px ${i % 2 === 0 ? "#ff2d2d" : "#ffd700"}`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

/* ── Interactive Gorilla Mascot ── */
const REACTIONS = [
  { text: "ROAR! 🦁", color: "#ff2d2d" },
  { text: "KIYOMASA! 🔥", color: "#ffd700" },
  { text: "TO THE MOON! 🚀", color: "#00ff88" },
  { text: "WAGMI! 💎", color: "#a78bfa" },
  { text: "APE IN! 🦍", color: "#00e5ff" },
  { text: "LFG!!! 🌙", color: "#ff6bff" },
];

function GorillaMascot() {
  const { tr } = useLang();
  const [clicks, setClicks] = useState(0);
  const [reaction, setReaction] = useState<(typeof REACTIONS)[0] | null>(null);
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    const n = clicks + 1;
    setClicks(n);
    setReaction(REACTIONS[(n - 1) % REACTIONS.length]);
    setShaking(true);
    setTimeout(() => {
      setReaction(null);
      setShaking(false);
    }, 1100);
  };

  return (
    <div className="relative flex flex-col items-center select-none cursor-pointer mt-10 mb-4">
      <AnimatePresence>
        {reaction && (
          <motion.p
            key={reaction.text}
            className="absolute font-black text-lg whitespace-nowrap pointer-events-none"
            style={{ color: reaction.color, top: -40 }}
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.35 }}
          >
            {reaction.text}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.span
        className="text-7xl md:text-8xl"
        onClick={handleClick}
        animate={
          shaking
            ? { rotate: [-8, 8, -8, 8, 0], scale: [1, 1.35, 1] }
            : { y: [-6, 6, -6], rotate: [-2, 2, -2] }
        }
        transition={
          shaking
            ? { duration: 0.4 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{ scale: 1.12 }}
      >
        🦍
      </motion.span>

      <motion.p
        className="text-[9px] uppercase tracking-[0.25em] mt-2"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ color: clicks > 0 ? "#ffd700" : "rgba(255,255,255,0.3)" }}
      >
        {clicks === 0 ? tr.hero.tapMe : `${clicks} ${tr.hero.clicks}`}
      </motion.p>
    </div>
  );
}

export default function HeroSection() {
  const { tr } = useLang();
  const copyCA = () => {
    navigator.clipboard.writeText(CA);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center jp-pattern overflow-hidden pt-20"
    >
      <TempleBackground />

      {/* Candlestick strip */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-70">
        <CandlestickCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-1.5 mb-8 neon-border-red"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff2d2d] glow-pulse" />
          <span className="text-xs text-[#ff6b6b] tracking-[0.2em] font-medium uppercase">
            {tr.hero.badge}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-2">
            <span className="neon-red text-white">{tr.hero.line1}</span>
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-2">
            <span className="gradient-text">{tr.hero.line2}</span>
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-6">
            <span className="neon-gold text-[#ffd700]">{tr.hero.line3}</span>{" "}
            <span className="float-anim inline-block">🦍</span>
            <span className="inline-block ml-1">🇯🇵</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {tr.hero.sub}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <a
            href="https://jup.ag/swap/SOL-ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-white font-black px-10 py-4 rounded-full tracking-widest uppercase text-sm w-full sm:w-auto text-center animated-border"
          >
            {tr.hero.buyBtn}
          </a>
          <a
            href="https://t.me/kiyomasa_cto_chat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary font-bold px-10 py-4 rounded-full tracking-widest uppercase text-sm w-full sm:w-auto text-center"
          >
            {tr.hero.joinBtn}
          </a>
        </motion.div>

        {/* CA Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="inline-flex items-center gap-3 glass rounded-xl px-4 py-3 neon-border-gold"
        >
          <span className="text-xs text-white/50 uppercase tracking-widest font-medium hidden sm:block">
            CA:
          </span>
          <span className="text-xs text-[#ffd700] font-mono tracking-wide">
            {CA.slice(0, 8)}...{CA.slice(-8)}
          </span>
          <button
            onClick={copyCA}
            className="text-xs text-white/40 hover:text-[#ffd700] transition-colors px-2 py-1 rounded border border-white/10 hover:border-[#ffd700]/40"
          >
            {tr.hero.copy}
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-14"
        >
          {[
            { label: tr.hero.network, value: "Solana" },
            { label: tr.hero.supply, value: "1B" },
            { label: tr.hero.tax, value: "0%" },
            { label: tr.hero.community, value: "CTO" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-black gradient-text-gold">{s.value}</p>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Interactive mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <GorillaMascot />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-3 rounded-full bg-[#ffd700]/60" />
        </div>
      </motion.div>
    </section>
  );
}
