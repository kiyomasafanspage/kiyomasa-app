"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

const events = [
  {
    src: "/assets/event/kiyomasa chalenge.jpg",
    titleKey: "event1Title" as const,
    descKey: "event1Desc" as const,
    tag: "CHALLENGE",
    accent: "#ff2d2d",
  },
  {
    src: "/assets/event/event.jpg",
    titleKey: "event2Title" as const,
    descKey: "event2Desc" as const,
    tag: "EVENT",
    accent: "#ffd700",
  },
];

export default function EventSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="events" ref={ref} className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,57,43,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">
            {tr.events.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            {tr.events.heading}{" "}
            <span className="gradient-text">{tr.events.headingAccent}</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            {tr.events.sub}
          </p>
          <div
            className="w-24 h-0.5 mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ff2d2d, transparent)",
            }}
          />
        </motion.div>

        {/* Event cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((ev, i) => (
            <motion.div
              key={ev.src}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div
                className="glass rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: `1px solid ${ev.accent}25` }}
                onClick={() => setSelected(ev.src)}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={ev.src}
                    alt={tr.events[ev.titleKey]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Tag badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        background: `${ev.accent}30`,
                        border: `1px solid ${ev.accent}60`,
                        color: ev.accent,
                      }}
                    >
                      {ev.tag}
                    </span>
                  </div>

                  {/* Zoom icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        background: "rgba(0,0,0,0.7)",
                        border: `1px solid ${ev.accent}50`,
                      }}
                    >
                      🔍
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3
                    className="text-lg font-black mb-2"
                    style={{ color: ev.accent }}
                  >
                    {tr.events[ev.titleKey]}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {tr.events[ev.descKey]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
          <div className="relative max-w-4xl w-full rounded-2xl overflow-hidden neon-border-red">
            <Image
              src={selected}
              alt="Event"
              width={1200}
              height={800}
              className="object-contain w-full h-auto"
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
