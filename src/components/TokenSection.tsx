'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CA = 'ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { label: 'Holders', value: 3200, suffix: '+' },
  { label: 'Community Members', value: 8500, suffix: '+' },
  { label: 'Social Reach', value: 50000, suffix: '+' },
  { label: 'Volume (24h)', value: 120000, suffix: '+' },
];

const tokenInfo = [
  { label: 'Token Name', value: 'KIYOMASA' },
  { label: 'Symbol', value: '$KIYOMASA' },
  { label: 'Network', value: 'Solana' },
  { label: 'Community', value: 'CTO Driven' },
  { label: 'Tax', value: '0 / 0' },
  { label: 'Supply', value: '1,000,000,000' },
];

export default function TokenSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="token" ref={ref} className="relative section-padding">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,57,43,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">On-Chain</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            Token <span className="gradient-text">Information</span>
          </h2>
          <div className="w-24 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #ffd700, transparent)' }} />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-gold rounded-2xl p-5 text-center neon-border-gold group hover:scale-105 transition-transform"
            >
              <p className="text-2xl md:text-3xl font-black gradient-text-gold">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-white/50 uppercase tracking-widest mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Token info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass rounded-2xl p-8 neon-border-red"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-black gradient-text mb-6">Token Details</h3>
              <div className="space-y-3">
                {tokenInfo.map((t) => (
                  <div key={t.label} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50 uppercase tracking-wider">{t.label}</span>
                    <span className="text-sm font-bold text-white">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black gradient-text-gold mb-4">Contract Address</h3>
                <div className="glass-red rounded-xl p-4 neon-border-red mb-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Solana CA</p>
                  <p className="text-xs font-mono text-[#ffd700] break-all leading-relaxed">{CA}</p>
                </div>
                <button
                  onClick={copyCA}
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                    copied ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40' : 'btn-primary text-white'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy Contract Address'}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="https://jup.ag/swap/SOL-ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-white text-xs font-bold py-3 rounded-xl text-center tracking-widest uppercase"
                >
                  Buy on Jupiter
                </a>
                <a
                  href="https://dexscreener.com/solana/ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs font-bold py-3 rounded-xl text-center tracking-widest uppercase"
                >
                  DexScreener
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
