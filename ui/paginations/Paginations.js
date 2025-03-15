"use client";
import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import styles from './paginations.module.css';

const Paginations = ({ 
  totalRecords = 0, 
  currentPage = 1, 
  recordsPerPage = 10,
  onPageChange,
  onRecordsPerPageChange
}) => {
  const [activePage, setActivePage] = useState(currentPage);
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  
  // Generate page numbers to display
  const getDisplayedPages = () => {
    const pageNumbers = [];
    let startPage, endPage;
    
    if (totalPages <= 3) {
      // Less than or equal to 3 total pages, show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than 3 total pages, calculate start and end
      if (activePage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (activePage + 1 >= totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = activePage - 1;
        endPage = activePage + 1;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // Update active page when current page prop changes
  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === activePage) return;
    
    setActivePage(page);
    onPageChange && onPageChange(page);
  };

  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    onRecordsPerPageChange && onRecordsPerPageChange(value);
  };

  // Memoize displayed pages to avoid recalculation on every render
  const displayedPages = getDisplayedPages();

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination_info}>
        <span>Total: {totalRecords} records</span>
        <div className={styles.records_selector}>
          <span>Show</span>
          <select 
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
            className={styles.size_select}
          >
            <option value="10">100</option>
            <option value="25">200</option>
            <option value="50">500</option>
            <option value="100">1000</option>
          </select>
          <span>per page</span>
        </div>
      </div>
      
      {totalPages > 0 && (
        <div className={styles.pagination_controls}>
          <button 
            className={`${styles.pagination_button} ${styles.pagination_nav}`}
            onClick={() => handlePageChange(1)}
            disabled={activePage === 1}
            aria-label="Go to first page"
          >
            <FaAngleDoubleLeft />
          </button>
          
          <button 
            className={`${styles.pagination_button} ${styles.pagination_nav}`}
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage === 1}
            aria-label="Go to previous page"
          >
            <FaAngleLeft />
          </button>
          
          {displayedPages.map(page => (
            <button
              key={page}
              className={`${styles.pagination_button} ${activePage === page ? styles.active : ''}`}
              onClick={() => handlePageChange(page)}
              aria-current={activePage === page ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
          
          <button 
            className={`${styles.pagination_button} ${styles.pagination_nav}`}
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage === totalPages}
            aria-label="Go to next page"
          >
            <FaAngleRight />
          </button>
          
          <button 
            className={`${styles.pagination_button} ${styles.pagination_nav}`}
            onClick={() => handlePageChange(totalPages)}
            disabled={activePage === totalPages}
            aria-label="Go to last page"
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Paginations;