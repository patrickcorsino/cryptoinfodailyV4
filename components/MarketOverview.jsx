export default function MarketOverview({ stats }) {
  const { total_market_cap, total_volume_24h, market_cap_percentage, btc_dominance } = stats || {};

  function format(num) {
    if (!num) return "-";
    if (num < 1e3) return num.toLocaleString();
    if (num < 1e6) return (num / 1e3).toFixed(1) + "k";
    if (num < 1e9) return (num / 1e6).toFixed(1) + "m";
    if (num < 1e12) return (num / 1e9).toFixed(1) + "b";
    return (num / 1e12).toFixed(1) + "t";
  }

  return (
    <div className="bg-card rounded-xl p-4 shadow-soft flex flex-col gap-2">
      <div className="font-bold text-lg mb-3">Market Stats</div>
      <div className="flex flex-wrap gap-x-8 gap-y-2 items-center">
        <div>
          <span className="text-sm text-white">Mkt Cap: </span>
          <span className="text-marketData font-mono">${format(total_market_cap)}</span>
        </div>
        <div>
          <span className="text-sm text-white">24h Vol: </span>
          <span className="text-marketData font-mono">${format(total_volume_24h)}</span>
        </div>
        <div>
          <span className="text-sm text-white">BTC Dom: </span>
          <span className="text-marketData font-mono">{btc_dominance?.toFixed(1) || "-"}%</span>
        </div>
        <div>
          <span className="text-sm text-white">ETH Dom: </span>
          <span className="text-marketData font-mono">{market_cap_percentage?.eth?.toFixed(1) || "-"}%</span>
        </div>
      </div>
    </div>
  );
}
