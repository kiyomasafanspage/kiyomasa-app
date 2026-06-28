"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

const MEME_IMAGES = [
  "/assets/meme/meme 3.jpg",
  "/assets/meme/meme 4.jpg",
  "/assets/meme/meme 5.jpg",
  "/assets/meme/meme 6.jpg",
  "/assets/meme/meme 8.jpg",
  "/assets/meme/meme 9.jpg",
  "/assets/meme/meme 10.jpg",
];

const FANS_ARTS = [
  "/assets/fanart/fan art 1.png",
  "/assets/fanart/fan art 2.png",
  "/assets/fanart/fan art 3.png",
  "/assets/fanart/fan art 4.png",
  "/assets/fanart/fan art 5.png",
  "/assets/fanart/fan art 6.png",
  "/assets/fanart/fan art 7.png",
  "/assets/fanart/fan art 8.png",
  "/assets/fanart/fan art 9.png",
  "/assets/fanart/fans art 11.png",
  "/assets/fanart/fans art 12.png",
  "/assets/fanart/fans art 13.png",
  "/assets/fanart/fans art 14.png",
];

const ALL_ITEMS = [...MEME_IMAGES, ...FANS_ARTS];
const MARQUEE_ITEMS = [...ALL_ITEMS, ...ALL_ITEMS];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FanArtSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section ref={ref} id="memes" className="relative section-padding">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Collapsible header */}
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          onClick={() => setExpanded((p) => !p)}
          className="w-full flex items-center justify-between"
          style={{ outline: "none" }}
          aria-expanded={expanded}
        >
          <div className="text-left">
            <span
              className="text-[10px] tracking-[0.4em] uppercase font-medium block mb-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {tr.fanart.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-none">
              {tr.fanart.heading}{" "}
              <span className="gradient-text">{tr.fanart.headingAccent}</span>
            </h2>
          </div>
          <div
            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ml-4 transition-all duration-200"
            style={{
              background: expanded
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <ChevronIcon open={expanded} />
          </div>
        </motion.button>

        <div
          className="w-full h-px mt-5"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* Collapsible grid */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="meme-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="pt-8">
                <p
                  className="text-sm mb-8 max-w-lg leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {tr.fanart.sub}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                  {ALL_ITEMS.map((src, i) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: i * 0.03 }}
                      onClick={() => setSelected(src)}
                      className="relative rounded-lg overflow-hidden cursor-pointer group"
                      style={{
                        aspectRatio: "1/1",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <Image
                        src={src}
                        alt={`Meme ${i + 1}`}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-400"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      >
                        <span className="text-lg">🔍</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marquee strip — always visible */}
        <div className="mt-6 relative">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.35em] block mb-3"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            ✦ {tr.fanart.marqueeLabel} ✦
          </span>
          <div
            className="overflow-hidden py-2 relative"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #060606, transparent)",
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(270deg, #060606, transparent)",
              }}
            />
            <div
              className="flex gap-2 w-max"
              style={{ animation: "fans-arts-marquee 55s linear infinite" }}
            >
              {MARQUEE_ITEMS.map((src, i) => (
                <div
                  key={`m-${i}`}
                  onClick={() => setSelected(src)}
                  className="relative flex-shrink-0 rounded overflow-hidden cursor-pointer group"
                  style={{
                    width: 110,
                    height: 110,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Slide ${(i % ALL_ITEMS.length) + 1}`}
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fans-arts-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/96 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-xl overflow-hidden"
            style={{
              background: "rgba(8,8,8,0.99)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Preview"
              width={900}
              height={900}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-white text-xl transition-colors"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  );
}
