import { NextResponse } from "next/server";

const TOKEN = "ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${TOKEN}`,
      { next: { revalidate: 30 }, headers: { Accept: "application/json" } },
    );
    if (!res.ok) throw new Error("upstream");

    const json = await res.json();
    const pairs: {
      pairAddress: string;
      priceUsd?: string;
      priceChange?: { h1?: number; h24?: number };
      volume?: { h1?: number; h24?: number };
      liquidity?: { usd?: number };
      marketCap?: number;
      fdv?: number;
      txns?: { h24?: { buys?: number; sells?: number } };
    }[] = json.pairs ?? [];

    if (!pairs.length) {
      return NextResponse.json({ error: "no pairs" }, { status: 404 });
    }

    const pair = [...pairs].sort(
      (a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0),
    )[0];

    return NextResponse.json({
      price: pair.priceUsd ? Number(pair.priceUsd) : null,
      priceChange1h: pair.priceChange?.h1 ?? 0,
      priceChange24h: pair.priceChange?.h24 ?? 0,
      volume1h: pair.volume?.h1 ?? 0,
      volume24h: pair.volume?.h24 ?? 0,
      liquidity: pair.liquidity?.usd ?? 0,
      marketCap: pair.marketCap ?? pair.fdv ?? 0,
      fdv: pair.fdv ?? 0,
      buys24h: pair.txns?.h24?.buys ?? 0,
      sells24h: pair.txns?.h24?.sells ?? 0,
      pairAddress: pair.pairAddress ?? null,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
