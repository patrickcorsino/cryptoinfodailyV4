export default function MarketOverview({ stats }) {
  if (!stats) return null;
  // Show in abbreviated format for mobile
  function abbr(n) {
    if (!n && n !== 0) return "-";
    if (n < 1e3) return n;
    if (n < 1e6) return (n / 1e3).toFixed(1) + "K";
    if (n < 1e9) return (n / 1e6).toFixed(1) + "M";
    if (n < 1e12) return (n / 1e9).toFixed(1) + "B";
    return (n / 1e12).toFixed(1) + "T";
  }

  return (
    <div className="bg-card rounded-2xl shadow-soft p-5 min-h-[140px]">
      <div className="mb-3 flex items-center">
        <span className="text-marketData text-xs font-semibold">Market Stats</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <div>
          <div className="text-xs text-white/60">Market Cap</div>
          <div className="text-marketData font-bold text-base">${abbr(stats?.total_market_cap_usd)}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">24h Volume</div>
          <div className="text-marketData font-bold text-base">${abbr(stats?.total_volume_usd)}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">BTC Dominance</div>
          <div className="text-marketData font-bold text-base">{stats?.btc_dominance?.toFixed(1) || "-"}%</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Active Coins</div>
          <div className="text-marketData font-bold text-base">{abbr(stats?.active_cryptocurrencies)}</div>
        </div>
      </div>
    </div>
  );
}
