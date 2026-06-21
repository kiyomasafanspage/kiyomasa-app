"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

const TX_HASH =
  "49xGSR3swW7iZRavq11Trep9QuY3iGdkJQiELZ7R7Y7poQ8NT7wxp5SGRRTMsE8BpFzaPWdhfZjK98nCzQmdfYb";
const TX_URL = `https://solscan.io/tx/${TX_HASH}`;

const DONATIONS = [
  {
    id: 1,
    images: [
      "/assets/donation report/grace donation fix.jpg",
      "/assets/donation report/bukti donasi 1.png",
    ],
    txHash: TX_HASH,
    txUrl: TX_URL,
    accent: "#00ff88",
    icon: "🦍",
  },
  {
    id: 2,
    images: ["/assets/donation report/donasi 2 direct to zoo higashiyama.png"],
    txHash: null,
    txUrl: null,
    accent: "#ffd700",
    icon: "🏯",
  },
];

function ProofGallery({
  images,
  proofLabel,
}: {
  images: string[];
  proofLabel: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* Main image */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-t-2xl">
        <Image
          src={images[active]}
          alt="Donation proof"
          fill
          className="object-cover object-top transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span
            className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(0,255,136,0.4)",
              color: "#00ff88",
            }}
          >
            📸 {proofLabel}{" "}
            {images.length > 1 ? `${active + 1}/${images.length}` : ""}
          </span>
        </div>
      </div>
      {/* Thumbnails (only when multiple images) */}
      {images.length > 1 && (
        <div
          className="flex gap-2 p-3"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
              style={{
                border:
                  active === i
                    ? "2px solid #00ff88"
                    : "2px solid rgba(255,255,255,0.1)",
                opacity: active === i ? 1 : 0.5,
              }}
            >
              <Image
                src={src}
                alt={`Proof ${i + 1}`}
                fill
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DonationCard({
  donation,
  index,
  inView,
}: {
  donation: (typeof DONATIONS)[0];
  index: number;
  inView: boolean;
}) {
  const { tr } = useLang();
  const d = index === 0 ? tr.donation.donation1 : tr.donation.donation2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
      className="glass rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${donation.accent}25` }}
    >
      {/* Card header */}
      <div
        className="px-5 py-3.5 flex items-center justify-between flex-wrap gap-2"
        style={{
          background: `linear-gradient(135deg, ${donation.accent}10 0%, transparent 100%)`,
          borderBottom: `1px solid ${donation.accent}18`,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-black px-2.5 py-1 rounded-full"
            style={{
              background: `${donation.accent}18`,
              border: `1px solid ${donation.accent}50`,
              color: donation.accent,
            }}
          >
            {tr.donation.donationNo}
            {donation.id}
          </span>
          <div>
            <h3 className="font-black text-white text-base leading-tight">
              {d.title}
            </h3>
            <p className="text-xs text-white/40 leading-none mt-0.5">
              {d.date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: donation.accent }}
          />
          <span
            className="text-[10px] uppercase tracking-widest font-bold"
            style={{ color: `${donation.accent}99` }}
          >
            {tr.donation.verifiedOnChain}
          </span>
        </div>
      </div>

      {/* Proof photo(s) */}
      <ProofGallery
        images={donation.images}
        proofLabel={tr.donation.proofLabel}
      />

      {/* Details */}
      <div className="p-5 space-y-4">
        <div>
          <p className="text-[10px] text-white/35 uppercase tracking-widest mb-1">
            {tr.donation.recipient}
          </p>
          <p className="text-base font-black text-white">{d.recipient}</p>
        </div>

        <p className="text-sm text-white/55 leading-relaxed">{d.note}</p>

        {/* TX hash */}
        {donation.txHash && (
          <div
            className="rounded-xl p-3"
            style={{
              background: `${donation.accent}06`,
              border: `1px solid ${donation.accent}18`,
            }}
          >
            <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1.5">
              TX Hash
            </p>
            <p
              className="text-[11px] font-mono break-all leading-relaxed"
              style={{ color: `${donation.accent}b0` }}
            >
              {donation.txHash}
            </p>
          </div>
        )}

        {/* View TX button */}
        {donation.txUrl && (
          <a
            href={donation.txUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:brightness-125 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${donation.accent}18, ${donation.accent}08)`,
              border: `1px solid ${donation.accent}40`,
              color: donation.accent,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {tr.donation.viewTx}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function DonationReport() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useLang();

  return (
    <section id="donation" ref={ref} className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)",
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
          <span className="text-xs tracking-[0.4em] text-[#00ff88]/60 uppercase font-medium">
            {tr.donation.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            {tr.donation.heading}{" "}
            <span className="gradient-text">{tr.donation.headingAccent}</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {tr.donation.sub}
          </p>
          <div
            className="w-24 h-0.5 mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00ff88, transparent)",
            }}
          />
        </motion.div>

        {/* Mission banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-5 mb-10 flex items-start gap-4"
          style={{ border: "1px solid rgba(0,255,136,0.15)" }}
        >
          <div className="text-3xl shrink-0">🦍</div>
          <div>
            <h3 className="font-black text-[#00ff88] text-sm mb-1">
              {tr.donation.missionTitle}
            </h3>
            <p className="text-sm text-white/55 leading-relaxed">
              {tr.donation.missionDesc}
            </p>
          </div>
        </motion.div>

        {/* Donation cards — 2 column on md+ */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {DONATIONS.map((d, i) => (
            <DonationCard key={d.id} donation={d} index={i} inView={inView} />
          ))}
        </div>

        {/* More coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl py-4 px-6 text-center"
          style={{ border: "1px solid rgba(255,215,0,0.1)" }}
        >
          <motion.p
            className="text-sm font-bold text-[#ffd700]/65"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {tr.donation.moreComingSoon}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
