"use client";
import React, { useState, useEffect } from 'react';
import styles from './checkbox.module.css';

const Checkbox = ({
  label,
  name,
  checked = false,
  onChange,
  required = false,
  disabled = false,
  error = null,
  className = '',
  valueMapping = { true: 'Y', false: 'N' }, // Default mapping for Y/N values
}) => {
  // Convert string value to boolean for the checkbox
  const [isChecked, setIsChecked] = useState(
    typeof checked === 'boolean' 
      ? checked 
      : checked === valueMapping.true
  );

  // Update internal state when prop changes
  useEffect(() => {
    setIsChecked(
      typeof checked === 'boolean' 
        ? checked 
        : checked === valueMapping.true
    );
  }, [checked, valueMapping.true]);

  const handleChange = (e) => {
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);
    
    if (onChange) {
      // Convert the boolean checked value to the appropriate string value based on mapping
      const mappedValue = newCheckedState ? valueMapping.true : valueMapping.false;
      
      // Create a synthetic event that mimics the original but with our mapped value
      const syntheticEvent = {
        target: {
          name,
          value: mappedValue,
          type: 'checkbox'
        }
      };
      
      onChange(syntheticEvent);
    }
  };
  
  return (
    <div className={`${styles.checkbox_group} ${className}`}>
      <div className={styles.checkbox_container}>
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className={`${styles.checkbox_input} ${error ? styles.error : ''}`}
        />
        
        <label 
          htmlFor={name} 
          className={`${styles.checkbox_label}`}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      </div>
      
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

export default Checkbox;
