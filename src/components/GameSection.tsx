"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function GameSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section id="game" ref={ref} className="relative section-padding">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span
            className="text-[10px] tracking-[0.4em] uppercase font-medium block mb-1"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Mini Game · Play to Earn
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-none">
            Gorilla Hub <span className="gradient-text">Game</span>
          </h2>
        </motion.div>

        <div
          className="w-full h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* Game card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Mascot image area */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            {/* Animated background glow */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(6,6,6,0.55)" }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={hovered ? { opacity: 1 } : { opacity: 0.4 }}
              transition={{ duration: 0.5 }}
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 70%, rgba(200,169,75,0.12) 0%, transparent 70%)",
              }}
            />

            {/* Floating particles when hovered */}
            {hovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 4 + (i % 3) * 3,
                      height: 4 + (i % 3) * 3,
                      background:
                        i % 2 === 0 ? "#c8a94b" : "rgba(255,255,255,0.6)",
                      left: `${15 + i * 13}%`,
                      bottom: "30%",
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -60 - i * 15, opacity: [0, 0.8, 0] }}
                    transition={{
                      duration: 1.2 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}

            {/* Mascot image — fills full frame */}
            <motion.div
              animate={hovered ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/assets/game/gorilla-hub.png"
                  alt="Gorilla Hub Mascot"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, rgba(6,6,6,0.75) 100%)",
              }}
            />

            {/* COMING SOON badge top-right */}
            <motion.div
              className="absolute top-4 right-4"
              animate={hovered ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(200,169,75,0.4)",
                  color: "#c8a94b",
                }}
              >
                Coming Soon
              </span>
            </motion.div>
          </div>

          {/* Bottom info */}
          <div
            className="relative px-8 py-7 text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <motion.p
              className="text-3xl md:text-4xl font-black text-white mb-2"
              animate={
                hovered
                  ? { letterSpacing: "0.06em" }
                  : { letterSpacing: "0.02em" }
              }
              transition={{ duration: 0.3 }}
            >
              GORILLA <span className="gradient-text">HUB</span>
            </motion.p>
            <p
              className="text-sm max-w-xs mx-auto leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              The Kiyomasa mini-game is in development. Stay tuned for the
              gorilla&apos;s next adventure.
            </p>

            {/* Disabled button */}
            <div
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest cursor-not-allowed select-none"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              In Development
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs mt-5"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Follow{" "}
          <a
            href="https://x.com/KiyomasaMeme"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/50 transition-colors"
          >
            @KiyomasaMeme
          </a>{" "}
          for launch updates.
        </motion.p>
      </div>
    </section>
  );
}
