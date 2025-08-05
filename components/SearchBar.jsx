"use client";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-card rounded-full p-2 shadow-soft hover:shadow-cardGlow"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-marketData" />
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
