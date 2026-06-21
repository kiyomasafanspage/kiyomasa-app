"use client";

import Image from "next/image";

export default function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none">
      {/* Background image with opacity */}
      <Image
        src="/assets/backgrounds/background combine up.jpeg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        quality={90}
        style={{ opacity: 0.18 }}
      />

      {/* Dark vignette overlay — keeps edges darker so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 120% at 50% 40%, transparent 30%, rgba(5,5,5,0.55) 80%, rgba(5,5,5,0.9) 100%)",
        }}
      />

      {/* Top and bottom fade to solid black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.5) 0%, transparent 12%, transparent 88%, rgba(5,5,5,0.7) 100%)",
        }}
      />
    </div>
  );
}
