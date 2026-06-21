"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

const FAN_ARTS = [
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

/* Duplicate for seamless infinite loop */
const MARQUEE_ITEMS = [...FAN_ARTS, ...FAN_ARTS];

export default function FanArtSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative section-padding pb-0">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(167,139,250,0.05) 0%, transparent 70%)",
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
          <span className="text-xs tracking-[0.4em] text-[#a78bfa]/60 uppercase font-medium">
            {tr.fanart.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            {tr.fanart.heading}{" "}
            <span style={{ color: "#a78bfa" }}>{tr.fanart.headingAccent}</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            {tr.fanart.sub}
          </p>
          <div
            className="w-24 h-0.5 mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #a78bfa, transparent)",
            }}
          />
        </motion.div>

        {/* Grid — show first 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {FAN_ARTS.slice(0, 6).map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setSelected(src)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group glass"
              style={{ border: "1px solid rgba(167,139,250,0.15)" }}
            >
              <Image
                src={src}
                alt={`Fan Art ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-2xl">🔍</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid — show remaining */}
        {FAN_ARTS.length > 6 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
            {FAN_ARTS.slice(6).map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.42 + i * 0.07 }}
                onClick={() => setSelected(src)}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group glass"
                style={{ border: "1px solid rgba(167,139,250,0.15)" }}
              >
                <Image
                  src={src}
                  alt={`Fan Art ${i + 7}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-2xl">🔍</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Marquee slideshow ── */}
      <div className="relative overflow-hidden py-6 border-t border-b border-white/5 mt-4">
        {/* Left / right gradient masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #050505 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(270deg, #050505 0%, transparent 100%)",
          }}
        />

        {/* Label */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-20">
          <span
            className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1 rounded-full"
            style={{
              background: "rgba(167,139,250,0.15)",
              border: "1px solid rgba(167,139,250,0.3)",
              color: "#a78bfa",
            }}
          >
            {tr.fanart.marqueeLabel}
          </span>
        </div>

        {/* Scrolling strip */}
        <div
          className="flex gap-4 w-max"
          style={{
            animation: "marquee 35s linear infinite",
          }}
        >
          {MARQUEE_ITEMS.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group"
              style={{ border: "1px solid rgba(167,139,250,0.2)" }}
              onClick={() => setSelected(src)}
            >
              <Image
                src={src}
                alt={`Marquee ${i}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(167,139,250,0.15)" }}
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(167,139,250,0.4)" }}
          >
            <Image
              src={selected}
              alt="Fan art"
              width={800}
              height={800}
              className="object-contain w-full h-auto max-h-[80vh]"
            />
          </div>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl w-10 h-10 flex items-center justify-center glass rounded-full"
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  );
}
