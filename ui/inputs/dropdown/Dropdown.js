import React, { useRef, useEffect, useState } from "react";
import styles from "./dropdown.module.css";
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
    <div className={styles.dropdown_container} ref={dropdownRef}>
      {label && (
        <label className={styles.dropdown_label} htmlFor={id}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={`${styles.dropdown} ${isOpen ? styles.open : ""} ${
          disabled ? styles.disabled : ""
        } ${error ? styles.error : ""}`}
        onClick={toggleDropdown}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        aria-haspopup="listbox"
        id={id}
      >
        <div className={styles.dropdown_selected}>
          <p
            className={`${styles.selected_text} ${
              !value ? styles.placeholder : ""
            }`}
          >
            {value || placeholder}
          </p>
          <FaChevronDown className={styles.dropdown_icon} />
        </div>

        {isOpen && (
          <div
            className={styles.dropdown_options}
            id={optionsId}
            role="listbox"
          >
            {options.length > 0 ? (
              options.map((option, index) => (
                <div
                  className={`${styles.dropdown_option} ${
                    value === option ? styles.selected : ""
                  }`}
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={value === option}
                >
                  <p className={styles.option_text}>{option}</p>
                </div>
              ))
            ) : (
              <div className={styles.no_options}>No options available</div>
            )}
          </div>
        )}
      </div>

      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  );
};

export default Dropdown;
