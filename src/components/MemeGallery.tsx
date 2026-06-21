"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const memes = [
  { src: "/assets/meme/meme 3.jpg", alt: "Kiyomasa Meme 1" },
  { src: "/assets/meme/meme 4.jpg", alt: "Kiyomasa Meme 2" },
  { src: "/assets/meme/meme 5.jpg", alt: "Kiyomasa Meme 3" },
  { src: "/assets/meme/meme 6.jpg", alt: "Kiyomasa Meme 4" },
  { src: "/assets/meme/meme 8.jpg", alt: "Kiyomasa Meme 5" },
  { src: "/assets/meme/meme 9.jpg", alt: "Kiyomasa Meme 6" },
  { src: "/assets/meme/meme 10.jpg", alt: "Kiyomasa Meme 7" },
];

export default function MemeGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">
            The Movement
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            Meme <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-white/50 text-sm">
            Community-created content. Real culture. Real power.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {memes.map((m, i) => (
            <motion.div
              key={m.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(m.src)}
              className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square glass neon-border-red"
            >
              <Image
                src={m.src}
                alt={m.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs text-white/80 font-medium">
                  {m.alt}
                </span>
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,45,45,0.15) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="relative max-w-2xl w-full aspect-square rounded-2xl overflow-hidden neon-border-gold">
              <Image
                src={selected}
                alt="Selected meme"
                fill
                className="object-contain"
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
      </div>
    </section>
  );
}
