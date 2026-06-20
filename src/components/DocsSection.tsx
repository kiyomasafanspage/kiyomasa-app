'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const categories = [
  { id: 'overview', label: 'Overview', icon: '📖' },
  { id: 'vision', label: 'Community Vision', icon: '🎯' },
  { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
  { id: 'marketing', label: 'Marketing Plans', icon: '📣' },
  { id: 'governance', label: 'Governance', icon: '🏛️' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
];

const content: Record<string, { title: string; body: string }> = {
  overview: {
    title: 'Overview',
    body: `Kiyomasa ($KIYOMASA) is a community-driven meme ecosystem inspired by the real-life gorilla Kiyomasa from Japan's famous Higashiyama Zoo. Unlike ordinary meme coins, Kiyomasa carries real-world cultural relevance and emotional connection.

Born from internet virality and fueled by strong community engagement, Kiyomasa aims to transform meme culture into a sustainable ecosystem built around entertainment, charity, and digital ownership.

Kiyomasa is not just a token. It is a movement.`,
  },
  vision: {
    title: 'Community Vision',
    body: `Our mission is to build the strongest gorilla-powered meme ecosystem in crypto by combining:

• Viral meme culture and organic community growth
• Community governance where holders shape the future
• Real-world animal conservation support
• NFT collectibles with actual utility
• Long-term brand expansion beyond crypto

We believe memes can create impact beyond speculation. Every meme posted, every community member added, every holder who believes — they all contribute to something bigger.`,
  },
  roadmap: {
    title: 'Development Roadmap',
    body: `Phase 1 — Viral Launch
• Community takeover and CTO establishment
• Website launch and social media presence
• Meme campaigns and organic growth
• Initial donation to Higashiyama Zoo

Phase 2 — Expansion
• NFT Genesis Collection launch
• Community events and Gorilla Raids
• Exchange growth and new listings
• More charity partnerships

Phase 3 — Ecosystem
• NFT marketplace integration
• Staking system development
• Gorilla metaverse integration concept
• Real-world zoo collaborations

Phase 4 — Legacy
• Major exchange goals and milestones
• Community dominance campaigns
• Kiyomasa legacy establishment
• Global awareness campaigns`,
  },
  marketing: {
    title: 'Marketing Plans',
    body: `Our marketing strategy focuses on organic virality and community-driven growth:

Tier 1 — Organic Growth
• Daily meme content across all platforms
• Community raid coordination
• Hashtag campaigns and trending pushes

Tier 2 — Influencer Partnerships
• Crypto Twitter KOL partnerships
• Anime and Japanese culture crossover content
• Meme creator collaborations

Tier 3 — Events & Campaigns
• Weekly Meme Battle competitions
• Community milestone celebrations
• Gorilla Raid campaigns

Tier 4 — Media
• Press releases and crypto media coverage
• YouTube content and space hosting
• Podcast appearances`,
  },
  governance: {
    title: 'Community Governance',
    body: `Kiyomasa is a community takeover (CTO) project. This means:

Decision Making
• Major decisions are voted on by the community
• All token holders have a voice in the ecosystem
• Governance proposals are open to all members

Key Governance Areas
• Marketing budget allocation
• Partnership decisions
• Charity and donation amounts
• NFT collection themes
• Event and campaign planning

How to Participate
• Join the X Community Hub for governance discussions
• Participate in Telegram votes
• Submit proposals through community channels
• Be an active voice in all major decisions`,
  },
  faq: {
    title: 'Frequently Asked Questions',
    body: `Is Kiyomasa affiliated with the zoo?
No. Kiyomasa Meme is a community-inspired project and is not officially affiliated with Higashiyama Zoo or any institution. We independently chose to donate as part of our values.

What is the goal?
To build the strongest Japanese meme community in crypto — combining culture, charity, and viral energy into a lasting movement.

How can I participate?
Join X (@KiyomasaMeme), Telegram (kiyomasa_cto_chat), and the X Community Hub. Every member matters.

Where can I buy $KIYOMASA?
You can buy on Jupiter Aggregator or any Solana DEX using the contract address: ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump

Is there a tax?
No. $KIYOMASA has 0% buy and sell tax.

Who controls the project?
The community. This is a CTO (Community Takeover) project — no single entity controls Kiyomasa.`,
  },
};

export default function DocsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState('overview');

  return (
    <section id="docs" ref={ref} className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.4em] text-[#ffd700]/60 uppercase font-medium">Knowledge Base</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4">
            <span className="gradient-text">Documentation</span>
          </h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Access the latest ecosystem updates, community research, announcements, and development roadmap.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden neon-border-red"
        >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-56 border-b md:border-b-0 md:border-r border-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium px-3 mb-3">Sections</p>
              <nav className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                      active === c.id
                        ? 'bg-[#c0392b]/20 text-white border border-[#ff2d2d]/30'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{c.icon}</span>
                    {c.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-xl font-black gradient-text mb-4">{content[active]?.title}</h3>
                  <div className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                    {content[active]?.body}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
