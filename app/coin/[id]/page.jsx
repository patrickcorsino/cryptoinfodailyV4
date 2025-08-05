"use client";
import { useEffect, useState } from "react";
import { getCoinDetail } from "../../../lib/api";
import { useParams } from "next/navigation";

export default function CoinDetailPage() {
  const params = useParams();
  const coinId = params.id;
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      const data = await getCoinDetail(coinId);
      setCoin(data);
    }
    fetchDetail();
  }, [coinId]);

  if (!coin) {
    return <div className="text-center text-lg text-gray-400 pt-10">Loading...</div>;
  }

  const mcap = coin?.market_data?.market_cap?.usd || 0;
  const price = coin?.market_data?.current_price?.usd || 0;
  const circ = coin?.market_data?.circulating_supply || 0;
  const supply = coin?.market_data?.total_supply || 0;
  const ath = coin?.market_data?.ath?.usd || 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-card rounded-2xl shadow-soft mt-6">
      <div className="flex items-center mb-5">
        <img src={coin.image?.large} className="w-12 h-12 mr-3" alt="" />
        <div>
          <div className="text-2xl font-extrabold">{coin.name} <span className="text-marketData">{coin.symbol.toUpperCase()}</span></div>
          <div className="text-lg">${price.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 text-lg mb-6">
        <div>
          <div className="text-marketData text-xs">Market Cap</div>
          <div>${mcap.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-marketData text-xs">ATH</div>
          <div>${ath.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-marketData text-xs">Circulating</div>
          <div>{circ.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-marketData text-xs">Total Supply</div>
          <div>{supply ? supply.toLocaleString() : "∞"}</div>
        </div>
      </div>
      <div className="mb-5">
        <div className="font-semibold mb-2">About {coin.name}:</div>
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: coin.description?.en || "No description." }} />
      </div>
      <a href={coin.links?.homepage?.[0] || "#"} target="_blank" rel="noopener noreferrer" className="text-degen underline text-lg">
        Visit Official Website →
      </a>
    </div>
  );
}
