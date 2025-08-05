"use client";
import CoinRow from "./CoinRow";
import { useEffect, useState } from "react";

export default function CoinTable({ coins, highlightMap = {} }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!coins?.length) return null;

  return (
    <div className="bg-card p-4 mt-8 rounded-2xl shadow-cardGlow overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="text-marketData text-xs uppercase border-b border-softBorder">
            <th className="py-2 px-2 font-bold text-left">#</th>
            <th className="py-2 px-2 font-bold text-left">Coin</th>
            <th className="py-2 px-2 font-bold text-left">Price</th>
            <th className="py-2 px-2 font-bold text-left">1h %</th>
            <th className="py-2 px-2 font-bold text-left">24h %</th>
            <th className="py-2 px-2 font-bold text-left">Market Cap</th>
            <th className="py-2 px-2 font-bold text-left">Volume(24h)</th>
            <th className="py-2 px-2 font-bold text-left">7d</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CoinRow
              key={coin.id}
              coin={coin}
              highlight={highlightMap[coin.id]}
              isMobile={isMobile}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
