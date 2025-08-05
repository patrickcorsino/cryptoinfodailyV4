"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DegenToggle from "./DegenToggle";
import SearchBar from "./SearchBar";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-darkBg/70 backdrop-blur shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-2xl bg-gradient-to-r from-white to-degen bg-clip-text text-transparent">
          Crypto Info Daily
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className={pathname === "/" ? "text-degen font-bold" : "hover:text-degen transition"}>
            Home
          </Link>
          <Link href="/tools" className={pathname.startsWith("/tools") ? "text-degen font-bold" : "hover:text-degen transition"}>
            Tools
          </Link>
          <SearchBar />
          <DegenToggle />
        </nav>
      </div>
    </header>
  );
}

