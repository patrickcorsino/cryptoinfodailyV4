export default function MarketOverview({ stats }) {
  if (!stats) return null;
  const fmt = (num) => {
    if (num == null) return "-";
    if (Math.abs(num) >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toLocaleString();
  };
  return (
    <div className="bg-card rounded-2xl p-4 mb-6 shadow-cardGlow">
      <h2 className="text-lg font-bold mb-3">Market Stats</h2>
      <div className="flex flex-wrap gap-4">
        <div>
          <span className="text-xs text-white">Mkt Cap</span>
          <div className="font-bold text-marketData text-lg">${fmt(stats.total_market_cap?.usd)}</div>
        </div>
        <div>
          <span className="text-xs text-white">24h Volume</span>
          <div className="font-bold text-marketData text-lg">${fmt(stats.total_volume?.usd)}</div>
        </div>
        <div>
          <span className="text-xs text-white">BTC Dominance</span>
          <div className="font-bold text-marketData text-lg">{stats.market_cap_percentage?.btc?.toFixed(1) || "-"}%</div>
        </div>
        <div>
          <span className="text-xs text-white">Active Coins</span>
          <div className="font-bold text-marketData text-lg">{fmt(stats.active_cryptocurrencies)}</div>
        </div>
      </div>
    </div>
  );
}
