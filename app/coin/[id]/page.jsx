"use client";
import { useEffect, useState } from 'react';
import { getCoinDetail } from '../../../lib/api';
import SparklineChart from '../../../components/SparklineChart';

export default function CoinDetail({ params }) {
  const { id } = params;
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const data = await getCoinDetail(id);
        setCoin(data);
      } catch (e) {
        setError('Could not load coin data. Try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchCoin();
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!coin) return <div className="text-center py-12">No data found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-card rounded-2xl shadow-soft">
      <div className="flex items-center space-x-4 mb-6">
        <img src={coin.image?.large} alt={coin.name} className="w-14 h-14 rounded-full" />
        <div>
          <h1 className="text-2xl font-extrabold">{coin.name} ({coin.symbol?.toUpperCase()})</h1>
          <div className="text-lg font-bold text-degen mt-1">${coin.market_data?.current_price?.usd?.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="mb-2 text-sm text-gray-400">Market Cap</div>
          <div className="font-mono">${coin.market_data?.market_cap?.usd?.toLocaleString()}</div>
        </div>
        <div>
          <div className="mb-2 text-sm text-gray-400">24h Volume</div>
          <div className="font-mono">${coin.market_data?.total_volume?.usd?.toLocaleString()}</div>
        </div>
        <div>
          <div className="mb-2 text-sm text-gray-400">Circulating Supply</div>
          <div className="font-mono">{coin.market_data?.circulating_supply?.toLocaleString()}</div>
        </div>
        <div>
          <div className="mb-2 text-sm text-gray-400">All-Time High</div>
          <div className="font-mono">${coin.market_data?.ath?.usd?.toLocaleString()} ({new Date(coin.market_data?.ath_date?.usd).toLocaleDateString()})</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-2 font-semibold">7d Price Chart</div>
        <div className="bg-darkBg p-4 rounded-xl">
          <SparklineChart data={coin.market_data?.sparkline_7d?.price || []} color={coin.market_data?.price_change_percentage_7d_in_currency?.usd > 0 ? 'green' : 'red'} />
        </div>
      </div>
      <div className="mt-8 te
