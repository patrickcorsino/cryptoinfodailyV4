'use client';
export default function DegenToggle({ enabled, setEnabled }) {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300
        ${enabled ? 'bg-green-500' : 'bg-gray-500'}
      `}
      aria-label="Toggle Degen Mode"
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300
          ${enabled ? 'translate-x-7' : 'translate-x-0'}
        `}
      />
      <span className="absolute left-1/2 -translate-x-1/2 text-xs text-white select-none pointer-events-none" style={{top: 'calc(100% + 2px)'}}>Degen Mode</span>
    </button>
  );
}
