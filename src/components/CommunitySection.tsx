"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTokenData, fmtUsd } from "@/hooks/useTokenData";
import { useLang } from "@/contexts/LanguageContext";

/* ── Brand SVGs ── */
function XLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
        fill="#229ED9"
      />
      <path
        d="M17.93 7.093 5.995 11.55c-.812.325-.808.777-.148.977l3.054.953 7.086-4.474c.334-.203.64-.094.389.13L9.98 14.58l-.23 3.142c.337 0 .485-.154.669-.331l1.607-1.563 3.342 2.469c.616.339 1.059.164 1.212-.572l2.193-10.334c.222-.888-.336-1.29-1.045-.898z"
        fill="white"
      />
    </svg>
  );
}

function XCommunityIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      <path d="M16 8h-2v8h2V8zM10 8H8v8h2V8z" fill="none" />
      <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8L2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.76-1.12-5.26-2.92-7.08l-1.43 1.43zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ── Channels static config (no translatable text) ── */
const CHANNEL_DEFS = [
  {
    Logo: ({ size }: { size?: number }) => (
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: size ?? 56,
          height: size ?? 56,
          background: "#000",
          boxShadow: "0 0 24px rgba(255,255,255,0.1)",
        }}
      >
        <XLogo size={(size ?? 56) * 0.5} />
      </div>
    ),
    name: "X / Twitter",
    handle: "@KiyomasaMeme",
    href: "https://x.com/KiyomasaMeme",
    color: "#ffffff",
  },
  {
    Logo: ({ size }: { size?: number }) => (
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: size ?? 56,
          height: size ?? 56,
          background: "linear-gradient(135deg, #2AABEE 0%, #229ED9 100%)",
          boxShadow: "0 0 24px rgba(34,158,217,0.35)",
        }}
      >
        <TelegramLogo size={(size ?? 56) * 0.5} />
      </div>
    ),
    name: "Telegram",
    handle: "CTO Chat",
    href: "https://t.me/kiyomasa_cto_chat",
    color: "#229ED9",
  },
  {
    Logo: ({ size }: { size?: number }) => (
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: size ?? 56,
          height: size ?? 56,
          background: "linear-gradient(135deg, #d4a017 0%, #ffd700 100%)",
          boxShadow: "0 0 24px rgba(212,160,23,0.35)",
        }}
      >
        <XCommunityIcon size={(size ?? 56) * 0.5} />
      </div>
    ),
    name: "Community Hub",
    handle: "X Community",
    href: "https://x.com/i/communities/1959463470325252358",
    color: "#ffd700",
  },
];

/* ── Animated live counter — increments on random interval ── */
function LiveCounter({
  base,
  delta,
  suffix = "",
}: {
  base: number;
  delta: number;
  suffix?: string;
}) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setVal((v) => v + 1 + Math.floor(Math.random() * delta));
      id = setTimeout(tick, 5000 + Math.random() * 8000);
    };
    id = setTimeout(tick, 2000 + Math.random() * 4000);
    return () => clearTimeout(id);
  }, [delta]);
  return (
    <span>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function CommunitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = useTokenData(30_000);
  const { tr } = useLang();

  const channelDescs = [
    tr.community.xDesc,
    tr.community.teleDesc,
    tr.community.hubDesc,
  ];
  const channelLabels = [
    tr.community.follow,
    tr.community.joinChat,
    tr.community.joinHub,
  ];
  const channels = CHANNEL_DEFS.map((c, i) => ({
    ...c,
    desc: channelDescs[i],
    label: channelLabels[i],
  }));

  return (
    <section
      id="community"
      ref={ref}
      className="relative section-padding jp-pattern"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,57,43,0.08) 0%, transparent 70%)",
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
            {tr.community.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            {tr.community.heading}{" "}
            <span className="gradient-text">{tr.community.headingAccent}</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            {tr.community.sub}
          </p>
        </motion.div>

        {/* Social cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {channels.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl p-6 flex flex-col items-center text-center group hover:scale-105 transition-all duration-300"
              style={{ border: `1px solid ${c.color}25` }}
            >
              {/* Logo */}
              <div className="mb-5 group-hover:scale-110 transition-transform duration-300">
                <c.Logo size={60} />
              </div>

              <h3 className="font-black text-lg text-white mb-1">{c.name}</h3>
              <p className="text-xs font-bold mb-3" style={{ color: c.color }}>
                {c.handle}
              </p>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                {c.desc}
              </p>

              <span
                className="text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-widest transition-all group-hover:brightness-110"
                style={{
                  background: `${c.color}18`,
                  border: `1px solid ${c.color}40`,
                  color: c.color,
                }}
              >
                {c.label} →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Live Activity Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass-red rounded-2xl p-6 neon-border-red"
        >
          {/* Banner header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2d2d] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff2d2d]" />
              </span>
              <h3 className="font-black text-lg gradient-text">
                {tr.community.activityTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">
                {tr.community.refresh}
              </span>
              <span className="text-xs text-white/20">·</span>
              <span className="text-xs text-[#00ff88]/60 font-bold uppercase tracking-wider">
                {tr.community.live}
              </span>
            </div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Volume from DEX */}
            <div className="glass rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
              <p className="font-black text-[#ffd700] text-lg">
                {data ? (
                  fmtUsd(data.volume24h)
                ) : (
                  <span className="inline-block w-14 h-4 rounded bg-white/10 animate-pulse" />
                )}
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                {tr.community.volume}
              </p>
            </div>

            {/* Transactions from DEX */}
            <div className="glass rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
              <p className="font-black text-[#ff6b6b] text-lg">
                {data ? (
                  (data.buys24h + data.sells24h).toLocaleString()
                ) : (
                  <span className="inline-block w-14 h-4 rounded bg-white/10 animate-pulse" />
                )}
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                {tr.community.txns}
              </p>
            </div>

            {/* X posts — animated counter */}
            <div className="glass rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
              <p className="font-black text-[#a78bfa] text-lg">
                <LiveCounter base={240} delta={3} suffix="+" />
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                {tr.community.xposts}
              </p>
            </div>

            {/* Active members — animated counter */}
            <div className="glass rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
              <p className="font-black text-[#00ff88] text-lg">
                <LiveCounter base={626} delta={3} suffix="+" />
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                {tr.community.members}
              </p>
            </div>
          </div>

          {/* Buy/sell mini bar if we have tx data */}
          {data && data.buys24h + data.sells24h > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[10px] text-white/30 uppercase tracking-widest w-20 shrink-0 text-right">
                🟢 {data.buys24h.toLocaleString()} buys
              </span>
              <div className="relative flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                {(() => {
                  const total = data.buys24h + data.sells24h;
                  const pct = Math.round((data.buys24h / total) * 100);
                  return (
                    <>
                      <div
                        className="absolute left-0 top-0 h-full rounded-l-full"
                        style={{
                          width: `${pct}%`,
                          background: "linear-gradient(90deg,#00ff88,#00cc66)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-0 h-full rounded-r-full"
                        style={{
                          width: `${100 - pct}%`,
                          background: "linear-gradient(270deg,#ff4444,#cc2222)",
                        }}
                      />
                    </>
                  );
                })()}
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-widest w-20 shrink-0">
                {data.sells24h.toLocaleString()} sells 🔴
              </span>
            </div>
          )}

          {/* Powered by */}
          <p className="text-[10px] text-white/20 text-center mt-4 tracking-widest uppercase">
            {tr.community.poweredBy}{" "}
            <a
              href="https://dexscreener.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffd700]/40 hover:text-[#ffd700]/60 transition-colors"
            >
              DEX Screener
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
