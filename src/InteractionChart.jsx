import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";

const InteractionChart = ({ data, filter_options }) => {
  const [xLabel, setXLabel] = useState("x"); // Initial X label
  const [yLabel, setYLabel] = useState("y"); // Initial Y label
  const [yData, setYData] = useState([]);
  const [xData, setXData] = useState([]);

  // Filter distinct values for x and y labels from the data
  const xLabels = filter_options;
  const yLabels = filter_options;

  const chartData = {
    datasets: [
      {
        label: "Scatter Plot",
        data: xData.map((value, index) => ({ x: value, y: yData[index] })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Scatter Plot",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yLabel,
        },
      },
      x: {
        title: {
          display: true,
          text: xLabel,
        },
      },
    },
  };
  const handleXChange = (e) => {
    setXLabel(e.target.value);
    var new_xdata = [];
    for (var i = 0; i < data.length; i++) {
      new_xdata.push(data[i][e.target.value]);
    }
    console.log(new_xdata);
    setXData(new_xdata);
  };

  const handleYChange = (e) => {
    setYLabel(e.target.value);
    var new_ydata = [];
    for (var i = 0; i < data.length; i++) {
      new_ydata.push(data[i][e.target.value]);
    }
    console.log(new_ydata);
    setYData(new_ydata);
  };

  return (
    <div>
      <h2>Interaction Chart</h2>
      <div>
        <label htmlFor="xLabel">X Label:</label>
        <select id="xLabel" onChange={handleXChange} value={xLabel}>
          {xLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="yLabel">Y Label:</label>
        <select id="yLabel" onChange={handleYChange} value={yLabel}>
          {yLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default InteractionChart;
