"use client";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function SparklineChart({ data = [], color = "green" }) {
  if (!Array.isArray(data) || data.length < 2) return null;
  return (
    <Line
      data={{
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            borderColor: color === "green" ? "#00ff99" : "#ff3366",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
          }
        ]
      }}
      options={{
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
        elements: { line: { borderJoinStyle: "round" } },
        responsive: true,
        maintainAspectRatio: false,
      }}
      height={32}
      width={90}
    />
  );
}
