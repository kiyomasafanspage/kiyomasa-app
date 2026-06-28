"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    icon: "🤝",
    title: "Community First",
    desc: "Kiyomasa belongs to the people. Holders shape the future of every decision.",
  },
  {
    icon: "🎭",
    title: "Viral Meme Culture",
    desc: "Memes are not just content — they are assets, identity, and cultural power.",
  },
  {
    icon: "🎯",
    title: "Long-Term Vision",
    desc: "We build for legacy, not just hype. Sustainable ecosystem over speculation.",
  },
  {
    icon: "🦍",
    title: "Japanese Gorilla Narrative",
    desc: "Inspired by Kiyomasa, the iconic gorilla from Higashiyama Zoo, Japan.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative section-padding jp-pattern"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-white/40 uppercase font-medium">
            The Origin
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            What is <span className="gradient-text">Kiyomasa?</span>
          </h2>
          <div
            className="w-24 h-px mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text + Features */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/65 text-lg leading-relaxed mb-10 border-l-2 border-white/20 pl-5"
            >
              Kiyomasa is a community-powered meme project inspired by
              Japan&apos;s famous gorilla mascot. Built on{" "}
              <span className="text-white font-semibold">
                culture, memes, and collective conviction
              </span>
              , $KIYOMASA represents the strength of community and long-term
              vision. We have already donated{" "}
              <span className="text-[#c8a94b] font-bold">¥200,000+</span> to
              Higashiyama Zoo — every meme can make a difference.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="rounded-xl p-4 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="font-bold text-sm text-white mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Single B&W portrait */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                aspectRatio: "3/4",
              }}
            >
              <Image
                src="/assets/backgrounds/kiyomasa-portrait.jpeg"
                alt="Kiyomasa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                style={{ filter: "grayscale(100%) contrast(1.05)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(6,6,6,0.1) 0%, rgba(6,6,6,0.6) 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-black text-2xl tracking-[0.2em]">
                  清正
                </p>
                <p className="text-white/50 text-xs tracking-widest uppercase">
                  Kiyomasa · Higashiyama Zoo
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Donation banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(200,169,75,0.2)",
          }}
        >
          <div className="text-5xl">🎌</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-black text-xl text-[#c8a94b] mb-1">
              Zoo Donation Initiative
            </h3>
            <p className="text-white/60 text-sm">
              Our ecosystem has already donated{" "}
              <span className="text-[#c8a94b] font-bold">¥200,000+</span> to
              Higashiyama Zoo. Monthly campaigns, gorilla habitat support, and
              zoo partnerships are coming.
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-[#c8a94b]">¥200,000+</p>
            <p className="text-xs text-white/40 uppercase tracking-wider">
              Donated
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
