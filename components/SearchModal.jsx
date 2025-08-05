"use client";
import { useEffect, useRef, useState } from "react";
import { searchCoins } from "../lib/api";
import Link from "next/link";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length < 2) return setResults([]);
    let active = true;
    searchCoins(query).then((r) => { if (active) setResults(r.slice(0, 10)); });
    return () => { active = false; };
  }, [query]);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className="fixed z-40 inset-0 bg-black/80 flex items-start justify-center p-6">
      <div className="bg-card rounded-2xl shadow-cardGlow p-6 w-full max-w-md relative">
        <button className="absolute right-4 top-4 text-white text-xl" onClick={onClose}>&times;</button>
        <input
          ref={inputRef}
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-darkBg text-white focus:outline-none focus:ring-2 focus:ring-degen"
          placeholder="Search for a coin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {results.length > 0 && (
          <ul className="mt-4 space-y-2">
            {results.map((coin) => (
              <li key={coin.id}>
                <Link
                  href={`/coin/${coin.id}`}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-cardHover"
                  onClick={onClose}
                >
                  <img src={coin.thumb} alt={coin.name} className="w-6 h-6" />
                  <span className="font-semibold">{coin.symbol.toUpperCase()}</span>
                  <span className="text-gray-400">{coin.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {query.length > 1 && results.length === 0 && (
          <div className="mt-4 text-gray-400 text-sm">No results found.</div>
        )}
      </div>
    </div>
  );
}
