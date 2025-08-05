"use client";
import { useState } from "react";

export default function PositionSizeCalculator() {
  const [balance, setBalance] = useState("");
  const [risk, setRisk] = useState("");
  const [stop, setStop] = useState("");
  const [result, setResult] = useState(null);

  const calc = (e) => {
    e.preventDefault();
    const size = ((Number(balance) * Number(risk) / 100) / (Number(stop) / 100));
    setResult(size > 0 ? size.toFixed(2) : "-");
  };

  return (
    <div>
      <div className="font-bold mb-4 text-lg">Position Size Calculator</div>
      <form className="space-y-2" onSubmit={calc}>
        <input
          className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Account Balance ($)"
          type="number"
          value={balance}
          onChange={e => setBalance(e.target.value)}
          min="0"
        />
        <input
          className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Risk per Trade (%)"
          type="number"
          value={risk}
          onChange={e => setRisk(e.target.value)}
          min="0"
        />
        <input
          className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Stop Loss (%)"
          type="number"
          value={stop}
          onChange={e => setStop(e.target.value)}
          min="0"
        />
        <button className="bg-degen text-black rounded px-4 py-2 mt-2 font-semibold w-full" type="submit">
          Calculate
        </button>
      </form>
      {result !== null && (
        <div className="mt-4 font-mono text-xl">
          Position Size: <span className="text-degen">{result}</span>
        </div>
      )}
    </div>
  );
}
