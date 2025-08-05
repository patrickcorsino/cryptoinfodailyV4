"use client";
import { useState } from "react";

export default function CoinConverter() {
  const [usd, setUsd] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="max-w-sm">
      <div className="mb-2">How many coins do you get for $?</div>
      <input
        className="w-full mb-2 p-2 rounded bg-darkBg border border-softBorder text-white"
        placeholder="USD"
        value={usd}
        onChange={e => setUsd(e.target.value.replace(/[^0-9.]/g, ""))}
        type="number"
      />
      <input
        className="w-full mb-2 p-2 rounded bg-darkBg border border-softBorder text-white"
        placeholder="Coin price (USD)"
        value={price}
        onChange={e => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
        type="number"
      />
      <button
        className="bg-degen px-4 py-2 rounded font-bold text-darkBg"
        onClick={() => {
          if (usd && price) setAmount((parseFloat(usd) / parseFloat(price)).toFixed(6));
        }}
      >
        Convert
      </button>
      {amount && (
        <div className="mt-3 text-lg text-marketData">You get: <b>{amount}</b> coins</div>
      )}
    </div>
  );
}
