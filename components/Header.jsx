import Link from "next/link";

export default function Header({ onSearchClick, degenMode, setDegenMode }) {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-white to-degen bg-clip-text text-transparent">
        CryptoInfoDaily
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/tools" className="text-white text-base font-medium hover:text-degen transition">
          Tools
        </Link>
        <button
          className="group relative"
          onClick={onSearchClick}
          aria-label="Search"
        >
          <svg width={22} height={22} fill="none" className="text-white group-hover:text-degen transition">
            <circle cx={10} cy={10} r={8} stroke="currentColor" strokeWidth={2} />
            <path d="M17 17l-3-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
          </svg>
        </button>
        <div className="flex items-center">
          <span className="mr-2 text-xs font-medium text-white/70">Degen</span>
          <button
            onClick={() => setDegenMode((v) => !v)}
            className={`w-12 h-6 rounded-full flex items-center px-1 duration-300 ${degenMode ? "bg-green-500" : "bg-gray-600"}`}
            aria-pressed={degenMode}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white shadow-md duration-300 transform ${degenMode ? "translate-x-6" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
