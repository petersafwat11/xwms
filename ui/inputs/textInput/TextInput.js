"use client";
import React, { useState, useEffect } from 'react';
import styles from './textInput.module.css';

const TextInput = ({
  label,
  name,
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  disabled = false,
  maxLength,
  error = null,
  autoFocus = false,
  className = '',
  step = type === 'number' ? '0.01' : undefined, // Default step for number inputs
  min,
  max,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(value ? value.length : 0);
  
  useEffect(() => {
    setCharCount(value ? value.length : 0);
  }, [value]);
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    
    // Format decimal numbers when losing focus (for better display)
    if (type === 'number' && value !== '' && value !== null) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        // Create synthetic event with formatted value
        const formattedValue = numValue.toFixed(2);
        const syntheticEvent = {
          target: {
            name,
            value: formattedValue,
            type: 'number'
          }
        };
        onChange(syntheticEvent);
      }
    }
  };
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };
  
  return (
    <div className={`${styles.form_group} ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className={`${styles.form_label} ${required ? styles.required : ''}`}
        >
          {label}
        </label>
      )}
      
      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        autoFocus={autoFocus}
        step={step}
        min={min}
        max={max}
        className={`${styles.form_input} ${error ? styles.error : ''}`}
      />
      
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

export default TextInput;