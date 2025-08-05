// components/CoinTable.jsx
import CoinRow from './CoinRow';

export default function CoinTable({ coins, degenMode }) {
  return (
    <div className="w-full rounded-2xl bg-card shadow-soft overflow-x-auto mt-6">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="text-xs font-bold text-marketData bg-[#232531]">
            <th className="py-2 px-3">#</th>
            <th className="py-2 px-3">Coin</th>
            <th className="py-2 px-3">Price</th>
            <th className="py-2 px-3">1H %</th>
            <th className="py-2 px-3">24H %</th>
            <th className="py-2 px-3">Market Cap</th>
            <th className="py-2 px-3">Volume(24H)</th>
            <th className="py-2 px-3">7D</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, idx) => (
            <CoinRow key={coin.id} coin={coin} idx={idx} degenMode={degenMode} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
