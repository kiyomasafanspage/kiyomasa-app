'use client';

import { motion } from 'framer-motion';

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Community', href: '#community' },
  { label: 'Docs', href: '#docs' },
];

const socials = [
  { label: 'X / Twitter', href: 'https://x.com/KiyomasaMeme', icon: '𝕏' },
  { label: 'Telegram', href: 'https://t.me/kiyomasa_cto_chat', icon: '✈' },
  { label: 'Community', href: 'https://x.com/i/communities/1959463470325252358', icon: '🌐' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 jp-pattern">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🦍</span>
              <div>
                <p className="font-black text-2xl tracking-widest gradient-text">KIYOMASA</p>
                <p className="text-[10px] text-[#ffd700]/50 tracking-[0.4em]">$KIYOMASA • SOLANA</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Japan&apos;s gorilla meme movement. Community-driven. Built by believers. Powered by memes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Navigation</p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="text-sm text-white/50 hover:text-[#ffd700] transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Community</p>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 glass rounded-lg flex items-center justify-center text-sm group-hover:neon-border-gold transition-all">
                    {s.icon}
                  </span>
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(192,57,43,0.4), rgba(212,160,23,0.4), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 text-center md:text-left">
            © 2026 KIYOMASA MEME. Built by the community. Powered by memes. 🦍🇯🇵
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/20">Not financial advice.</span>
            <span className="text-xs text-white/20">•</span>
            <span className="text-xs text-white/20">DYOR.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
