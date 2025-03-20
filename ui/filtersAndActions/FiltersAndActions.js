"use client";
import React, { useState, useEffect } from "react";
import styles from "./filters.module.css";
import DateInput from "../inputs/dateInput/RangeDateInput";
import Dropdown from "../inputs/dropdown/Dropdown";
import CreateDropdown from "../inputs/createDropdown/CreateDropdown";
import Paginations from "../paginations/Paginations";
import {
  FaSearch,
  FaExchangeAlt,
  FaEnvelope,
  FaFileImport,
} from "react-icons/fa";
import ImportCsv from "../importCsv/ImportCsv";

const FiltersAndActions = ({ 
  totalRecords = 43
}) => {
  const [searchData, setSearchData] = useState({
    fromDate: null,
    toDate: null,
    partner: null,
    warehouse: null,
    commodity: null,
    order: "",
    search: "",
    status: null,
  });

  const statusOptions = ["All Status", "Active", "Pending", "Completed"];

  const handleSearchClick = () => {
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

  const handleConvertClick = () => {
    console.log("Converting data...");
    // Implement convert functionality
  };

  const handleSendEmailClick = () => {
    console.log("Sending email...");
    // Implement email functionality
  };

  const handleImportCSVClick = () => {
    console.log("Importing CSV...");
    // Implement CSV import functionality
  };

  return (
    <div className={styles.container}>

    {/* <ImportCsv
        title="Import Customers"
        orderRefOptions={[
           'Reference 1',
           'Reference 2',
           'Reference 3'
        ]}
        requiredKeys={['name', 'email']} // Required columns
        allKeys={['name', 'email', 'phone', 'address']} // All allowed columns
        onImport={async (data, orderRef) => {
            // Handle the import process
            // data is the array of records to import
            // orderRef is the selected order reference
        }}
    /> */}

      <div className={styles.filters}>
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
        <button className={styles.searchBtn} onClick={handleSearchClick}>
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
        <div className={styles.orderSearch}>  
          <input
            className={styles.orderSearchInput}
            type="text"
            placeholder="Order ID"
            value={searchData.order}
            onChange={(e) =>
              setSearchData({ ...searchData, order: e.target.value })
            }
          />
          <FaSearch className={styles.searchIcon} />
        </div>

        <Dropdown
          options={statusOptions}
          placeholder="Select Status"
          onChange={(option) => handleDropdownChange('status', option)}
          value={searchData.status}
          // label="Status"
          id="status-dropdown"
        />

        <CreateDropdown />


      </div>
      <div className={styles.actionsAndPaginations}>
        <div className={styles.actions}>
          <div className={styles.searchInputContainer}>  
            <input
              className={styles.searchInput}
              type="text"
              placeholder="General Search"
              value={searchData.search}
              onChange={(e) =>
                setSearchData({ ...searchData, search: e.target.value })
              }
            />
            <FaSearch className={styles.searchIcon} />
          </div>

          <button
            className={`${styles.actionButton} ${styles.convert}`}
            onClick={handleConvertClick}
          >
          <FaExchangeAlt style={{ marginRight: "8px" }} />
          Convert DD
        </button>

        <button
          className={`${styles.actionButton} ${styles.sendEmail}`}
          onClick={handleSendEmailClick}
        >
          <FaEnvelope style={{ marginRight: "8px" }} />
          Send Email
        </button>

        <button
          className={`${styles.actionButton} ${styles.importCSV}`}
          onClick={handleImportCSVClick}
        >
          <FaFileImport style={{ marginRight: "8px" }} />
          Import CSV
        </button>
      </div>
      <Paginations 
        totalRecords={totalRecords}
      />

      </div>
      </div>
  );
};

export default FiltersAndActions;
