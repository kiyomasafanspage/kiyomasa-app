"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

const TX_HASH =
  "49xGSR3swW7iZRavq11Trep9QuY3iGdkJQiELZ7R7Y7poQ8NT7wxp5SGRRTMsE8BpFzaPWdhfZjK98nCzQmdfYb";
const TX_URL = `https://solscan.io/tx/${TX_HASH}`;

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

      <div className="max-w-4xl mx-auto relative z-10">
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
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-6 mb-8 flex items-start gap-5"
          style={{ border: "1px solid rgba(0,255,136,0.15)" }}
        >
          <div className="text-4xl shrink-0">🦍</div>
          <div>
            <h3 className="font-black text-[#00ff88] text-base mb-1">
              {tr.donation.missionTitle}
            </h3>
            <p className="text-sm text-white/55 leading-relaxed">
              {tr.donation.missionDesc}
            </p>
          </div>
        </motion.div>

        {/* Donation card #1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="glass rounded-2xl overflow-hidden mb-6"
          style={{ border: "1px solid rgba(0,255,136,0.2)" }}
        >
          {/* Card header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,204,102,0.04) 100%)",
              borderBottom: "1px solid rgba(0,255,136,0.12)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                style={{
                  background: "rgba(0,255,136,0.15)",
                  border: "1px solid rgba(0,255,136,0.4)",
                  color: "#00ff88",
                }}
              >
                {tr.donation.donationNo}1
              </div>
              <div>
                <h3 className="font-black text-white text-base">
                  {tr.donation.donation1.title}
                </h3>
                <p className="text-xs text-white/40">
                  {tr.donation.donation1.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
              <span className="text-[10px] text-[#00ff88]/70 uppercase tracking-widest font-bold">
                {tr.donation.verifiedOnChain}
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Proof photo */}
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
              <Image
                src="/assets/donation report/grace donation fix.jpg"
                alt="Donation proof - Grace"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 py-2 px-3 text-center">
                <span
                  className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.75)",
                    color: "#00ff88",
                    border: "1px solid rgba(0,255,136,0.3)",
                  }}
                >
                  {tr.donation.proofLabel}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest mb-1">
                    {tr.donation.recipient}
                  </p>
                  <p className="text-base font-black text-white">
                    {tr.donation.donation1.recipient}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {tr.donation.donation1.note}
                  </p>
                </div>

                {/* TX hash */}
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(0,255,136,0.04)",
                    border: "1px solid rgba(0,255,136,0.12)",
                  }}
                >
                  <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1.5">
                    TX Hash
                  </p>
                  <p className="text-[10px] font-mono text-[#00ff88]/70 break-all leading-relaxed">
                    {TX_HASH.slice(0, 24)}...{TX_HASH.slice(-16)}
                  </p>
                </div>
              </div>

              {/* View TX button */}
              <a
                href={TX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110"
                style={{
                  background: "rgba(0,255,136,0.12)",
                  border: "1px solid rgba(0,255,136,0.35)",
                  color: "#00ff88",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {tr.donation.viewTx}
              </a>
            </div>
          </div>
        </motion.div>

        {/* More coming soon banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-5 text-center"
          style={{ border: "1px solid rgba(255,215,0,0.12)" }}
        >
          <motion.p
            className="text-sm font-bold text-[#ffd700]/70"
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
