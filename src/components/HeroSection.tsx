"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const CA = "ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump";

export default function HeroSection() {
  const { tr } = useLang();
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Banner background — full width, no crop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#060606",
          backgroundImage: 'url("/assets/backgrounds/banner.jpeg")',
          backgroundSize: "100% auto",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient overlay — fade top, fade bottom to hide image edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,6,6,0.9) 0%, rgba(6,6,6,0.2) 18%, rgba(6,6,6,0.15) 38%, rgba(6,6,6,0.7) 55%, rgba(6,6,6,1) 68%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-white glow-pulse"
            style={{ boxShadow: "0 0 6px rgba(255,255,255,0.8)" }}
          />
          <span className="text-[10px] text-white/70 tracking-[0.3em] font-semibold uppercase">
            {tr.hero.badge}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-2 text-white">
            {tr.hero.line1}
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-2">
            <span className="gradient-text">{tr.hero.line2}</span>
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-8 text-white">
            {tr.hero.line3}
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base md:text-lg text-white/55 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {tr.hero.sub}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <a
            href="https://gmgn.ai/sol/token/5RkcycHD_ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary font-black px-10 py-4 rounded-full tracking-widest uppercase text-sm w-full sm:w-auto text-center"
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
          transition={{ delay: 0.8 }}
          className="inline-flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="text-xs text-white/35 uppercase tracking-widest font-medium hidden sm:block">
            CA:
          </span>
          <span className="text-xs text-white/80 font-mono tracking-wide">
            {CA.slice(0, 10)}...{CA.slice(-10)}
          </span>
          <button
            onClick={copyCA}
            className="text-[10px] text-white/40 hover:text-white transition-colors px-2 py-1 rounded"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {copied ? "✓" : tr.hero.copy}
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-10 mt-14"
        >
          {[
            { label: tr.hero.network, value: "Solana" },
            { label: tr.hero.supply, value: "1B" },
            { label: tr.hero.tax, value: "0%" },
            { label: tr.hero.community, value: "CTO" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-[10px] text-white/35 uppercase tracking-widest mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div
          className="w-5 h-9 rounded-full flex items-start justify-center p-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <div
            className="w-0.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.5)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
