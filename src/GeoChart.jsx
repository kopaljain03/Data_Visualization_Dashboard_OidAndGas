import { blurImage } from "d3";
import React from "react";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
// export const data = [
//   ["Country", "Popularity"],
//   ["Germany", 200],
//   ["United States", 300],
//   ["Brazil", 400],
//   ["Canada", 500],
//   ["France", 600],
//   ["RU", 700],
// ];
const GeoChart = ({ data, filter_options, geo_filter_options }) => {
  const [xLabel, setXLabel] = useState(filter_options[0]); // Initial X label
  const [yLabel, setYLabel] = useState(geo_filter_options[0]); // Initial Y label
  const [data_arr, setdata_arr] = useState([]);

  useEffect(() => {
    var new_xdata = [];
    setXLabel(filter_options[0]);
    setYLabel(geo_filter_options[0]);
    new_xdata.push([geo_filter_options[0], filter_options[0]]);
    for (var i = 0; i < data.length; i++) {
      new_xdata.push([
        data[i][geo_filter_options[0]],
        data[i][filter_options[0]],
      ]);
    }
    setdata_arr(new_xdata);
  }, [data, filter_options, geo_filter_options]);
  const xLabels = filter_options;
  const yLabels = geo_filter_options;

  const handleXChange = (e) => {
    setXLabel(e.target.value);
    var new_xdata = [];
    new_xdata.push([yLabel, e.target.value]);
    for (var i = 0; i < data.length; i++) {
      new_xdata.push([data[i][yLabel], data[i][e.target.value]]);
    }
    console.log(new_xdata);
    setdata_arr(new_xdata);
  };

  const handleYChange = (e) => {
    setYLabel(e.target.value);
    var new_ydata = [];
    new_ydata.push([e.target.value, xLabel]);
    for (var i = 0; i < data.length; i++) {
      new_ydata.push([data[i][e.target.value], data[i][xLabel]]);
    }
    console.log(new_ydata);
    setdata_arr(new_ydata);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2>Geo Chart</h2>
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
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = data_arr[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          width="900px"
          data={data_arr}
        />
      </div>
    </div>
  );
};

export default GeoChart;
