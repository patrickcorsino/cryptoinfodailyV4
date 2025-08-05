'use client';
export default function DegenToggle({ enabled, setEnabled }) {
  return (
    <div className="flex items-center select-none">
      <span className="mr-2 text-sm font-medium">Degen Mode</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${enabled ? "bg-green-500" : "bg-gray-500"}`}
      >
        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-7" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
