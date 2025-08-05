"use client";
import { useState } from "react";

export default function ProfitLossCalculator() {
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [qty, setQty] = useState("");
  const [result, setResult] = useState(null);

  const calc = (e) => {
    e.preventDefault();
    const profit = (Number(exit) - Number(entry)) * Number(qty);
    setResult(!isNaN(profit) ? profit.toFixed(2) : "-");
  };

  return (
    <div>
      <div className="font-bold mb-4 text-lg">Profit / Loss Calculator</div>
      <form className="space-y-2" onSubmit={calc}>
        <input className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Entry Price" type="number" value={entry}
          onChange={e => setEntry(e.target.value)} min="0"
        />
        <input className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Exit Price" type="number" value={exit}
          onChange={e => setExit(e.target.value)} min="0"
        />
        <input className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Quantity" type="number" value={qty}
          onChange={e => setQty(e.target.value)} min="0"
        />
        <button className="bg-degen text-black rounded px-4 py-2 mt-2 font-semibold w-full" type="submit">
          Calculate
        </button>
      </form>
      {result !== null && (
        <div className="mt-4 font-mono text-xl">
          P/L: <span className={result >= 0 ? "text-green-400" : "text-red-400"}>{result}</span>
        </div>
      )}
    </div>
  );
}
