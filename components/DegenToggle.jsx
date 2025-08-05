"use client";
import { useState } from "react";

export default function DegenToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center ml-3">
      <span className="mr-2 text-sm font-medium">Degen Mode</span>
      <button
        onClick={() => setEnabled(!enabled)}
        aria-label="Toggle Degen Mode"
        className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${enabled ? 'bg-green-500' : 'bg-gray-500'}`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-7' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}
