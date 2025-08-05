"use client";
import Link from "next/link";
import SparklineChart from "./SparklineChart";
import { useEffect, useState } from "react";
import { abbreviateNumber } from "../lib/utils";

export default function CoinRow({ coin, highlight, isMobile }) {
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
    <Link href={`/coin/${coin.id}`}>
      <tr
        className={`cursor-pointer hover:bg-cardHover rounded-lg ${
          highlight === "up" ? "bg-green-900/20" : ""
        } ${highlight === "down" ? "bg-red-900/20" : ""}`}
        style={{
          boxShadow: highlight
            ? "0 0 10px " +
              (highlight === "up" ? "#00ff99" : "#ff3366")
            : undefined,
        }}
      >
        <td className="py-3 px-2 font-bold text-sm text-gray-300">{coin.market_cap_rank}</td>
        <td className="py-3 px-2">
          <img src={coin.image || ""} alt="logo" className="w-6 h-6 inline-block mr-2" />
          <span className="font-semibold text-sm">{coin.symbol?.toUpperCase()}</span>
        </td>
        <td className={`py-3 px-2 text-sm transition-glow duration-300 ${priceGlow}`}>
          ${isMobile ? abbreviateNumber(coin.current_price) : coin.current_price?.toLocaleString()}
        </td>
        <td className={`py-3 px-2 text-sm ${coin.price_change_percentage_1h_in_currency > 0 ? "text-green-400" : "text-red-400"}`}>
          {coin.price_change_percentage_1h_in_currency?.toFixed(2) || "0.00"}%
        </td>
        <td className={`py-3 px-2 text-sm ${coin.price_change_percentage_24h_in_currency > 0 ? "text-green-400" : "text-red-400"}`}>
          {coin.price_change_percentage_24h_in_currency?.toFixed(2) || "0.00"}%
        </td>
        <td className="py-3 px-2 text-sm">
          ${isMobile ? abbreviateNumber(coin.market_cap) : coin.market_cap?.toLocaleString()}
        </td>
        <td className="py-3 px-2 text-sm">
          ${isMobile ? abbreviateNumber(coin.total_volume) : coin.total_volume?.toLocaleString()}
        </td>
        <td className="py-3 px-2">
          <div className="h-6 min-w-[48px] flex items-center">
            <SparklineChart
              data={coin.sparkline_in_7d?.price?.slice(-30) || []}
              color={coin.price_change_percentage_7d_in_currency > 0 ? "green" : "red"}
            />
          </div>
        </td>
      </tr>
    </Link>
  );
}
