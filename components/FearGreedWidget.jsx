export default function FearGreedWidget({ data }) {
  const fg = data?.value || 50;
  const level = data?.value_classification || "Neutral";
  const levelColor =
    fg > 60
      ? "text-green-400"
      : fg < 40
      ? "text-red-400"
      : "text-yellow-300";

  return (
    <div className="bg-card rounded-xl p-4 shadow-soft flex flex-col items-center">
      <div className="font-bold text-lg mb-2">Fear & Greed</div>
      <div className={`text-4xl font-extrabold mb-2 ${levelColor}`}>{fg}</div>
      <div className="mb-2">{level}</div>
      <div className="w-full h-2 bg-darkBg rounded-full relative mt-2">
        <div
          className={`h-2 rounded-full ${fg > 60 ? "bg-green-400" : fg < 40 ? "bg-red-400" : "bg-yellow-300"}`}
          style={{ width: `${fg}%` }}
        />
      </div>
    </div>
  );
}
