import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KIYOMASA MEME ($KIYOMASA) — Japan's Gorilla Meme is Here",
  description:
    "Kiyomasa is a community-powered meme project inspired by Japan's famous gorilla mascot. Built on Solana. Community-driven. $KIYOMASA.",
  keywords: ["KIYOMASA", "meme coin", "Solana", "gorilla", "Japan", "crypto", "$KIYOMASA"],
  openGraph: {
    title: "KIYOMASA MEME ($KIYOMASA)",
    description: "Japan's Gorilla Meme is Here. Community-driven. Built on Solana.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KIYOMASA MEME ($KIYOMASA)",
    description: "Japan's Gorilla Meme is Here 🦍🇯🇵",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="bg-[#050505] text-white min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
