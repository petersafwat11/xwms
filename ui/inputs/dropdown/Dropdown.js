import React, { useRef, useEffect, useState } from "react";
import styles from "./dropdown.module.css";
import { FaChevronDown, FaSearch } from "react-icons/fa";

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
  // State for open/close and search functionality
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionsId = `${id}-options`;

  // Filter options when search term or options change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option => 
        String(option).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm(""); // Clear search when closing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
    setSearchTerm(""); // Clear search after selection
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm(""); // Clear search when opening
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Prevent dropdown from closing when clicking in the search input
  const handleSearchClick = (e) => {
    e.stopPropagation();
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
            <div className={styles.search_container} onClick={handleSearchClick}>
              <FaSearch className={styles.search_icon} />
              <input
                ref={searchInputRef}
                type="text"
                className={styles.search_input}
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className={styles.options_list}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
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
                <div className={styles.no_options}>No options found</div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  );
};

export default Dropdown;
