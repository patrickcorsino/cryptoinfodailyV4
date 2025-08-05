"use client";
import CoinRow from "./CoinRow";
import { useState, useEffect } from "react";

function abbreviateNumber(num) {
  if (num === undefined) return "-";
  if (num < 1000) return num.toLocaleString();
  if (num < 1e6) return (num / 1e3).toFixed(1) + "k";
  if (num < 1e9) return (num / 1e6).toFixed(1) + "m";
  if (num < 1e12) return (num / 1e9).toFixed(1) + "b";
  return (num / 1e12).toFixed(1) + "t";
}

export default function CoinTable({ coins }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="bg-card rounded-2xl shadow-soft mt-8 overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 px-4 py-2 font-semibold text-xs uppercase text-marketData">
        <div className="flex items-center">Coin</div>
        <div>Price</div>
        <div>1h %</div>
        <div>24h %</div>
        <div>Market Cap</div>
        <div>Volume</div>
        <div>7d</div>
      </div>
      <div>
        {coins.map((coin) => (
          <CoinRow
            key={coin.id}
            coin={{
              ...coin,
              market_cap: isMobile ? abbreviateNumber(coin.market_cap) : coin.market_cap,
              total_volume: isMobile ? abbreviateNumber(coin.total_volume) : coin.total_volume
            }}
          />
        ))}
      </div>
    </div>
  );
}
