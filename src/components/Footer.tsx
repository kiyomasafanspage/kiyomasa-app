"use client";

import { useLang } from "@/contexts/LanguageContext";

const nav = [
  { labelKey: "Home", href: "#home" },
  { labelKey: "About", href: "#about" },
  { labelKey: "Roadmap", href: "#roadmap" },
  { labelKey: "Community", href: "#community" },
  { labelKey: "Docs", href: "#docs" },
];

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
        fill="#229ED9"
      />
      <path
        d="M17.93 7.093 5.995 11.55c-.812.325-.808.777-.148.977l3.054.953 7.086-4.474c.334-.203.64-.094.389.13L9.98 14.58l-.23 3.142c.337 0 .485-.154.669-.331l1.607-1.563 3.342 2.469c.616.339 1.059.164 1.212-.572l2.193-10.334c.222-.888-.336-1.29-1.045-.898z"
        fill="white"
      />
    </svg>
  );
}

const socials = [
  {
    label: "X / Twitter",
    href: "https://x.com/KiyomasaMeme",
    Icon: XIcon,
    bg: "#000",
    glow: "rgba(255,255,255,0.12)",
  },
  {
    label: "Telegram",
    href: "https://t.me/kiyomasa_cto_chat",
    Icon: TelegramIcon,
    bg: "linear-gradient(135deg,#2AABEE,#229ED9)",
    glow: "rgba(34,158,217,0.3)",
  },
  {
    label: "Community Hub",
    href: "https://x.com/i/communities/1959463470325252358",
    Icon: () => <span className="text-sm">🌐</span>,
    bg: "linear-gradient(135deg,#d4a017,#ffd700)",
    glow: "rgba(212,160,23,0.3)",
  },
];

export default function Footer() {
  const { tr } = useLang();
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
                <p className="font-black text-2xl tracking-widest gradient-text">
                  KIYOMASA
                </p>
                <p className="text-[10px] text-[#ffd700]/50 tracking-[0.4em]">
                  $KIYOMASA • SOLANA
                </p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              {tr.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium mb-4">
              {tr.footer.navLabel}
            </p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.labelKey}>
                  <a
                    href={n.href}
                    className="text-sm text-white/50 hover:text-[#ffd700] transition-colors"
                  >
                    {n.labelKey}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium mb-4">
              {tr.footer.communityLabel}
            </p>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: s.bg,
                      boxShadow: `0 0 10px ${s.glow}`,
                    }}
                  >
                    <s.Icon />
                  </span>
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(192,57,43,0.4), rgba(212,160,23,0.4), transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 text-center md:text-left">
            {tr.footer.copyright}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/20">
              {tr.footer.disclaimer}
            </span>
            <span className="text-xs text-white/20">•</span>
            <span className="text-xs text-white/20">{tr.footer.dyor}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
