'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const features = [
  { icon: '🤝', title: 'Community First', desc: 'Kiyomasa belongs to the people. Holders shape the future of every decision.' },
  { icon: '🎭', title: 'Viral Meme Culture', desc: 'Memes are not just content — they are assets, identity, and cultural power.' },
  { icon: '🎯', title: 'Long-Term Vision', desc: 'We build for legacy, not just hype. Sustainable ecosystem over speculation.' },
  { icon: '🦍', title: 'Japanese Gorilla Narrative', desc: 'Inspired by Kiyomasa, the iconic gorilla from Higashiyama Zoo, Japan.' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative section-padding jp-pattern">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">The Origin</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            What is <span className="gradient-text">Kiyomasa?</span>
          </h2>
          <div className="w-24 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #ff2d2d, transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text + Features */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-lg leading-relaxed mb-10 border-l-2 border-[#c0392b] pl-5"
            >
              Kiyomasa is a community-powered meme project inspired by Japan&apos;s famous gorilla mascot.
              Built on <span className="text-[#ffd700]">culture, memes, and collective conviction</span>,
              $KIYOMASA represents the strength of community and long-term vision.
              We have already donated <span className="text-[#00ff88] font-bold">¥100,000</span> to
              Higashiyama Zoo — every meme can make a difference.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-red rounded-xl p-4 group hover:neon-border-red transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="font-bold text-sm text-white mb-1">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Fan Art Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-3 gap-2">
              {[1,2,3,4,5,6].map((n) => (
                <div
                  key={n}
                  className={`relative overflow-hidden rounded-xl glass neon-border-red group ${n === 1 ? 'col-span-2 row-span-2' : ''}`}
                  style={{ aspectRatio: n === 1 ? '1' : '1' }}
                >
                  <Image
                    src={`/assets/fanart/fan art ${n}.png`}
                    alt={`Fan art ${n}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ))}
            </div>
            {/* Glow orb behind */}
            <div className="absolute -inset-4 rounded-2xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(192,57,43,0.15) 0%, transparent 70%)' }} />
          </motion.div>
        </div>

        {/* Donation banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 neon-border-gold"
        >
          <div className="text-5xl">🎌</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-black text-xl gradient-text-gold mb-1">Zoo Donation Initiative</h3>
            <p className="text-white/60 text-sm">
              Our ecosystem has already donated <span className="text-[#00ff88] font-bold">¥100,000</span> to
              Higashiyama Zoo. Monthly campaigns, gorilla habitat support, and zoo partnerships are coming.
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-[#00ff88]">¥100,000</p>
            <p className="text-xs text-white/40 uppercase tracking-wider">Donated</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
