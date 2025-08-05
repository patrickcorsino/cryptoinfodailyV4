"use client";
import { useState } from "react";

export default function Converter() {
  const [usd, setUsd] = useState("");
  const [btc, setBtc] = useState("");
  const [rate, setRate] = useState(60000); // Default, should be fetched for live BTC/USD

  const usdToBtc = (val) => {
    setUsd(val);
    setBtc(val && rate ? (val / rate).toFixed(6) : "");
  };

  const btcToUsd = (val) => {
    setBtc(val);
    setUsd(val && rate ? (val * rate).toFixed(2) : "");
  };

  // You can improve this to fetch live rates if desired.
  return (
    <div>
      <div className="font-bold mb-4 text-lg">BTC/USD Converter</div>
      <div className="space-y-2">
        <input
          className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="USD" type="number" value={usd}
          onChange={e => usdToBtc(e.target.value)} min="0"
        />
        <input
          className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="BTC" type="number" value={btc}
          onChange={e => btcToUsd(e.target.value)} min="0"
        />
      </div>
    </div>
  );
}
