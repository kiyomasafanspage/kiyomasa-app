"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function NarrativeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="narrative"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#020202", padding: "6rem 1.25rem" }}
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* NARRATIVE eyebrow label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 md:mb-14"
        >
          <div
            className="h-px"
            style={{ width: 36, background: "rgba(255,255,255,0.3)" }}
          />
          <span
            className="text-[10px] tracking-[0.35em] uppercase font-semibold"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Narrative
          </span>
        </motion.div>

        {/* 3-column editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr_268px] gap-10 lg:gap-14 items-center">
          {/* ── Col 1: Big headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            <h2
              className="font-black text-white leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
            >
              Not just
              <br />
              Shabani&apos;s son.
              <br />
              <span style={{ color: "rgba(255,255,255,0.85)" }}>
                Kiyomasa&apos;s
                <br />
                own story is
                <br />
                beginning.
              </span>
            </h2>
          </motion.div>

          {/* ── Col 2: Body copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="space-y-6"
          >
            <p
              className="text-base leading-relaxed font-medium"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Imagine being born as the son of a legend.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              For years, Kiyomasa was not seen as &ldquo;Kiyomasa.&rdquo; He was
              seen only as the son of Shabani, Japan&apos;s legendary handsome
              gorilla.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              But he kept growing. Quietly. Slowly. And now people are finally
              looking at him differently.
            </p>

            {/* Decorative accent line */}
            <div
              className="mt-8 h-px"
              style={{
                width: 64,
                background:
                  "linear-gradient(90deg, rgba(200,169,75,0.5), transparent)",
              }}
            />
          </motion.div>

          {/* ── Col 3: Video card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.42, ease: "easeOut" }}
            className="relative mx-auto"
            style={{ width: "100%", maxWidth: 268 }}
          >
            {/* Glow halo behind card */}
            <div
              className="absolute -inset-6 -z-10 blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, transparent 70%)",
              }}
            />

            {/* Card wrapper */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 24,
                border: "7px solid rgba(255,255,255,0.88)",
                boxShadow:
                  "0 32px 72px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* VIDEO badge */}
              <div
                className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5"
                style={{
                  background: "rgba(0,0,0,0.72)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  borderRadius: 6,
                  padding: "4px 8px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="block rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: "#fff",
                    boxShadow: "0 0 6px rgba(255,255,255,0.8)",
                  }}
                />
                <span
                  className="font-black uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "#fff",
                  }}
                >
                  VIDEO
                </span>
              </div>

              {/* Video element */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", background: "#0a0a0a" }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/assets/video/video%20narative.mp4"
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                {/* Inner vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)",
                  }}
                />
              </div>

              {/* VIRAL MOMENT footer */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.95)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#000" }}
                />
                <span
                  className="font-black uppercase tracking-widest text-black"
                  style={{ fontSize: 9 }}
                >
                  Viral Moment
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />
    </section>
  );
}
