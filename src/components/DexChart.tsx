"use client";

import { useState } from "react";

const TOKEN = "ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump";

interface DexChartProps {
  pairAddress?: string | null;
}

export default function DexChart({ pairAddress }: DexChartProps) {
  const [loaded, setLoaded] = useState(false);
  const addr = pairAddress ?? TOKEN;
  const src = `https://dexscreener.com/solana/${addr}?embed=1&theme=dark&info=0&trades=0`;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ height: 480 }}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 glass-red z-10">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-[#ffd700]"
                style={{
                  height: `${20 + i * 10}px`,
                  animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <p className="text-xs text-white/40 uppercase tracking-widest">
            Loading Chart…
          </p>
        </div>
      )}

      <iframe
        src={src}
        title="KIYOMASA / DEX Screener"
        className="w-full h-full border-0"
        allow="clipboard-write"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
      />

      {/* Gradient frame */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,215,0,0.15)" }}
      />

      <style>{`@keyframes bounce { from { transform: scaleY(0.6); } to { transform: scaleY(1.2); } }`}</style>
    </div>
  );
}
