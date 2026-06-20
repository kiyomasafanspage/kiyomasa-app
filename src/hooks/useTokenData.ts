"use client";

import { useState, useEffect, useCallback } from "react";

export interface TokenData {
  price: number | null;
  priceChange1h: number;
  priceChange24h: number;
  volume1h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  buys24h: number;
  sells24h: number;
  pairAddress: string | null;
  updatedAt: Date;
}

export function useTokenData(intervalMs = 30_000) {
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/token", { cache: "no-store" });
      if (!r.ok) throw new Error("bad response");
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      setData({ ...j, updatedAt: new Date() });
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, intervalMs);
    return () => clearInterval(id);
  }, [load, intervalMs]);

  return { data, loading, error, refetch: load };
}

export function fmtUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

export function fmtPrice(n: number | null): string {
  if (n === null) return "—";
  if (n < 0.000001) return `$${n.toExponential(3)}`;
  if (n < 0.001) return `$${n.toFixed(8)}`;
  if (n < 1) return `$${n.toFixed(6)}`;
  return `$${n.toFixed(4)}`;
}
