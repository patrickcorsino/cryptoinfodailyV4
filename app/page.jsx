"use client";
import { useEffect, useState } from "react";
import { getMarketData, getTrending, getFearGreed, getGlobalStats } from "../lib/api";
import CoinTable from "../components/CoinTable";
import TrendingCoins from "../components/TrendingCoins";
import FearGreedWidget from "../components/FearGreedWidget";
import MarketOverview from "../components/MarketOverview";
import DegenToggle from "../components/DegenToggle";
import Header from "../components/Header";
import SearchModal from "../components/SearchModal";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [trending, setTrending] = useState([]);
  const [fg, setFg] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [degenMode, setDegenMode] = useState(false);

  // For 30s data refresh, API limits
  const fetchData = async () => {
    setLoading(true);
    try {
      const [coinsData, trendingData, fgData, statsData] = await Promise.all([
        getMarketData(),
        getTrending(),
        getFearGreed(),
        getGlobalStats(),
      ]);
      setCoins(Array.isArray(coinsData) ? coinsData : []);
      setTrending(Array.isArray(trendingData) ? trendingData : []);
      setFg(fgData || null);
      setStats(statsData || null);
    } catch (e) {
      setCoins([]); setTrending([]); setFg(null); setStats(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-2 md:px-6 pt-4 pb-8">
      <Header
        onSearchClick={() => setShowSearch(true)}
        degenMode={degenMode}
        setDegenMode={setDegenMode}
      />
      <SearchModal show={showSearch} onClose={() => setShowSearch(false)} />
      <div className="grid md:grid-cols-3 gap-6 mb-7 mt-2">
        <TrendingCoins coins={trending} />
        <FearGreedWidget data={fg} />
        <MarketOverview stats={stats} />
      </div>
      {loading ? (
        <p className="text-center text-sm text-gray-400">Loading data...</p>
      ) : Array.isArray(coins) && coins.length > 0 ? (
        <CoinTable coins={coins} degenMode={degenMode} />
      ) : (
        <p className="text-center text-sm text-red-500">No coin data available. Try refreshing in a few seconds.</p>
      )}
    </main>
  );
}
