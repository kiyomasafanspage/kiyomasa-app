"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTokenData } from "@/hooks/useTokenData";

interface Toast {
  id: number;
  type: "up" | "down";
  message: string;
}

let toastId = 0;

export default function PriceAlertToast() {
  const { data } = useTokenData(30_000);
  const prevRef = useRef<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (type: "up" | "down", message: string) => {
    const id = ++toastId;
    setToasts((t) => [...t.slice(-2), { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5500);
  };

  useEffect(() => {
    if (data?.price == null) return;
    const prev = prevRef.current;
    if (prev !== null && prev > 0) {
      const pct = ((data.price - prev) / prev) * 100;
      if (pct >= 3) push("up", `+${pct.toFixed(1)}% surge detected 🚀`);
      else if (pct <= -3) push("down", `${pct.toFixed(1)}% dip detected ⚠️`);
    }
    prevRef.current = data.price;
  }, [data?.price]);

  return (
    <div
      className="fixed right-4 z-[65] flex flex-col gap-2 pointer-events-none"
      style={{ top: "5rem" }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 90, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 90, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="glass rounded-xl px-4 py-3 max-w-xs"
            style={{
              border: `1px solid ${t.type === "up" ? "rgba(0,255,136,0.3)" : "rgba(255,68,68,0.3)"}`,
            }}
          >
            <p className="text-[11px] text-white/40 uppercase tracking-widest mb-0.5">
              $KIYOMASA Alert
            </p>
            <p
              className="text-sm font-black"
              style={{ color: t.type === "up" ? "#00ff88" : "#ff4444" }}
            >
              {t.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
