"use client";
import Link from "next/link";
import SparklineChart from "./SparklineChart";
import { useEffect, useState } from "react";

export default function CoinRow({ coin }) {
  const [priceGlow, setPriceGlow] = useState("");
  const [prevPrice, setPrevPrice] = useState(coin?.current_price || 0);

  useEffect(() => {
    if (!coin?.current_price) return;
    if (coin.current_price > prevPrice) {
      setPriceGlow("glow-green");
    } else if (coin.current_price < prevPrice) {
      setPriceGlow("glow-red");
    }
    setPrevPrice(coin.current_price);

    const timeout = setTimeout(() => setPriceGlow(""), 1000);
    return () => clearTimeout(timeout);
  }, [coin?.current_price]);

  if (!coin?.id) return null;

  return (
    <Link href={`/coin/${coin?.id}`}>
      <div className="grid grid-cols-7 gap-2 items-center py-3 px-2 rounded-lg cursor-pointer transition duration-150 shadow-soft hover-highlight">
        <div className="flex items-center space-x-2">
          <img src={coin?.image || ""} alt="logo" className="w-6 h-6" />
          <span className="font-semibold text-sm">{coin?.name || "-"}</span>
        </div>
        <p className={`text-sm transition-glow duration-300 ${priceGlow}`}>${coin?.current_price?.toLocaleString() || "-"}</p>
        <p className={`text-sm ${coin?.price_change_percentage_1h_in_currency > 0 ? "text-green-400" : "text-red-400"}`}>{coin?.price_change_percentage_1h_in_currency?.toFixed(2) || "0.00"}%</p>
        <p className={`text-sm ${coin?.price_change_percentage_24h_in_currency > 0 ? "text-green-400" : "text-red-400"}`}>{coin?.price_change_percentage_24h_in_currency?.toFixed(2) || "0.00"}%</p>
        <p className="text-sm">${coin?.market_cap?.toLocaleString() || "-"}</p>
        <p className="text-sm">${coin?.total_volume?.toLocaleString() || "-"}</p>
        <div className="h-6">
          <SparklineChart data={coin?.sparkline_in_7d?.price?.slice(-30) || []} color={coin?.price_change_percentage_7d_in_currency > 0 ? "green" : "red"} />
        </div>
      </div>
    </Link>
  );
}
