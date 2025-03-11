"use client";
import React, { useState } from "react";
import classes from "./filters.module.css";
import DateInput from "../inputs/dateInput/DateInput";

const FiltersAndActions = () => {
  const [searchData, setSearchData] = useState({
    fromDate: null,
    toDate: null,
    search: "",
    type: "General",
    status: "",
  });
  const searchOptions = [
    "General",
    "Location",
    "Partner",
    "Commodity",
    "Order",
  ];
  const handleSearch = () => {
    console.log(searchData);
  };

  return (
    <div className={classes.filters_and_actions}>
      {/* First row */}
      <div className={classes.date_range}>
        <DateInput
          data={searchData}
          setData={setSearchData}
          dataKey="fromDate"
          required
        />
        {/* <input
          type="date"
          className={classes.date_input}
          value={searchData.fromDate || ""}
          onChange={(e) =>
            setSearchData({ ...searchData, fromDate: e.target.value })
          }
          placeholder="From Date"
        /> */}
        <span className={classes.date_separator}>to</span>
        <DateInput
          data={searchData}
          setData={setSearchData}
          dataKey="toDate"
          required
        />
        {/* <input
          type="date"
          className={classes.date_input}
          value={searchData.toDate || ""}
          onChange={(e) =>
            setSearchData({ ...searchData, toDate: e.target.value })
          }
          placeholder="To Date"
        /> */}
      </div>
      
      <div className={classes.search_container}>
        <div className={classes.search_input_wrapper}>
          <input
            type="text"
            className={classes.search_input}
            value={searchData.search}
            onChange={(e) =>
              setSearchData({ ...searchData, search: e.target.value })
            }
            placeholder={`Search by ${searchData.type}...`}
          />
          <select
            className={classes.search_type_selector}
            value={searchData.type}
            onChange={(e) =>
              setSearchData({ ...searchData, type: e.target.value })
            }
          >
            {searchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button className={classes.search_btn} onClick={handleSearch}>
        Search
      </button>
      
      {/* Second row */}
      <select
        className={classes.status_select}
        value={searchData.status}
        onChange={(e) =>
          setSearchData({ ...searchData, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button className={`${classes.action_button} ${classes.convert}`}>
        Convert DD
      </button>
      
      <button className={`${classes.action_button} ${classes.send_email}`}>
        Send Email
      </button>
      
      <button className={`${classes.action_button} ${classes.import_csv}`}>
        Import CSV
      </button>

    </div>
  );
};

export default FiltersAndActions;
