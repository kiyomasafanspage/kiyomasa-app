"use client";

import Image from "next/image";

export default function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none">
      <div className="absolute inset-0" style={{ background: "#060606" }} />
      <Image
        src="/assets/backgrounds/background combine up.jpeg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        style={{ opacity: 0.07 }}
      />
    </div>
  );
}
