"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const STATUS_META = {
  active: {
    dotColor: "rgba(255,255,255,0.9)",
    badgeBg: "rgba(255,255,255,0.08)",
    badgeBorder: "rgba(255,255,255,0.2)",
    badgeColor: "rgba(255,255,255,0.8)",
  },
  future: {
    dotColor: "rgba(255,255,255,0.25)",
    badgeBg: "rgba(255,255,255,0.03)",
    badgeBorder: "rgba(255,255,255,0.08)",
    badgeColor: "rgba(255,255,255,0.3)",
  },
};

export default function RoadmapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sectionOpen, setSectionOpen] = useState(false);
  const [openPhase, setOpenPhase] = useState<string | null>(null);
  const { tr } = useLang();
  const rm = tr.roadmap;

  const phases = [
    { phase: "01", title: rm.p1title, status: "active", items: rm.p1 },
    { phase: "02", title: rm.p2title, status: "active", items: rm.p2 },
    { phase: "03", title: rm.p3title, status: "future", items: rm.p3 },
    { phase: "04", title: rm.p4title, status: "future", items: rm.p4 },
  ];

  return (
    <section id="roadmap" ref={ref} className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        {/* ── Section collapse header ── */}
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          onClick={() => setSectionOpen((p) => !p)}
          className="w-full flex items-center justify-between"
          style={{ outline: "none" }}
        >
          <div className="text-left">
            <span
              className="text-[10px] tracking-[0.4em] uppercase font-medium block mb-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {rm.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-none">
              Road<span className="gradient-text">map</span>
            </h2>
          </div>
          <div
            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ml-4 transition-all duration-200"
            style={{
              background: sectionOpen
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                transform: sectionOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </motion.button>

        <div
          className="w-full h-px mt-5"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* ── Section body ── */}
        <AnimatePresence initial={false}>
          {sectionOpen && (
            <motion.div
              key="roadmap-body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="pt-8 space-y-3">
                {phases.map((p, i) => {
                  const meta =
                    STATUS_META[p.status as keyof typeof STATUS_META];
                  const isOpen = openPhase === p.phase;
                  const label =
                    p.status === "active" ? rm.inProgress : rm.planned;

                  return (
                    <motion.div
                      key={p.phase}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      {/* Phase header — clickable */}
                      <button
                        onClick={() => setOpenPhase(isOpen ? null : p.phase)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
                        style={{ outline: "none" }}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="text-2xl font-black"
                            style={{ color: "rgba(255,255,255,0.08)" }}
                          >
                            {p.phase}
                          </span>
                          <div>
                            <h3 className="font-black text-white text-base">
                              {p.title}
                            </h3>
                            <span
                              className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                              style={{
                                background: meta.badgeBg,
                                border: `1px solid ${meta.badgeBorder}`,
                                color: meta.badgeColor,
                              }}
                            >
                              {label}
                            </span>
                          </div>
                        </div>
                        <div
                          className="flex items-center gap-2"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          <span className="text-xs">
                            {rm.itemsCount.replace(
                              "{n}",
                              String(p.items.length),
                            )}
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            style={{
                              transform: isOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.25s",
                            }}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </button>

                      {/* Phase items */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key={`phase-${p.phase}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              className="px-5 pb-5 pt-1"
                              style={{
                                borderTop: "1px solid rgba(255,255,255,0.05)",
                              }}
                            >
                              <ul className="space-y-2.5 mt-3">
                                {p.items.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center gap-3 text-sm"
                                    style={{
                                      color: "rgba(255,255,255,0.55)",
                                    }}
                                  >
                                    <span
                                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                      style={{
                                        background: meta.dotColor,
                                      }}
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
