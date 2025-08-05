"use client";
import { useState } from "react";
import { tools } from "../../lib/tools";
import CoinConverter from "../../components/tools/CoinConverter";
import ProfitCalculator from "../../components/tools/ProfitCalculator";

const TOOL_MAP = {
  "Coin Converter": CoinConverter,
  "Profit Calculator": ProfitCalculator,
};

export default function ToolsPage() {
  const [active, setActive] = useState("Coin Converter");
  const ToolComponent = TOOL_MAP[active] || (() => <div />);

  return (
    <div className="flex w-full max-w-5xl mx-auto min-h-[60vh] pt-10">
      <aside className="min-w-[180px] pr-8 border-r border-softBorder">
        <ul>
          {tools.map((tool) => (
            <li key={tool.name} className="mb-2">
              <button
                className={`w-full text-left px-2 py-2 rounded transition font-medium
                  ${active === tool.name ? "bg-degen text-darkBg" : "text-white/90 hover:bg-cardHover"}
                `}
                onClick={() => setActive(tool.name)}
              >
                {tool.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 px-8">
        <h1 className="text-2xl font-bold mb-4">{active}</h1>
        <ToolComponent />
      </section>
    </div>
  );
}
