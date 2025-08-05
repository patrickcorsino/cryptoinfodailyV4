export default function FearGreedWidget({ data }) {
  if (!data) return null;
  const score = data.value;
  const level = data.value_classification;
  const color =
    score >= 70
      ? "#00ff99"
      : score >= 60
      ? "#3affaf"
      : score >= 50
      ? "#ffe066"
      : score >= 40
      ? "#fd7e14"
      : "#ff3366";

  return (
    <div className="bg-card rounded-2xl shadow-soft p-5 flex flex-col min-h-[140px] items-center justify-center">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
          style={{
            background: color,
            color: "#232531",
            boxShadow: `0 0 18px ${color}66`,
          }}
        >
          {score}
        </div>
        <span className="font-semibold text-marketData text-xs">Fear & Greed</span>
      </div>
      <div className="text-white/90 font-bold text-lg">{level}</div>
    </div>
  );
}
