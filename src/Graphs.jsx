import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { autoType, filter } from "d3";
Chart.register(CategoryScale);

const Graphs = ({ data, filter, filter_options, setfilter }) => {
  console.log("from graph : " + filter);
  const [data_arr, setdata_arr] = useState([]);
  useEffect(() => {
    var new_arr = [];
    for (var i = 0; i < data.length; i++) {
      new_arr.push(data[i][filter]);
      //   console.log(data[i][filter]);
    }
    console.log(new_arr);
    setdata_arr(new_arr);
  }, [data, filter]);

  if (data_arr.length == 0) {
    return <div>loading</div>;
  }
  return (
    <div>
      <FilterComponent
        filter_options={filter_options}
        setfilter={setfilter}
      ></FilterComponent>
      <Graph data={data_arr} filter={filter}></Graph>
    </div>
  );
};

const Graph = ({ data, filter }) => {
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => `Label ${i + 1}`),
    datasets: [
      {
        label: "Data",
        data: data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="chart-container"
        style={{ width: "1000px", height: "700px", alignContent: "center" }}
      >
        <h2 style={{ textAlign: "center" }}>{filter}</h2>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const FilterComponent = ({ setfilter, filter_options }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);
    setfilter(selectedValue);
    console.log(selectedValue);
  };

  return (
    <div>
      <h2>Bar Graphs</h2>
      <label htmlFor="filterSelect">Select a Filter:</label>
      <select
        id="filterSelect"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        {filter_options.map((filter) => {
          return <option value={filter}>{filter}</option>;
        })}
      </select>
    </div>
  );
};

export default Graphs;
