export default function TrendingCoins({ coins }) {
  return (
    <div className="bg-card rounded-2xl shadow-soft p-5 min-h-[140px] flex flex-col">
      <div className="mb-3 flex items-center">
        <span className="text-marketData text-xs font-semibold">Trending</span>
      </div>
      <ul>
        {coins?.slice(0, 5).map((coin) => (
          <li key={coin.id} className="flex items-center gap-2 mb-2">
            <img src={coin?.large || coin?.image} alt="" className="w-5 h-5" />
            <span className="font-semibold text-xs">{coin.name}</span>
            <span className="text-marketData text-xs">{coin.symbol?.toUpperCase()}</span>
            <span className="text-xs ml-auto text-white/80">
              {coin.price_btc ? coin.price_btc.toFixed(7) + " BTC" : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
