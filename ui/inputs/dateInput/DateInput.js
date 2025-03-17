import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './dateInput.module.css';

/**
 * Reusable date input component
 * @param {Object} props - Component properties
 * @param {string} props.id - Input ID
 * @param {string} props.name - Input name
 * @param {string} props.label - Input label
 * @param {Date|string} props.value - Selected date value
 * @param {function} props.onChange - Change handler function
 * @param {string} [props.placeholder] - Input placeholder
 * @param {boolean} [props.required=false] - Is input required
 * @param {string} [props.error] - Error message
 * @param {Date} [props.minDate] - Minimum selectable date
 * @param {Date} [props.maxDate] - Maximum selectable date
 * @param {boolean} [props.disabled=false] - Is input disabled
 * @returns {JSX.Element} - DateInput component
 */
const DateInput = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = 'Select date',
  required = false,
  error,
  minDate,
  maxDate,
  disabled = false,
}) => {
  // Convert string date to Date object if needed
  const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;
  
  // Custom date input to match our styling
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className={styles.date_input_wrapper}>
      <input
        id={id}
        className={`${styles.date_input_field} ${error ? styles.error : ''}`}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        ref={ref}
        disabled={disabled}
      />
      <FaCalendarAlt className={styles.calendar_icon} />
    </div>
  ));
  
  // Add display name to fix ESLint error
  CustomInput.displayName = 'CustomDateInput';
  
  // Custom header for more control over the calendar UI
  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    
    return (
      <div className={styles.custom_header}>
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          type="button"
          className={styles.nav_button}
        >
          {'<'}
        </button>
        
        <div className={styles.selects_container}>
          <select
            value={date.getMonth()}
            onChange={({ target: { value } }) => changeMonth(value)}
            className={styles.month_select}
          >
            {months.map((month, i) => (
              <option key={month} value={i}>
                {month}
              </option>
            ))}
          </select>
          
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
            className={styles.year_select}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          type="button"
          className={styles.nav_button}
        >
          {'>'}
        </button>
      </div>
    );
  };
  
  // Add display name to fix ESLint error
  CustomHeader.displayName = 'CustomDateHeader';
  
  // Handle date change
  const handleChange = (date) => {
    onChange({
      target: {
        name,
        value: date
      }
    });
  };
  
  return (
    <div className={styles.date_input_container}>
      {label && (
        <label htmlFor={id} className={styles.date_label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <DatePicker
        selected={dateValue}
        onChange={handleChange}
        customInput={<CustomInput />}
        dateFormat="yyyy-MM-dd"
        renderCustomHeader={CustomHeader}
        minDate={minDate}
        maxDate={maxDate}
        popperClassName={styles.popper}
        disabled={disabled}
      />
      
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

export default DateInput;