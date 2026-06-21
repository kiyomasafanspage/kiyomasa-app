"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

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

/* Duplicate for seamless infinite loop */
const MARQUEE_ITEMS = [...FANS_ARTS, ...FANS_ARTS];

function GridItem({
  src,
  index,
  inView,
  onSelect,
  delay,
}: {
  src: string;
  index: number;
  inView: boolean;
  onSelect: (src: string) => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      onClick={() => onSelect(src)}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{
        border: "1px solid rgba(167,139,250,0.18)",
        background: "rgba(10,5,20,0.6)",
        aspectRatio: "1 / 1",
      }}
    >
      <Image
        src={src}
        alt={`Fans Art ${index + 1}`}
        fill
        className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
      />
      {/* hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ background: "rgba(167,139,250,0.12)" }}
      >
        <span className="text-2xl drop-shadow-lg">🔍</span>
      </div>
    </motion.div>
  );
}

export default function FanArtSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative section-padding overflow-x-hidden">
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
          className="text-center mb-12"
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

        {/* Grid — all 13 images, uniform 3-4 col */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
          {FANS_ARTS.map((src, i) => (
            <GridItem
              key={src}
              src={src}
              index={i}
              inView={inView}
              onSelect={setSelected}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>

      {/* ── Marquee strip — OUTSIDE max-w container for full bleed ── */}
      <div className="relative">
        {/* label ABOVE the overflow-hidden strip so it won't be clipped */}
        <div className="flex items-center justify-center mb-3">
          <span
            className="text-[10px] font-black uppercase tracking-[0.3em] px-5 py-1.5 rounded-full"
            style={{
              background: "rgba(167,139,250,0.15)",
              border: "1px solid rgba(167,139,250,0.35)",
              color: "#a78bfa",
            }}
          >
            ✦ {tr.fanart.marqueeLabel} ✦
          </span>
        </div>

        {/* Strip with overflow-hidden only on this div */}
        <div
          className="overflow-hidden py-3 border-t border-b"
          style={{ borderColor: "rgba(167,139,250,0.12)" }}
        >
          {/* Left / right gradient masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #050505 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(270deg, #050505 0%, transparent 100%)",
            }}
          />

          {/* Scrolling row */}
          <div
            className="flex gap-3 w-max"
            style={{ animation: "fans-arts-marquee 40s linear infinite" }}
          >
            {MARQUEE_ITEMS.map((src, i) => (
              <div
                key={`m-${i}`}
                onClick={() => setSelected(src)}
                className="relative flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group"
                style={{
                  width: 140,
                  height: 140,
                  border: "1px solid rgba(167,139,250,0.2)",
                  background: "rgba(10,5,20,0.6)",
                }}
              >
                <Image
                  src={src}
                  alt={`Marquee ${(i % FANS_ARTS.length) + 1}`}
                  fill
                  className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(167,139,250,0.15)" }}
                />
              </div>
            ))}
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
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-xl w-full rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(167,139,250,0.4)",
              background: "rgba(10,5,20,0.95)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Fans art"
              width={800}
              height={800}
              className="object-contain w-full h-auto max-h-[80vh] p-3"
            />
          </div>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl w-10 h-10 flex items-center justify-center glass rounded-full z-10"
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  );
}
