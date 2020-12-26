import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ items }) => {
  const lineChart = (
    <Line
      data={{
        labels: items.map((item) =>
          new Date(item.createdAt).toString().slice(4, 15)
        ),
        datasets: [
          {
            data: items.map((item) => item.price),
            label: "Revenue",
            borderColor: "#3333ff",
            fill: true,
          },
        ],
      }}
    />
  );
  return <div className="">{lineChart}</div>;
};

export default Chart;
