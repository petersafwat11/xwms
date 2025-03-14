import React, { forwardRef, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./dateInput.module.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DateInput = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  required = false,
  label,
}) => {
  // State for tracking current month and year in the calendar
  const [calendarDate, setCalendarDate] = useState(new Date());
  const inputRef = useRef(null);
  const calendarContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // Create a ref for the portal container
  const portalContainerRef = useRef(null);

  // Initialize portal container
  useEffect(() => {
    // Create portal container if it doesn't exist
    if (!portalContainerRef.current) {
      const container = document.createElement('div');
      container.className = classes.date_picker_portal;
      document.body.appendChild(container);
      portalContainerRef.current = container;
    }
    
    // Cleanup function to remove the portal container
    return () => {
      if (portalContainerRef.current) {
        document.body.removeChild(portalContainerRef.current);
      }
    };
  }, []);

  // Update calendar date when startDate changes
  useEffect(() => {
    if (startDate) {
      setCalendarDate(new Date(startDate));
    }
  }, [startDate]);

  // Add click outside listener to close the calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking inside the datepicker or the input container
      if (
        calendarContainerRef.current && 
        !calendarContainerRef.current.contains(event.target) &&
        inputRef.current && 
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Generate array of months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate array of years (5 years before and 5 years after current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Format the date range for display
  const formatDateRange = () => {
    if (!startDate && !endDate) return "";

    const formatDate = (date) => {
      if (!date) return "";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    } else if (startDate) {
      return formatDate(startDate);
    } else {
      return formatDate(endDate);
    }
  };

  // Handle date range changes
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;

    // Only update if values actually changed
    if (start !== startDate) {
      onStartDateChange(start);
    }

    if (end !== endDate) {
      onEndDateChange(end);
    }
    
    // Close calendar if both start and end dates are selected
    if (start && end) {
      setIsOpen(false);
    }
  };

  // Toggle the calendar visibility
  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  // Custom input component for date range field
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className={classes.date_range_input_container} ref={inputRef}>
      {label && (
        <label className={classes.date_label}>
          {label} {required && <span className={classes.required}>*</span>}
        </label>
      )}
      <div 
        className={classes.date_input_wrapper} 
        onClick={toggleCalendar}
      >
        <input
          className={classes.date_input_field}
          ref={ref}
          value={formatDateRange()}
          placeholder="Select date range"
          readOnly
          required={required}
        />
        <FaCalendarAlt className={classes.calendar_icon} />
      </div>
    </div>
  ));

  // Add display name to fix lint error
  CustomInput.displayName = "CustomDateRangeInput";

  // Custom header component for the calendar
  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    return (
      <div className={classes.custom_header}>
        <button
          className={classes.nav_button}
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          aria-label="Previous month"
        >
          <FaChevronLeft />
        </button>

        <div className={classes.selects_container}>
          <select
            className={classes.month_select}
            value={date.getMonth()}
            onChange={(e) => {
              const newMonth = parseInt(e.target.value, 10);
              changeMonth(newMonth);

              // Update our local state
              const newDate = new Date(calendarDate);
              newDate.setMonth(newMonth);
              setCalendarDate(newDate);
            }}
            aria-label="Select month"
          >
            {months.map((monthName, i) => (
              <option key={monthName} value={i}>
                {monthName}
              </option>
            ))}
          </select>

          <select
            className={classes.year_select}
            value={date.getFullYear()}
            onChange={(e) => {
              const newYear = parseInt(e.target.value, 10);
              changeYear(newYear);

              // Update our local state
              const newDate = new Date(calendarDate);
              newDate.setFullYear(newYear);
              setCalendarDate(newDate);
            }}
            aria-label="Select year"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          className={classes.nav_button}
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          aria-label="Next month"
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  // Handle month change in the calendar
  const handleMonthChange = (date) => {
    setCalendarDate(date);
  };

  // Handle calendar close
  const handleCalendarClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <CustomInput />
      
      {isOpen && portalContainerRef.current && createPortal(
        <div 
          className={classes.calendar_container}
          ref={calendarContainerRef}
          style={{
            position: 'absolute',
            left: inputRef.current ? inputRef.current.getBoundingClientRect().left : 0,
            top: inputRef.current ? inputRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
            zIndex: 9999,
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat="MMM d, yyyy"
            calendarClassName={classes.calendar}
            renderCustomHeader={renderCustomHeader}
            onMonthChange={handleMonthChange}
            onClickOutside={handleCalendarClose}
          />
        </div>,
        portalContainerRef.current
      )}
    </>
  );
};

export default DateInput;
