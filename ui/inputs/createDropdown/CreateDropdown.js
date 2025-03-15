"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaPlus, FaFileUpload, FaEdit, FaTimes } from "react-icons/fa";
import styles from "./createDropdown.module.css";

const CreateDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleManualEntryClick = () => {
    router.push(`${pathname}/create`);
    setIsOpen(false);
  };

  const handleFileSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUploadChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is CSV
    if (!file.name.endsWith('.csv')) {
      setUploadError('Please select a CSV file');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    // Simulate file upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadSuccess(true);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setUploadSuccess(false);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      }
    }, 300);
  };

  const toggleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cancelUploadClick = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button className={styles.createButton} onClick={toggleDropdownClick}>
        <FaPlus /> Create
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <div 
            className={styles.dropdownItem} 
            onClick={handleManualEntryClick}
          >
            <FaEdit className={styles.icon} />
            <span>Manual Entry</span>
          </div>
          
          <div 
            className={styles.dropdownItem}
            onClick={handleFileSelectClick}
          >
            <FaFileUpload className={styles.icon} />
            <span>Import File</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUploadChange}
              accept=".csv"
            />
          </div>
          
          {isUploading && (
            <div className={styles.uploadProgress}>
              <div className={styles.progressContainer}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className={styles.progressText}>
                {uploadProgress}% Uploaded
                <button 
                  className={styles.cancelButton}
                  onClick={cancelUploadClick}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
          
          {uploadError && (
            <div className={styles.errorMessage}>
              {uploadError}
            </div>
          )}
          
          {uploadSuccess && (
            <div className={styles.successMessage}>
              File uploaded successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateDropdown;