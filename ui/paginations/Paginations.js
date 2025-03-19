"use client";
import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import styles from './paginations.module.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const Paginations = ({ 
  totalRecords = 0, 
  currentPage = 1, 
  recordsPerPage = 10
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize active page from URL params or default
  const [activePage, setActivePage] = useState(
    parseInt(searchParams.get('page') || currentPage, 10)
  );
  
  // Initialize records per page from URL params or default
  const [activeRecordsPerPage, setActiveRecordsPerPage] = useState(
    parseInt(searchParams.get('rows') || recordsPerPage, 10)
  );
  
  const totalPages = Math.ceil(totalRecords / activeRecordsPerPage);
  
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

  // Update URL with new parameters
  const updateUrlParams = (page, rows) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    params.set('rows', rows);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Update active page when URL changes
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || currentPage, 10);
    const rows = parseInt(searchParams.get('rows') || recordsPerPage, 10);
    
    setActivePage(page);
    setActiveRecordsPerPage(rows);
  }, [searchParams, currentPage, recordsPerPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === activePage) return;
    
    setActivePage(page);
    updateUrlParams(page, activeRecordsPerPage);
  };

  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setActiveRecordsPerPage(value);
    // Reset to page 1 when changing records per page
    updateUrlParams(1, value);
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
            value={activeRecordsPerPage}
            onChange={handleRecordsPerPageChange}
            className={styles.size_select}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
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