"use client";
import { useState } from "react";
import { searchCoins } from "../lib/api";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  const handleChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length >= 2) {
      const res = await searchCoins(val);
      setResults(res);
      setShow(true);
    } else {
      setResults([]);
      setShow(false);
    }
  };

  return (
    <div className="relative">
      <input
        className="px-3 py-1 rounded-lg bg-card text-white outline-none border border-softBorder placeholder:text-gray-400 w-36"
        type="text"
        value={query}
        placeholder="Search..."
        onChange={handleChange}
        onFocus={() => query.length >= 2 && setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 150)}
      />
      {show && results.length > 0 && (
        <div className="absolute left-0 w-full mt-1 bg-card rounded-lg shadow-soft border border-softBorder z-50 max-h-60 overflow-y-auto">
          {results.map((coin) => (
            <Link key={coin.id} href={`/coin/${coin.id}`} onClick={() => setShow(false)}>
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-cardHover cursor-pointer">
                <img src={coin.thumb} alt={coin.name} className="w-5 h-5" />
                <span>{coin.name} <span className="text-xs text-gray-400">({coin.symbol.toUpperCase()})</span></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
