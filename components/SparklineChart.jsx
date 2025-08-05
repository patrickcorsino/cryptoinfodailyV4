// /components/SparklineChart.jsx
"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

// Register Chart.js scales (critical!)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function SparklineChart({ data, color = "green" }) {
  if (!Array.isArray(data) || data.length < 2) {
    return <div className="h-6 w-full bg-gray-800 rounded"></div>;
  }
  return (
    <Line
      data={{
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            borderColor: color === "red" ? "#ff3366" : "#00ff99",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0.3,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        elements: { line: { tension: 0.3 } },
        scales: {
          x: { display: false, type: "category" }, // critical for error-free
          y: { display: false },
        },
      }}
      height={24}
      width={100}
    />
  );
}
