'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const channels = [
  {
    icon: '🐦',
    name: 'X / Twitter',
    handle: '@KiyomasaMeme',
    desc: 'Follow the latest memes, announcements, and community updates.',
    href: 'https://x.com/KiyomasaMeme',
    color: '#1d9bf0',
    label: 'Follow Us',
  },
  {
    icon: '✈️',
    name: 'Telegram',
    handle: 'CTO Chat',
    desc: 'Join the core CTO community. Degens only. 24/7 energy.',
    href: 'https://t.me/kiyomasa_cto_chat',
    color: '#0088cc',
    label: 'Join Chat',
  },
  {
    icon: '🌐',
    name: 'Community Hub',
    handle: 'X Community',
    desc: 'Participate in discussions, governance, and meme battles.',
    href: 'https://x.com/i/communities/1959463470325252358',
    color: '#d4a017',
    label: 'Join Hub',
  },
];

export default function CommunitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="community" ref={ref} className="relative section-padding jp-pattern">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,57,43,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">Gorilla Army</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            Join The <span className="gradient-text">Movement</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            The gorilla army grows stronger every day. Pick your channel. Bring the energy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
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
              style={{ borderColor: `${c.color}30`, border: `1px solid ${c.color}30` }}
            >
              <div
                className="text-5xl mb-4 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform"
                style={{ background: `${c.color}15`, boxShadow: `0 0 20px ${c.color}20` }}
              >
                {c.icon}
              </div>
              <h3 className="font-black text-lg text-white mb-1">{c.name}</h3>
              <p className="text-xs font-bold mb-3" style={{ color: c.color }}>{c.handle}</p>
              <p className="text-sm text-white/50 leading-relaxed mb-5">{c.desc}</p>
              <span
                className="text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-widest transition-all"
                style={{
                  background: `${c.color}20`,
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
          className="mt-10 glass-red rounded-2xl p-6 neon-border-red"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#ff2d2d] glow-pulse" />
              <h3 className="font-black text-lg gradient-text">Community Activity</h3>
            </div>
            <span className="text-xs text-white/40 uppercase tracking-wider">Live</span>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'X Posts Today', value: '240+' },
              { label: 'Meme Submissions', value: '45+' },
              { label: 'Community Votes', value: '1,200+' },
              { label: 'Active Members', value: '890+' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 text-center">
                <p className="font-black text-[#ffd700] text-lg">{s.value}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
