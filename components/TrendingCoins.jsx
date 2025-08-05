export default function TrendingCoins({ coins }) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-soft">
      <div className="font-bold text-lg mb-3">Trending</div>
      <ul>
        {coins.slice(0, 5).map((coin, idx) => (
          <li key={coin.item?.id || idx} className="flex items-center gap-2 mb-2 last:mb-0">
            <img src={coin.item?.small || coin.image || ""} alt={coin.item?.name} className="w-5 h-5" />
            <span className="font-semibold">{coin.item?.name || coin.name}</span>
            <span className="ml-auto text-xs text-marketData">{coin.item?.symbol?.toUpperCase() || coin.symbol}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
