"use client";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, LinearScale, PointElement } from "chart.js";
Chart.register(LineElement, LinearScale, PointElement);

export default function SparklineChart({ data, color }) {
  if (!data?.length) return <div />;

  return (
    <Line
      data={{
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            borderColor: color === "green" ? "#00ff99" : "#ff3366",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0.35,
          },
        ],
      }}
      options={{
        plugins: { legend: { display: false } },
        elements: { point: { radius: 0 } },
        scales: { x: { display: false }, y: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
      }}
      width={60}
      height={26}
    />
  );
}
