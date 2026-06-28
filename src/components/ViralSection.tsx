"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

/* ── YouTube logo ── */
function YoutubeLogo() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <path
        d="M19.582 2.186A2.506 2.506 0 0 0 17.822.42C16.254 0 10 0 10 0S3.746 0 2.178.42A2.506 2.506 0 0 0 .418 2.186 26.3 26.3 0 0 0 0 7a26.3 26.3 0 0 0 .418 4.814A2.506 2.506 0 0 0 2.178 13.58C3.746 14 10 14 10 14s6.254 0 7.822-.42a2.506 2.506 0 0 0 1.76-1.766A26.3 26.3 0 0 0 20 7a26.3 26.3 0 0 0-.418-4.814Z"
        fill="#FF0000"
      />
      <path d="M8 10l5.333-3L8 4v6Z" fill="white" />
    </svg>
  );
}

const BW = {
  accent: "rgba(255,255,255,0.75)",
  bg: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.1)",
} as const;

const VIDEOS = [
  {
    id: "Z8sYJSvJwMo",
    url: "https://youtu.be/Z8sYJSvJwMo",
    thumbnail: "https://img.youtube.com/vi/Z8sYJSvJwMo/hqdefault.jpg",
    desc: "Kiyomasa going viral worldwide — the gorilla the internet simply can't ignore.",
  },
  {
    id: "ADl_Z2DeUUU",
    url: "https://youtu.be/ADl_Z2DeUUU",
    thumbnail: "https://img.youtube.com/vi/ADl_Z2DeUUU/hqdefault.jpg",
    desc: "The community speaks. Watch the movement grow in real time across every platform.",
  },
  {
    id: "ke9KIlY-Ejo",
    url: "https://youtu.be/ke9KIlY-Ejo",
    thumbnail: "https://img.youtube.com/vi/ke9KIlY-Ejo/hqdefault.jpg",
    desc: "From zoo to trending — Kiyomasa's rise captured by fans and creators worldwide.",
  },
] as const;

function VideoCard({
  video,
  index,
  inView,
  watchLabel,
}: {
  video: (typeof VIDEOS)[number];
  index: number;
  inView: boolean;
  watchLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="flex flex-col"
    >
      {/* Card */}
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: BW.bg,
          border: `1px solid ${BW.border}`,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden bg-black/40">
          <Image
            src={video.thumbnail}
            alt={`Video ${video.id}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
            style={{ filter: "grayscale(100%)" }}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: `${BW.accent}22`,
                border: `2px solid ${BW.accent}80`,
                boxShadow: `0 0 24px ${BW.accent}40`,
              }}
              whileHover={{ scale: 1.15 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={BW.accent}
                className="ml-1"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </motion.div>
          </div>

          {/* Platform badge */}
          <div className="absolute top-3 left-3">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${BW.accent}40`,
              }}
            >
              <YoutubeLogo />
            </div>
          </div>

          {/* VIRAL badge */}
          <div className="absolute top-3 right-3">
            <span
              className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.75)",
                border: `1px solid ${BW.accent}50`,
                color: BW.accent,
              }}
            >
              VIRAL
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-3.5"
          style={{ borderTop: `1px solid ${BW.border}` }}
        >
          <div className="flex items-center gap-2">
            <YoutubeLogo />
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
              YouTube
            </span>
          </div>
          <span
            className="text-xs font-black uppercase tracking-widest transition-all group-hover:tracking-[0.15em] duration-300"
            style={{ color: BW.accent }}
          >
            {watchLabel}
          </span>
        </div>
      </a>

      {/* Description below card */}
      <p
        className="text-xs leading-relaxed mt-3 px-1"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {video.desc}
      </p>
    </motion.div>
  );
}

export default function ViralSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useLang();

  return (
    <section id="viral" ref={ref} className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,45,45,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] text-[rgba(255,255,255,0.25)]/60 uppercase font-medium">
            {tr.viral.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            <span className="gradient-text">{tr.viral.heading}</span>{" "}
            <span className="text-white">{tr.viral.headingAccent}</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            {tr.viral.sub}
          </p>
          <div
            className="w-24 h-0.5 mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
        </motion.div>

        {/* Video cards grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {VIDEOS.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              index={i}
              inView={inView}
              watchLabel={tr.viral.watchBtn}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
