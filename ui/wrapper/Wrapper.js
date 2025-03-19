"use client";
import React, { useState } from 'react';
import FiltersAndActions from '../filtersAndActions/FiltersAndActions';
import Table from '../table/Table';
import { useRouter, usePathname } from 'next/navigation';
import styles from './wrapper.module.css';
import { FaTrash } from 'react-icons/fa';

const Wrapper = ({ data, requiredFields, sortableFields, rowKey }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRows, setSelectedRows] = useState([]);
  console.log('data', data)
  // Get total records count from data
  const totalRecords = data?.data?.totalRecords || 0;
  
  // Handle row click to navigate to detail page
  const handleRowClick = (row) => {
    router.push(`${pathname}/${row[rowKey]}`);
  };
  
  // Handle selection change
  const handleSelectionChange = (selectedIds) => {
    setSelectedRows(selectedIds);
  };
  
  // Action buttons for each row
  const renderActions = (row) => (
    <div className={styles.actionButtons}>
      {/* <button 
        className={`${styles.actionButton} ${styles.editButton}`}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`${pathname}/${row.partner_code}`);
        }}
      >
        <FaEdit />
      </button> */}
      <button 
        className={`${styles.actionButton} ${styles.deleteButton}`}
        onClick={(e) => {
          e.stopPropagation();
          // Implement delete functionality
          console.log('Delete', row.partner_code);
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
  
  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for`, selectedRows);
    // Implement bulk actions
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.bulkActions}>
          {selectedRows.length > 0 && (
            <>
              <span className={styles.selectedCount}>{selectedRows.length} selected</span>
              <button 
                className={styles.bulkActionButton}
                onClick={() => handleBulkAction('export')}
              >
                Export
              </button>
              <button 
                className={`${styles.bulkActionButton} ${styles.bulkDeleteButton}`}
                onClick={() => handleBulkAction('delete')}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      <FiltersAndActions totalRecords={totalRecords} />
      
      <div className={styles.tableWrapper}>
        <Table 
          requiredFields={requiredFields}
          data={data?.data?.data || []}
          sortableFields={sortableFields}
          onRowClick={handleRowClick}
          selectable={true}
          onSelectionChange={handleSelectionChange}
          actions={renderActions}
          emptyMessage="No data found"
        />
      </div>
    </div>
  );
};

export default Wrapper;