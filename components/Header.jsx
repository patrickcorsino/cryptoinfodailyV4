"use client";
import { useState } from "react";
import Link from "next/link";
import DegenToggle from "./DegenToggle";
import SearchBar from "./SearchBar";

export default function Header({ coins, degenMode, setDegenMode }) {
  return (
    <header className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-5">
        <Link href="/" className="font-extrabold text-xl bg-gradient-to-r from-white to-degen bg-clip-text text-transparent">
          CryptoDaily
        </Link>
        <Link href="/tools" className="text-marketData hover:text-degen font-semibold text-base transition">Tools</Link>
      </div>
      <div className="flex items-center gap-5">
        <SearchBar coins={coins} />
        <DegenToggle degenMode={degenMode} setDegenMode={setDegenMode} />
      </div>
    </header>
  );
}
