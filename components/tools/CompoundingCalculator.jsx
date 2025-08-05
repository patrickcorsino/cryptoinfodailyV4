"use client";
import { useState } from "react";

export default function CompoundingCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [times, setTimes] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calc = (e) => {
    e.preventDefault();
    const r = Number(rate) / 100;
    const n = Number(times);
    const t = Number(years);
    const A = Number(principal) * Math.pow((1 + r / n), n * t);
    setResult(A > 0 ? A.toFixed(2) : "-");
  };

  return (
    <div>
      <div className="font-bold mb-4 text-lg">Compounding Calculator</div>
      <form className="space-y-2" onSubmit={calc}>
        <input className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Principal ($)" type="number" value={principal}
          onChange={e => setPrincipal(e.target.value)} min="0"
        />
        <input className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Rate (%)" type="number" value={rate}
          onChange={e => setRate(e.target.value)} min="0"
        />
        <input className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Compounds/Year" type="number" value={times}
          onChange={e => setTimes(e.target.value)} min="1"
        />
        <input className="w-full rounded bg-card px-3 py-2 border border-softBorder text-white"
          placeholder="Years" type="number" value={years}
          onChange={e => setYears(e.target.value)} min="1"
        />
        <button className="bg-degen text-black rounded px-4 py-2 mt-2 font-semibold w-full" type="submit">
          Calculate
        </button>
      </form>
      {result !== null && (
        <div className="mt-4 font-mono text-xl">
          Result: <span className="text-degen">{result}</span>
        </div>
      )}
    </div>
  );
}
