import React, { useEffect, useState } from "react";
import Graphs from "./Graphs";
import axios from "axios";
import InteractionChart from "./InteractionChart";
import GeoChart from "./GeoChart";
import FilterData from "./FilterData";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState("end_year");
  const [filter_options, setfilter_options] = useState([]);

  const geo_filter_options = ["country", "region"];
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/insights")
      .then((res) => {
        setdata(res.data.data);
        console.log("loading data for the first time");
        console.log(res.data.data);
        // const excludedKeys = ["insight", "url", "added", "published", "title"];
        const filter_options_arr = Object.keys(res.data.data[0]).filter(
          (key) =>
            typeof res.data.data[0][key] === "number" ||
            res.data.data[0][key] === ""
        );

        setfilter_options(filter_options_arr);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {/* <Navbar></Navbar> */}
      {/* <FilterData data={data} setdata={setdata}></FilterData> */}
      <FilterComponent
        filter_options={filter_options}
        setfilter={setfilter}
      ></FilterComponent>
      <Graphs data={data} filter={filter}></Graphs>
      <InteractionChart
        data={data}
        filter_options={filter_options}
      ></InteractionChart>

      <GeoChart
        data={data}
        filter_options={filter_options}
        geo_filter_options={geo_filter_options}
      ></GeoChart>
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

export default Dashboard;
