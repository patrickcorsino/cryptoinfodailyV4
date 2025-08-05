export default function FearGreedWidget({ data }) {
  if (!data) return null;
  const fgValue = parseInt(data.value);
  let fgColor = "text-yellow-400";
  if (fgValue >= 75) fgColor = "text-green-400";
  else if (fgValue <= 25) fgColor = "text-red-400";
  return (
    <div className="bg-card rounded-2xl p-4 shadow-cardGlow flex flex-col items-center justify-center mb-6">
      <h2 className="text-lg font-bold mb-2">Fear &amp; Greed</h2>
      <div className={`text-5xl font-black ${fgColor} mb-2`}>{data.value}</div>
      <div className="text-sm text-gray-400">{data.value_classification}</div>
    </div>
  );
}
