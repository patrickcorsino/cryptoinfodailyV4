"use client";
import { useEffect, useState } from "react";
import { getMarketData, getTrending, getFearGreed, getGlobalStats } from "../lib/api";
import CoinTable from "../components/CoinTable";
import TrendingCoins from "../components/TrendingCoins";
import FearGreedWidget from "../components/FearGreedWidget";
import MarketOverview from "../components/MarketOverview";
import DegenToggle from "../components/DegenToggle";
import SearchBar from "../components/SearchBar";
import Link from "next/link";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [trending, setTrending] = useState([]);
  const [fg, setFg] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [degen, setDegen] = useState(false);

  // For Degen Mode: find coins +10% / -10% in 24h
  const highlightMap = {};
  if (degen && coins.length) {
    coins.forEach((coin) => {
      if (coin.price_change_percentage_24h >= 10) highlightMap[coin.id] = "up";
      else if (coin.price_change_percentage_24h <= -10) highlightMap[coin.id] = "down";
    });
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coinsData, trendingData, fgData, statsData] = await Promise.all([
        getMarketData(),
        getTrending(),
        getFearGreed(),
        getGlobalStats()
      ]);
      setCoins(Array.isArray(coinsData) ? coinsData : []);
      setTrending(Array.isArray(trendingData) ? trendingData : []);
      setFg(fgData || null);
      setStats(statsData || null);
    } catch (e) {
      setCoins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-2 md:p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-4">
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-white to-degen bg-clip-text text-transparent tracking-tight drop-shadow-md">CryptoInfoDaily</Link>
        <div className="flex flex-row gap-4 items-center mt-4 md:mt-0">
          <SearchBar />
          <DegenToggle enabled={degen} setEnabled={setDegen} />
          <Link href="/tools" className="ml-2 px-4 py-2 rounded-xl bg-card shadow-soft hover:shadow-cardGlow font-semibold text-white text-sm border border-softBorder transition">Tools</Link>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {trending.length > 0 && <TrendingCoins coins={trending} />}
        {fg && <FearGreedWidget data={fg} />}
        {stats && <MarketOverview stats={stats} />}
      </div>

      {loading ? (
        <p className="text-center text-sm text-gray-400">Loading data...</p>
      ) : coins.length > 0 ? (
        <CoinTable coins={coins} highlightMap={highlightMap} />
      ) : (
        <p className="text-center text-sm text-red-500">No coin data available. Try refreshing in a few seconds.</p>
      )}
    </main>
        <div>
      {/* ... header, trending, stats, etc. */}
      <DegenToggle enabled={degenMode} setEnabled={setDegenMode} />
      <CoinTable coins={coins} degenMode={degenMode} />
    </div>
  );
}
