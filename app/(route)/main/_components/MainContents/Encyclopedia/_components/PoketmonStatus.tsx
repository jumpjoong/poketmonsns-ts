import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppSelector } from "@/app/_hooks/hooks";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function PoketmonStatus() {
  const poketmonStats = useAppSelector(state => state.selectPoket.stats);
  const data = {
    labels: Object.keys(poketmonStats),
    datasets: [
      {
        label: "능력치",
        data: Object.values(poketmonStats),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Radar
        data={data}
        options={{
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 160,
              ticks: {
                color: "red",
                stepSize: 40,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default PoketmonStatus;
