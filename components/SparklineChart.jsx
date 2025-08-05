"use client";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function SparklineChart({ data, color }) {
  if (!Array.isArray(data) || data.length < 2) return <div style={{ height: 24 }} />;
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
            tension: 0.2,
          },
        ],
      }}
      options={{
        responsive: true,
        elements: { point: { radius: 0 } },
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      }}
      height={24}
    />
  );
}
