"use client";
import React, { useState, useEffect } from "react";
import classes from "./filters.module.css";
import DateInput from "../inputs/dateInput/DateInput";
import Dropdown from "../inputs/dropdown/Dropdown";
import {
  FaSearch,
  FaExchangeAlt,
  FaEnvelope,
  FaFileImport,
} from "react-icons/fa";

const FiltersAndActions = () => {
  const [searchData, setSearchData] = useState({
    fromDate: null,
    toDate: null,
    partner: null,
    warehouse: null,
    commodity: null,
    order: "",
    search: "",
    status: null,
    // selectedValue: null,
  });

  useEffect(() => {
    console.log("searchData", searchData);
  }, [searchData]);

  const statusOptions = ["All Status", "Active", "Pending", "Completed"];

  const handleSearch = () => {
    console.log(searchData);
  };

  // Generic handler for all dropdown changes
  const handleDropdownChange = (field, value) => {
    setSearchData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleStartDateChange = (date) => {
    setSearchData({ ...searchData, fromDate: date });
  };

  const handleEndDateChange = (date) => {
    setSearchData({ ...searchData, toDate: date });
  };

  const handleConvert = () => {
    console.log("Converting data...");
    // Implement convert functionality
  };

  const handleSendEmail = () => {
    console.log("Sending email...");
    // Implement email functionality
  };

  const handleImportCSV = () => {
    console.log("Importing CSV...");
    // Implement CSV import functionality
  };

  return (
    <div className={classes.filters_and_actions}>
      <DateInput
        startDate={searchData.fromDate}
        endDate={searchData.toDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        required={true}
        // label="Date Range"
      />
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="Select a partner"
        onChange={(option) => handleDropdownChange('partner', option)}
        value={searchData.partner}
        // label="Select an option"
        required={true}
        id="partner-dropdown"
      />
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="Select a warehouse"
        onChange={(option) => handleDropdownChange('warehouse', option)}
        value={searchData.warehouse}
        // label="Select an option"
        required={true}
        id="warehouse-dropdown"
      />
      <button className={classes.search_btn} onClick={handleSearch}>
        Search
      </button>
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="Select a commodity"
        onChange={(option) => handleDropdownChange('commodity', option)}
        value={searchData.commodity}
        // label="Select an option"
        required={true}
        id="commodity-dropdown"
      />
      <div className={classes.order_search}>  
        <input
          className={classes.order_search_input}
          type="text"
          placeholder="Order ID"
          value={searchData.order}
          onChange={(e) =>
            setSearchData({ ...searchData, order: e.target.value })
          }
        />
        <FaSearch className={classes.search_icon} />
      </div>

      <Dropdown
        options={statusOptions}
        placeholder="Select Status"
        onChange={(option) => handleDropdownChange('status', option)}
        value={searchData.status}
        // label="Status"
        id="status-dropdown"
      />
      <div className={classes.search_input_container}>  
        <input
          className={classes.search_input}
          type="text"
          placeholder="Order ID"
          value={searchData.order}
          onChange={(e) =>
            setSearchData({ ...searchData, order: e.target.value })
          }
        />
        <FaSearch className={classes.search_icon} />
      </div>


      <button
        className={`${classes.action_button} ${classes.convert}`}
        onClick={handleConvert}
      >
        <FaExchangeAlt style={{ marginRight: "8px" }} />
        Convert DD
      </button>

      <button
        className={`${classes.action_button} ${classes.send_email}`}
        onClick={handleSendEmail}
      >
        <FaEnvelope style={{ marginRight: "8px" }} />
        Send Email
      </button>

      <button
        className={`${classes.action_button} ${classes.import_csv}`}
        onClick={handleImportCSV}
      >
        <FaFileImport style={{ marginRight: "8px" }} />
        Import CSV
      </button>
    </div>
  );
};

export default FiltersAndActions;
