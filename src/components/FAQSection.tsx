'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
  { q: 'Is Kiyomasa affiliated with the zoo?', a: 'No. Kiyomasa Meme is a community-inspired project and is not officially affiliated with any zoo or institution. We independently chose to donate ¥100,000 to Higashiyama Zoo as part of our values.' },
  { q: 'What is the goal of $KIYOMASA?', a: 'To build the strongest Japanese meme community in crypto — combining culture, charity, and viral energy into a lasting movement that goes beyond speculation.' },
  { q: 'How can I participate?', a: 'Join X (@KiyomasaMeme), Telegram (kiyomasa_cto_chat), and the X Community Hub. Every member, every meme, every share matters.' },
  { q: 'Where can I buy $KIYOMASA?', a: 'You can buy on Jupiter Aggregator or any Solana DEX using the contract address: ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump' },
  { q: 'Is there a buy/sell tax?', a: 'No. $KIYOMASA has 0% buy and 0% sell tax. Pure community token.' },
  { q: 'Who controls the project?', a: 'The community. This is a CTO (Community Takeover) project — no single entity controls Kiyomasa. All decisions are made by and for the community.' },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="relative section-padding jp-pattern">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
            <span className="gradient-text">FAQ</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass rounded-xl overflow-hidden transition-all duration-300 ${open === i ? 'neon-border-gold' : 'border border-white/5'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left group"
              >
                <span className={`font-bold text-sm transition-colors ${open === i ? 'gradient-text' : 'text-white/80 group-hover:text-white'}`}>
                  {faq.q}
                </span>
                <span
                  className="ml-3 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all duration-300"
                  style={{
                    borderColor: open === i ? '#ffd700' : 'rgba(255,255,255,0.2)',
                    color: open === i ? '#ffd700' : 'rgba(255,255,255,0.4)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-4 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
