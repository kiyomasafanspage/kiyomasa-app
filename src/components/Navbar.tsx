"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, type Lang } from "@/contexts/LanguageContext";

const NAV_KEYS: {
  key: keyof ReturnType<typeof useLang>["tr"]["nav"];
  href: string;
}[] = [
  { key: "home", href: "#home" },
  { key: "token", href: "#token" },
  { key: "pump", href: "#pump" },
  { key: "calculator", href: "#calculator" },
  { key: "roadmap", href: "#roadmap" },
  { key: "community", href: "#community" },
  { key: "events", href: "#events" },
  { key: "donation", href: "#donation" },
  { key: "docs", href: "#docs" },
];

const LANGS: { code: Lang; flag: string; short: string }[] = [
  { code: "en", flag: "🇺🇸", short: "EN" },
  { code: "ja", flag: "🇯🇵", short: "JP" },
  { code: "zh", flag: "🇨🇳", short: "ZH" },
];

function LangSwitcher({ mini = false }: { mini?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center ${mini ? "gap-1" : "gap-1.5"}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className="flex items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200"
          style={
            lang === l.code
              ? {
                  background: "rgba(255,215,0,0.15)",
                  border: "1px solid rgba(255,215,0,0.4)",
                  color: "#ffd700",
                }
              : {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                }
          }
          aria-label={`Switch to ${l.short}`}
        >
          <span className="text-xs">{l.flag}</span>
          {!mini && <span>{l.short}</span>}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { tr } = useLang();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <span className="text-3xl">🦍</span>
          <div>
            <span className="font-black text-xl tracking-widest gradient-text">
              KIYOMASA
            </span>
            <span className="text-[10px] text-[#ffd700]/60 tracking-[0.3em] block -mt-1">
              $KIYOMASA
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-4">
          {NAV_KEYS.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                className="text-[11px] text-white/60 hover:text-[#ffd700] transition-colors duration-200 tracking-wider uppercase font-bold"
              >
                {tr.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <a
            href="https://jup.ag/swap/SOL-ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-white text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap"
          >
            {tr.nav.buy}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <ul className="flex flex-col py-4 px-4 gap-3">
              {NAV_KEYS.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-white/75 hover:text-[#ffd700] text-sm uppercase tracking-wider font-bold block py-1.5"
                  >
                    {tr.nav[l.key]}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-white/5">
                <LangSwitcher mini />
              </li>
              <li>
                <a
                  href="https://jup.ag/swap/SOL-ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block text-center text-white text-sm font-bold px-5 py-3 rounded-full tracking-widest uppercase mt-1"
                >
                  {tr.nav.buy}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
