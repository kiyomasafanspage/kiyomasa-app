'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const phases = [
  {
    phase: '01',
    title: 'Community Formation',
    status: 'active',
    items: ['Community Formation', 'Social Growth', 'Meme Expansion', 'Website Launch', 'Initial Zoo Donation'],
  },
  {
    phase: '02',
    title: 'Expansion',
    status: 'upcoming',
    items: ['Influencer Partnerships', 'Community Events', 'Viral Campaigns', 'NFT Genesis Collection', 'Exchange Growth'],
  },
  {
    phase: '03',
    title: 'Ecosystem',
    status: 'future',
    items: ['Ecosystem Expansion', 'Strategic Collaborations', 'Global Awareness', 'NFT Marketplace', 'Staking System'],
  },
  {
    phase: '04',
    title: 'Legacy',
    status: 'future',
    items: ['Kiyomasa Legacy', 'Major Exchange Goals', 'Community Dominance', 'Gorilla Metaverse', 'Zoo Partnerships'],
  },
];

const statusColor = {
  active: { border: 'neon-border-red', badge: 'bg-[#ff2d2d]/20 text-[#ff2d2d] border-[#ff2d2d]/40', dot: '#ff2d2d', label: 'In Progress' },
  upcoming: { border: 'neon-border-gold', badge: 'bg-[#ffd700]/10 text-[#ffd700] border-[#ffd700]/30', dot: '#ffd700', label: 'Coming Soon' },
  future: { border: '', badge: 'bg-white/5 text-white/40 border-white/10', dot: '#ffffff30', label: 'Planned' },
};

export default function RoadmapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="roadmap" ref={ref} className="relative section-padding jp-pattern">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">The Journey</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            Road<span className="gradient-text">map</span>
          </h2>
          <div className="w-24 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #ff2d2d, transparent)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff2d2d] via-[#ffd700] to-transparent transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {phases.map((p, i) => {
              const sc = statusColor[p.status as keyof typeof statusColor];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={p.phase}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative flex items-start md:items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row pl-10 md:pl-0`}
                >
                  {/* Card */}
                  <div className={`flex-1 glass rounded-2xl p-6 ${sc.border} group hover:scale-[1.02] transition-transform`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-black text-white/10">Phase {p.phase}</span>
                      <span className={`text-xs px-3 py-1 rounded-full border font-bold tracking-wider ${sc.badge}`}>
                        {sc.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-black gradient-text mb-4">{p.title}</h3>
                    <ul className="space-y-2">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sc.dot, boxShadow: `0 0 6px ${sc.dot}` }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 flex-shrink-0 mt-8 md:mt-0"
                    style={{ borderColor: sc.dot, background: '#050505', boxShadow: `0 0 10px ${sc.dot}` }} />

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
