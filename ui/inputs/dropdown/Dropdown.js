import React, { useRef, useEffect, useState } from "react";
import classes from "./dropdown.module.css";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({
  options = [],
  placeholder = "Select",
  onChange,
  value = null,
  disabled = false,
  required = false,
  label = "",
  error = "",
  id = "dropdown",
}) => {
  // Only maintain open/close state internally
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const optionsId = `${id}-options`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={classes.dropdown_container} ref={dropdownRef}>
      {label && (
        <label className={classes.dropdown_label} htmlFor={id}>
          {label} {required && <span className={classes.required}>*</span>}
        </label>
      )}

      <div
        className={`${classes.dropdown} ${isOpen ? classes.open : ""} ${
          disabled ? classes.disabled : ""
        } ${error ? classes.error : ""}`}
        onClick={toggleDropdown}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        aria-haspopup="listbox"
        id={id}
      >
        <div className={classes.dropdown_selected}>
          <p
            className={`${classes.selected_text} ${
              !value ? classes.placeholder : ""
            }`}
          >
            {value || placeholder}
          </p>
          <FaChevronDown className={classes.dropdown_icon} />
        </div>

        {isOpen && (
          <div
            className={classes.dropdown_options}
            id={optionsId}
            role="listbox"
          >
            {options.length > 0 ? (
              options.map((option, index) => (
                <div
                  className={`${classes.dropdown_option} ${
                    value === option ? classes.selected : ""
                  }`}
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={value === option}
                >
                  <p className={classes.option_text}>{option}</p>
                </div>
              ))
            ) : (
              <div className={classes.no_options}>No options available</div>
            )}
          </div>
        )}
      </div>

      {error && <p className={classes.error_message}>{error}</p>}
    </div>
  );
};

export default Dropdown;
