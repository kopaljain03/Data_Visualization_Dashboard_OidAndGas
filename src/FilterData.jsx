import React, { useEffect, useState } from "react";

const FilterData = ({ data, setdata }) => {
  const filterheaders = [
    "end_year",
    "sector",
    "topic",
    "region",
    "start_year",
    "country",
  ];
  const [filterArrays, setfilterArrays] = useState([]);
  const [filters, setFilters] = useState({});
  const [newdata, setnewData] = useState(data);
  useEffect(() => {
    const filterArrays_new = [];
    for (var j = 0; j < filterheaders.length; j++) {
      var headerarray = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i][filterheaders[j]] != "")
          headerarray.push(data[i][filterheaders[j]]);
      }
      var currentheader = filterheaders[j];
      const uniqueArray = [...new Set(headerarray)];
      filterArrays_new.push({ [currentheader]: uniqueArray });
    }
    setfilterArrays(filterArrays_new);
    const initialFilters = {};
    filterArrays_new.forEach((filterObj) => {
      const key = Object.keys(filterObj)[0];
      initialFilters[key] = filterObj[key].reduce((obj, val) => {
        obj[val] = true;
        return obj;
      }, {});
    });
    setFilters(initialFilters);
    setnewData(data);
    const filteredData = newdata.filter((item) =>
      Object.keys(item).every((key) => filters[key][item[key]])
    );
  }, [data]);

  //   useEffect(() => {

  //     // setdata(filteredData);
  //   }, [data, filters]);
  // Initialize filter states

  // Function to handle checkbox change
  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: !prevFilters[category][value],
      },
    }));
  };

  // Function to filter data based on checkboxes

  return (
    <div style={{ alignContent: "center" }}>
      {filterArrays.map((filterObj, index) => {
        const key = Object.keys(filterObj)[0];
        return (
          <div key={index}>
            <h4>{key}</h4>
            {filterObj[key].map((option, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  checked={filters[key][option]}
                  onChange={() => handleCheckboxChange(key, option)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      })}

      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            {Object.keys(item).map((key, idx) => (
              <span key={idx}>{`${key}: ${item[key]} `}</span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

//[{year:[2018 , 2019,2020 ...]}, {sector:[energy , food,oil ...]}...]
//data=[{year: 2018 , sector: energy } ,  {year : 2019 , sector:food } ...]

export default FilterData;
