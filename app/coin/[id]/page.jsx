"use client";
import { useEffect, useState } from "react";
import { getCoinDetail } from "../../../lib/api";
import Link from "next/link";
import SparklineChart from "../../../components/SparklineChart";

export default function CoinDetailPage({ params }) {
  const { id } = params;
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCoinDetail(id).then((c) => {
      setCoin(c);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return <div className="p-8 text-center text-gray-400">Loading...</div>;

  if (!coin)
    return (
      <div className="p-8 text-center text-red-400">
        Could not load coin data. <Link href="/">Go Home</Link>
      </div>
    );

  const market = coin.market_data || {};
  const sparkData = coin.market_data?.sparkline_7d?.price || [];

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <img src={coin.image?.large || ""} alt={coin.name} className="w-16 h-16 rounded-full" />
        <div>
          <h1 className="text-3xl font-bold">{coin.name} <span className="text-lg text-gray-400">{coin.symbol?.toUpperCase()}</span></h1>
          <p className="text-gray-400">{coin.categories?.[0]}</p>
        </div>
      </div>
      <div className="mb-8 bg-card rounded-2xl p-6 shadow-cardGlow grid grid-cols-2 gap-4">
        <div>
          <div className="text-lg font-bold">${market.current_price?.usd?.toLocaleString() || "-"}</div>
          <div className="text-sm text-gray-400">Current Price</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${market.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
            {market.price_change_percentage_24h?.toFixed(2) || "0.00"}%
          </div>
          <div className="text-sm text-gray-400">24h Change</div>
        </div>
        <div>
          <div className="text-lg font-bold">${market.market_cap?.toLocaleString() || "-"}</div>
          <div className="text-sm text-gray-400">Market Cap</div>
        </div>
        <div>
          <div className="text-lg font-bold">${market.total_volume?.toLocaleString() || "-"}</div>
          <div className="text-sm text-gray-400">24h Volume</div>
        </div>
        <div>
          <div className="text-lg font-bold">{market.circulating_supply?.toLocaleString() || "-"}</div>
          <div className="text-sm text-gray-400">Circulating Supply</div>
        </div>
        <div>
          <div className="text-lg font-bold">{market.max_supply?.toLocaleString() || "-"}</div>
          <div className="text-sm text-gray-400">Max Supply</div>
        </div>
      </div>
      <div className="bg-card rounded-2xl p-6 shadow-cardGlow">
        <h2 className="text-xl font-bold mb-2">7d Price Chart</h2>
        <div className="w-full h-32">
          <SparklineChart data={sparkData.slice(-50)} color={market.price_change_percentage_7d_in_currency?.usd > 0 ? "green" : "red"} />
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="px-6 py-2 rounded-lg bg-card text-white shadow-soft hover:shadow-cardGlow font-semibold border border-softBorder transition">Back to Home</Link>
      </div>
    </main>
  );
}
