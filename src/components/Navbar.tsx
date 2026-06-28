"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLang, type Lang } from "@/contexts/LanguageContext";

const NAV_KEYS: {
  key: keyof ReturnType<typeof useLang>["tr"]["nav"];
  href: string;
}[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "token", href: "#token" },
  { key: "roadmap", href: "#roadmap" },
  { key: "events", href: "#events" },
  { key: "donation", href: "#donation" },
  { key: "game", href: "#game" },
  { key: "community", href: "#community" },
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
    <div className={`flex items-center ${mini ? "gap-1" : "gap-1"}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className="flex items-center gap-0.5 px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider transition-all duration-200"
          style={
            lang === l.code
              ? {
                  background: "rgba(200,169,75,0.15)",
                  border: "1px solid rgba(200,169,75,0.4)",
                  color: "#c8a94b",
                }
              : {
                  background: "rgba(255,255,255,0.04)",
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
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(6,6,6,0.92)" : "rgba(6,6,6,0.70)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        paddingTop: scrolled ? "0.6rem" : "0.9rem",
        paddingBottom: scrolled ? "0.6rem" : "0.9rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group shrink-0">
          {/* Circular portrait */}
          <div
            className="relative shrink-0 overflow-hidden rounded-full"
            style={{
              width: 38,
              height: 38,
              border: "1.5px solid rgba(255,255,255,0.2)",
              boxShadow: "0 0 10px rgba(255,255,255,0.08)",
            }}
          >
            <Image
              src="/assets/backgrounds/kiyomasa-portrait.jpeg"
              alt="Kiyomasa"
              fill
              className="object-cover object-center"
              sizes="38px"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div>
            <span className="font-black text-lg tracking-[0.15em] text-white">
              KIYOMASA
            </span>
            <span className="text-[9px] text-[#c8a94b]/70 tracking-[0.25em] block -mt-0.5">
              清正
            </span>
          </div>
        </a>

        {/* Desktop links — always visible */}
        <ul className="hidden lg:flex items-center gap-5">
          {NAV_KEYS.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                className="text-[11px] text-white/50 hover:text-white transition-colors duration-200 tracking-widest uppercase font-semibold"
              >
                {tr.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: lang + buy */}
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <a
            href="https://gmgn.ai/sol/token/5RkcycHD_ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[11px] font-black px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap"
          >
            {tr.nav.buy}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white/70 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white/70 transition-all ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white/70 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
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
            className="lg:hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <ul className="flex flex-col py-4 px-5 gap-1">
              {NAV_KEYS.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-white/60 hover:text-white text-xs uppercase tracking-widest font-semibold block py-2"
                  >
                    {tr.nav[l.key]}
                  </a>
                </li>
              ))}
              <li
                className="pt-3 mt-1"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <LangSwitcher mini />
              </li>
              <li className="mt-2">
                <a
                  href="https://gmgn.ai/sol/token/5RkcycHD_ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block text-center text-[11px] font-black px-5 py-3 rounded-full tracking-widest uppercase"
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
