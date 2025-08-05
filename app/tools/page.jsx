"use client";
import { useState } from "react";
import PositionSizeCalculator from "../../components/tools/PositionSizeCalculator";
import DcaCalculator from "../../components/tools/DcaCalculator";
import PnlCalculator from "../../components/tools/PnlCalculator";
import Converter from "../../components/tools/Converter";

const TOOLS = [
  { name: "Position Size", key: "position" },
  { name: "DCA Calculator", key: "dca" },
  { name: "PnL Calculator", key: "pnl" },
  { name: "Crypto Converter", key: "converter" },
];

export default function ToolsPage() {
  const [active, setActive] = useState("position");

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto mt-10 bg-card rounded-xl shadow-soft">
      <aside className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-softBorder">
        <div className="flex md:flex-col gap-2 md:gap-0">
          {TOOLS.map((tool) => (
            <button
              key={tool.key}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 font-semibold transition ${active === tool.key ? "bg-degen text-darkBg" : "hover:bg-cardHover text-white"}`}
              onClick={() => setActive(tool.key)}
            >
              {tool.name}
            </button>
          ))}
        </div>
      </aside>
      <main className="flex-1 p-6">
        {active === "position" && <PositionSizeCalculator />}
        {active === "dca" && <DcaCalculator />}
        {active === "pnl" && <PnlCalculator />}
        {active === "converter" && <Converter />}
      </main>
    </div>
  );
}
