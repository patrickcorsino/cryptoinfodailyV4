"use client";
import { useEffect, useState } from "react";
import { searchCoins } from "../lib/api";
import Link from "next/link";

export default function SearchModal({ show, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (show && query.length > 0) {
      const delay = setTimeout(async () => {
        const coins = await searchCoins(query);
        setResults(coins);
      }, 400);
      return () => clearTimeout(delay);
    }
    setResults([]);
  }, [query, show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-xl relative">
        <button className="absolute top-2 right-3 text-xl text-white/60 hover:text-white" onClick={onClose}>×</button>
        <input
          autoFocus
          className="w-full px-4 py-2 rounded bg-darkBg text-white border border-softBorder mb-3"
          placeholder="Search a crypto (name or ticker)..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div>
          {results.length > 0 ? (
            <ul>
              {results.map((coin) => (
                <li key={coin.id} className="py-1">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex items-center gap-2 hover:bg-cardHover px-2 py-1 rounded transition"
                    onClick={onClose}
                  >
                    <img src={coin.large} alt="" className="w-6 h-6" />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-marketData text-xs">{coin.symbol.toUpperCase()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.length > 0 ? (
            <div className="text-marketData text-sm mt-3">No coins found</div>
          ) : (
            <div className="text-marketData text-sm mt-3">Type to search...</div>
          )}
        </div>
      </div>
    </div>
  );
}
