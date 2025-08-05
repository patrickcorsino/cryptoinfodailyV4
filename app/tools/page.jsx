"use client";
import { useState } from "react";
import SidebarTools from "../../components/SidebarTools";
import ToolBody from "../../components/ToolBody";
import Link from "next/link";

const TOOLS = [
  { id: "position", name: "Position Size Calculator" },
  { id: "profit", name: "Profit/Loss Calculator" },
  { id: "roi", name: "ROI Calculator" },
  { id: "conversion", name: "Crypto Conversion Tool" }
];

export default function ToolsPage() {
  const [selected, setSelected] = useState(TOOLS[0].id);

  return (
    <main className="flex min-h-screen bg-darkBg">
      <div className="absolute left-0 top-0 w-full flex items-center p-6 z-10">
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-white to-degen bg-clip-text text-transparent tracking-tight drop-shadow-md">CryptoInfoDaily</Link>
      </div>
      <div className="flex flex-row w-full pt-20">
        <SidebarTools tools={TOOLS} selected={selected} setSelected={setSelected} />
        <div className="flex-1 p-6">
          <ToolBody tool={selected} />
        </div>
      </div>
    </main>
  );
}
