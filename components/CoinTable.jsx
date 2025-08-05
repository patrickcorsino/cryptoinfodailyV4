"use client";
import CoinRow from "./CoinRow";
import { useMediaQuery } from "../lib/useMediaQuery";

// Helper to abbreviate big numbers (1.2m, 3.4b)
function abbreviateNumber(num) {
  if (!num && num !== 0) return "-";
  if (num < 1000) return num;
  const units = ["K", "M", "B", "T"];
  let u = -1;
  let n = num;
  while (n >= 1000 && u < units.length - 1) {
    n /= 1000;
    u++;
  }
  return `${parseFloat(n.toFixed(2))}${units[u]}`;
}

export default function CoinTable({ coins, degenMode }) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="bg-card rounded-2xl shadow-soft mt-7">
      <div className="grid grid-cols-7 gap-2 py-3 px-2 border-b border-softBorder font-bold text-marketData text-xs md:text-base">
        <div>#</div>
        <div>Coin</div>
        <div>Price</div>
        <div>1h %</div>
        <div>24h %</div>
        <div>Market Cap</div>
        <div>7d</div>
      </div>
      <div>
        {coins?.map((coin, i) => (
          <CoinRow
            key={coin.id}
            coin={coin}
            index={i + 1}
            degenMode={degenMode}
            isMobile={isMobile}
            abbreviateNumber={isMobile ? abbreviateNumber : null}
          />
        ))}
      </div>
    </div>
  );
}
