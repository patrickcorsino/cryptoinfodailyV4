"use client";
import { useState } from "react";
import PositionSizeCalculator from "../../components/tools/PositionSizeCalculator";
import ProfitLossCalculator from "../../components/tools/ProfitLossCalculator";
import CompoundingCalculator from "../../components/tools/CompoundingCalculator";
import Converter from "../../components/tools/Converter";

const TOOLS = [
  { name: "Position Size", component: <PositionSizeCalculator /> },
  { name: "Profit/Loss", component: <ProfitLossCalculator /> },
  { name: "Compounding", component: <CompoundingCalculator /> },
  { name: "BTC/USD Converter", component: <Converter /> },
];

export default function ToolsPage() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto mt-6 rounded-2xl shadow-soft bg-card overflow-hidden min-h-[500px]">
      <aside className="md:w-60 w-full bg-darkBg border-r border-softBorder py-5 flex flex-row md:flex-col md:space-x-0 space-x-2 md:space-y-4 items-center md:items-start px-3">
        {TOOLS.map((tool, i) => (
          <button
            key={tool.name}
            className={`w-full px-3 py-2 rounded-lg font-semibold text-left transition ${
              i === selected ? "bg-degen text-black" : "hover:bg-cardHover text-white"
            }`}
            onClick={() => setSelected(i)}
          >
            {tool.name}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-6">
        {TOOLS[selected].component}
      </main>
    </div>
  );
}
