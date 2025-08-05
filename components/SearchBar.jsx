"use client";
import { useState } from "react";

export default function SearchBar({ coins }) {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const results = coins?.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <button onClick={() => setShow((s) => !s)} className="text-marketData hover:text-degen">
        <svg width="22" height="22" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="8" /><path d="M20 20l-4-4" /></svg>
      </button>
      {show && (
        <div className="absolute right-0 top-10 bg-card rounded-lg p-4 shadow-soft w-72 z-30">
          <input
            autoFocus
            className="w-full bg-darkBg border border-softBorder rounded-md p-2 mb-2 text-white"
            placeholder="Search coins..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul>
            {results?.slice(0, 8).map((c) => (
              <li key={c.id} className="py-1 border-b border-softBorder last:border-0">
                <a href={`/coin/${c.id}`} className="flex items-center gap-2 hover:text-degen transition">
                  <img src={c.image} alt="" className="w-4 h-4" />
                  <span className="font-semibold">{c.name}</span>
                  <span className="ml-auto text-marketData text-xs">{c.symbol.toUpperCase()}</span>
                </a>
              </li>
            ))}
            {results?.length === 0 && <li className="text-xs text-gray-400">No coins found.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
