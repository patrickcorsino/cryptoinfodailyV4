"use client";
import { useState } from "react";

export default function ProfitCalculator() {
  const [buy, setBuy] = useState("");
  const [sell, setSell] = useState("");
  const [amount, setAmount] = useState("");
  const [profit, setProfit] = useState(null);

  function calc() {
    if (buy && sell && amount) {
      setProfit(((parseFloat(sell) - parseFloat(buy)) * parseFloat(amount)).toFixed(2));
    }
  }

  return (
    <div className="max-w-sm">
      <div className="mb-2">Profit/Loss Calculator</div>
      <input className="w-full mb-2 p-2 rounded bg-darkBg border border-softBorder text-white" placeholder="Buy Price" value={buy} onChange={e => setBuy(e.target.value.replace(/[^0-9.]/g, ""))} type="number" />
      <input className="w-full mb-2 p-2 rounded bg-darkBg border border-softBorder text-white" placeholder="Sell Price" value={sell} onChange={e => setSell(e.target.value.replace(/[^0-9.]/g, ""))} type="number" />
      <input className="w-full mb-2 p-2 rounded bg-darkBg border border-softBorder text-white" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} type="number" />
      <button className="bg-degen px-4 py-2 rounded font-bold text-darkBg" onClick={calc}>Calculate</button>
      {profit !== null && <div className="mt-3 text-lg text-marketData">Profit/Loss: <b>${profit}</b></div>}
    </div>
  );
}
