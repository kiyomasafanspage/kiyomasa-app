"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const SRC = "/assets/sounds/the_mountain-crypto-systems-141482.mp3";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tr } = useLang();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const bufRef = useRef(new Uint8Array(256));
  const playingRef = useRef(false);
  // tracks accumulated time for pseudo-beat fallback when analyser is absent
  const timeRef = useRef(0);

  /* ── init audio element once ── */
  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  /* ── set canvas to full window size ── */
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── wire up Web Audio analyser (once per session) ── */
  const setupAudioCtx = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;
    const ac = new AudioContext();
    const analyser = ac.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.8;
    bufRef.current = new Uint8Array(analyser.frequencyBinCount);
    const src = ac.createMediaElementSource(audioRef.current);
    src.connect(analyser);
    analyser.connect(ac.destination);
    audioCtxRef.current = ac;
    analyserRef.current = analyser;
  }, []);

  /* ── draw loop ── */
  const drawLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !playingRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const now = performance.now();
    timeRef.current = now;

    /* pull frequency data */
    if (analyserRef.current) {
      analyserRef.current.getByteFrequencyData(bufRef.current);
    } else {
      /* pseudo-beat fallback: animate without real audio data */
      const t = now / 1000;
      for (let i = 0; i < bufRef.current.length; i++) {
        bufRef.current[i] = Math.max(
          0,
          Math.min(
            255,
            Math.floor(
              128 +
                80 * Math.sin(t * 2.5 + i * 0.15) +
                40 * Math.sin(t * 5.1 + i * 0.08),
            ),
          ),
        );
      }
    }
    const data = bufRef.current;
    const len = data.length;

    const bass =
      data.slice(0, 8).reduce((a: number, b: number) => a + b, 0) / 8 / 255;
    const avg = data.reduce((a: number, b: number) => a + b, 0) / len / 255;

    /* ── CLEAR ── */
    ctx.clearRect(0, 0, W, H);

    /* ── BACKGROUND RADIAL BASS PULSE (B&W) ── */
    const bgR = Math.max(W, H) * 0.75;
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, bgR);
    bgGrad.addColorStop(0, `rgba(255,255,255,${bass * 0.06})`);
    bgGrad.addColorStop(0.5, `rgba(255,255,255,${bass * 0.02})`);
    bgGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    /* ── RADIAL EQUALIZER BARS (white/gray) ── */
    const numBars = Math.min(len, 128);
    const baseR = Math.min(W, H) * 0.1 + bass * 35;

    for (let i = 0; i < numBars; i++) {
      const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
      const val = data[i] / 255;
      const barH = val * Math.min(W, H) * 0.22;

      const x1 = cx + Math.cos(angle) * baseR;
      const y1 = cy + Math.sin(angle) * baseR;
      const x2 = cx + Math.cos(angle) * (baseR + barH);
      const y2 = cy + Math.sin(angle) * (baseR + barH);

      const lightness = Math.round(55 + val * 35);
      const alpha = 0.35 + val * 0.65;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${lightness * 2}, ${lightness * 2}, ${lightness * 2}, ${alpha})`;
      ctx.lineWidth = 1.5 + val * 2;
      ctx.lineCap = "round";

      if (val > 0.6) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(255,255,255,${val * 0.5})`;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    /* ── INNER GLOW RING (white) ── */
    ctx.beginPath();
    ctx.arc(cx, cy, baseR * 0.88, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${0.12 + avg * 0.25})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* ── CONCENTRIC ACCENT RINGS (white only) ── */
    for (let r = 1; r <= 5; r++) {
      const ringR = Math.max(1, baseR * (1 + r * 0.65) + bass * 18 * r);
      const alpha = Math.max(0, (0.15 - r * 0.02) * (0.4 + avg * 0.8));
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = r === 1 ? 1.5 : 1;
      ctx.stroke();
    }

    /* ── BOTTOM HORIZONTAL EQ BARS (white/gray) ── */
    const barCount = 96;
    const barW = W / barCount;
    for (let i = 0; i < barCount; i++) {
      const idx = Math.floor((i / barCount) * len);
      const val = data[idx] / 255;
      const bH = val * H * 0.4;
      const alpha = 0.4 + val * 0.45;

      const barGrad = ctx.createLinearGradient(0, H - bH, 0, H);
      barGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
      barGrad.addColorStop(1, `rgba(180,180,180,0.2)`);
      ctx.fillStyle = barGrad;
      ctx.fillRect(i * barW + 1, H - bH, barW - 2, bH);
    }

    /* ── BEAT SHOCKWAVE (white) ── */
    if (bass > 0.68) {
      const intensity = (bass - 0.68) / 0.32;
      const shockR = intensity * Math.min(W, H) * 0.55;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(0, shockR), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${intensity * 0.3})`;
      ctx.lineWidth = 2 + intensity * 4;
      ctx.stroke();
    }

    animRef.current = requestAnimationFrame(drawLoop);
  }, []);

  /* ── toggle play/pause ── */
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingRef.current) {
      audio.pause();
      playingRef.current = false;
      cancelAnimationFrame(animRef.current);
      setPlaying(false);
    } else {
      setLoading(true);
      setupAudioCtx();
      if (audioCtxRef.current?.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      try {
        await audio.play();
        playingRef.current = true;
        setPlaying(true);
        requestAnimationFrame(drawLoop);
      } catch (e) {
        console.error("Playback error:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* ── Full-screen audio visualizer canvas ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          opacity: playing ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* ── Floating toggle button ── */}
      <div className="fixed bottom-8 right-6 z-[60] flex flex-col items-center gap-2">
        <div className="relative">
          {/* Pulsing outer rings when playing */}
          <AnimatePresence>
            {playing && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-white/30"
                    style={{
                      inset: -(i + 1) * 14,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ scale: [1, 1.8], opacity: [0.65, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.6 + i * 0.35,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            onClick={toggle}
            disabled={loading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden select-none"
            style={
              playing
                ? {
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow:
                      "0 0 24px rgba(255,255,255,0.2), 0 0 48px rgba(255,255,255,0.08)",
                  }
                : {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  }
            }
            aria-label={playing ? "Pause music" : "Play background music"}
          >
            {/* Spinning shimmer overlay when playing */}
            {playing && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.15) 85%, transparent 100%)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Icon */}
            <div className="relative z-10">
              {loading ? (
                <motion.div
                  className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ) : playing ? (
                /* Animated equalizer bars */
                <div className="flex items-end gap-0.5 h-5">
                  {[4, 8, 12, 8, 4].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] bg-white rounded-full"
                      animate={{
                        height: [
                          `${h}px`,
                          `${Math.min(h * 2.2, 18)}px`,
                          `${h}px`,
                        ],
                      }}
                      transition={{
                        duration: 0.42 + i * 0.08,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.07,
                      }}
                    />
                  ))}
                </div>
              ) : (
                /* Music note icon */
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M9 18V5l12-2v13"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="6"
                    cy="18"
                    r="3"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="18"
                    cy="16"
                    r="3"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
          </motion.button>
        </div>

        {/* Label */}
        <span
          className="text-[9px] uppercase tracking-[0.22em] font-black transition-colors duration-500"
          style={{
            color: playing ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
          }}
        >
          {playing ? tr.music.playing : tr.music.bgm}
        </span>
      </div>
    </>
  );
}
