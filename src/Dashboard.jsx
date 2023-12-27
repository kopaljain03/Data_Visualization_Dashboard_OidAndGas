import React, { useEffect, useState } from "react";
import Graphs from "./Graphs";
import axios from "axios";
import InteractionChart from "./InteractionChart";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState("end_year");
  const [filter_options, setfilter_options] = useState([]);
  useEffect(() => {
    axios
      .get("../data/jsondata.json")
      .then((res) => {
        setdata(res.data);
        // const excludedKeys = ["insight", "url", "added", "published", "title"];
        const filter_options_arr = Object.keys(res.data[0]).filter(
          (key) =>
            typeof res.data[0][key] === "number" || res.data[0][key] === ""
        );
        setfilter_options(filter_options_arr);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <FilterComponent
        filter_options={filter_options}
        setfilter={setfilter}
      ></FilterComponent>
      <Graphs data={data} filter={filter}></Graphs>
      <InteractionChart
        data={data}
        filter_options={filter_options}
      ></InteractionChart>
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
      <h2>Filter Component</h2>
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

export default Dashboard;
