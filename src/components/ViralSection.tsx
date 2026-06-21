"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

/* ── Platform SVG logos ── */
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

function InstagramLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="white"
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
    </svg>
  );
}

function XLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Individual media cards ── */
const VIDEOS = [
  {
    id: "youtube",
    url: "https://youtu.be/Z8sYJSvJwMo",
    thumbnail: "https://img.youtube.com/vi/Z8sYJSvJwMo/hqdefault.jpg",
    labelKey: "youtube" as const,
    Logo: YoutubeLogo,
    accentColor: "#FF0000",
    bgGradient:
      "linear-gradient(135deg, rgba(255,0,0,0.12) 0%, rgba(200,0,0,0.04) 100%)",
    borderColor: "rgba(255,0,0,0.25)",
    useImg: true,
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/reel/DZUJ3BHvbD3/",
    thumbnail: null,
    labelKey: "instagram" as const,
    Logo: InstagramLogo,
    accentColor: "#E1306C",
    bgGradient:
      "linear-gradient(135deg, rgba(225,48,108,0.12) 0%, rgba(193,53,132,0.04) 100%)",
    borderColor: "rgba(225,48,108,0.25)",
    useImg: false,
  },
  {
    id: "twitter",
    url: "https://x.com/rt_com/status/2064319271711490185",
    thumbnail: null,
    labelKey: "twitter" as const,
    Logo: XLogo,
    accentColor: "#ffffff",
    bgGradient:
      "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
    borderColor: "rgba(255,255,255,0.15)",
    useImg: false,
  },
] as const;

/* Gorilla emoji overlay for no-thumbnail cards */
const PLATFORM_EMOJI: Record<string, string> = {
  instagram: "🦍",
  twitter: "🐦‍⬛",
};

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
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: video.bgGradient,
        border: `1px solid ${video.borderColor}`,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Thumbnail area */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/40">
        {video.useImg && video.thumbnail ? (
          <>
            <Image
              src={video.thumbnail}
              alt={video.id}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </>
        ) : (
          /* Branded placeholder for Instagram / X */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
              {PLATFORM_EMOJI[video.id]}
            </span>
          </div>
        )}

        {/* Centered play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `${video.accentColor}22`,
              border: `2px solid ${video.accentColor}80`,
              boxShadow: `0 0 24px ${video.accentColor}40`,
            }}
            whileHover={{ scale: 1.15 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={video.accentColor}
              className="ml-1"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </motion.div>
        </div>

        {/* Platform badge — top left */}
        <div className="absolute top-3 left-3">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${video.accentColor}40`,
            }}
          >
            <video.Logo />
          </div>
        </div>

        {/* VIRAL badge — top right */}
        <div className="absolute top-3 right-3">
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.75)",
              border: `1px solid ${video.accentColor}50`,
              color: video.accentColor,
            }}
          >
            VIRAL
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div
        className="flex items-center justify-between px-4 py-3.5"
        style={{ borderTop: `1px solid ${video.borderColor}` }}
      >
        <div className="flex items-center gap-2">
          <video.Logo />
          <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
            {video.id === "youtube"
              ? "YouTube"
              : video.id === "instagram"
                ? "Instagram"
                : "X · Twitter"}
          </span>
        </div>
        <span
          className="text-xs font-black uppercase tracking-widest transition-all group-hover:tracking-[0.15em] duration-300"
          style={{ color: video.accentColor }}
        >
          {watchLabel}
        </span>
      </div>
    </motion.a>
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
          <span className="text-xs tracking-[0.4em] text-[#ff2d2d]/60 uppercase font-medium">
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
                "linear-gradient(90deg, transparent, #ff2d2d, transparent)",
            }}
          />
        </motion.div>

        {/* Video cards grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
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
