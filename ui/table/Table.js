"use client";
import React, { useState, useMemo, useCallback, useRef } from 'react';
import styles from './table.module.css';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const Table = ({ 
  requiredFields = [], 
  data = [],
  sortableFields = [],
  formatters = {},
  onRowClick,
  selectable = false,
  onSelectionChange,
  actions,
  emptyMessage = "No data available"
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const checkboxRef = useRef(null);

  // Format field name for display (e.g., 'partner_code' -> 'Partner Code')
  const formatFieldName = (field) => {
    return field
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format field value based on key name and value content
  const formatFieldValue = useCallback((key, value, row) => {
    // First check if there's a custom formatter provided
    if (formatters && formatters[key]) {
      return formatters[key](value, row);
    }
    
    // If key contains "active" and value is Y/N
    if (key.includes('active')) {
      return (
        <div className={styles.statusWrapper}>
          <span className={`${styles.statusDot} ${value === 'Y' ? styles.active : styles.inactive}`}></span>
          {value === 'Y' ? 'Active' : 'Inactive'}
        </div>
      );
    }
    
    // If key contains "status"
    if (key.includes('status')) {
      return (
        <span className={`${styles.statusBadge} ${styles[`status_${value?.toLowerCase()}`]}`}>
          {value || 'N/A'}
        </span>
      );
    }
    
    // If value is Y/N, convert to Yes/No
    if (value === 'Y') {
      return 'Yes';
    } else if (value === 'N') {
      return 'No';
    }
    
    // Default: return the original value
    return value;
  }, [formatters]);

  // Generate columns from required fields
  const columns = useMemo(() => {
    return requiredFields.map(field => ({
      key: field,
      label: formatFieldName(field),
      sortable: sortableFields.includes(field),
      render: (row) => formatFieldValue(field, row[field], row)
    }));
  }, [requiredFields, sortableFields, formatFieldValue]);

  // Handle sort when a column header is clicked
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply the current sort to the data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Handle null or undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Handle select/deselect all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.map(item => item.id || item.partner_code);
      setSelectedRows(allIds);
      onSelectionChange && onSelectionChange(allIds);
    } else {
      setSelectedRows([]);
      onSelectionChange && onSelectionChange([]);
    }
  };

  // Handle select/deselect a single row
  const handleSelectRow = (e, rowId) => {
    e.stopPropagation();
    let newSelected;
    
    if (selectedRows.includes(rowId)) {
      newSelected = selectedRows.filter(id => id !== rowId);
    } else {
      newSelected = [...selectedRows, rowId];
    }
    
    setSelectedRows(newSelected);
    onSelectionChange && onSelectionChange(newSelected);
  };

  // Get the unique identifier for a row (id or partner_code)
  const getRowId = (row) => {
    return row.id || row.partner_code;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {selectable && (
              <th className={styles.checkboxCell}>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={data.length > 0 && selectedRows.length === data.length}
                  ref={node => {
                    if (node) {
                      node.indeterminate = selectedRows.length > 0 && selectedRows.length < data.length;
                    }
                  }}
                />
              </th>
            )}
            
            {columns.map(column => (
              <th 
                key={column.key} 
                className={`${styles.headerCell} ${column.sortable ? styles.sortable : ''}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className={styles.headerContent}>
                  {column.label}
                  {column.sortable && (
                    <span className={styles.sortIcon}>
                      {sortConfig.key === column.key ? (
                        sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                      ) : (
                        <FaSort />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            
            {actions && <th className={styles.actionsCell}>Actions</th>}
          </tr>
        </thead>
        
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, index) => {
              const rowId = getRowId(row);
              return (
                <tr 
                  key={rowId || index} 
                  className={styles.tableRow}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {selectable && (
                    <td className={styles.checkboxCell}>
                      <input 
                        type="checkbox"
                        checked={selectedRows.includes(rowId)}
                        onChange={(e) => handleSelectRow(e, rowId)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  
                  {columns.map(column => (
                    <td key={column.key} className={styles.tableCell}>
                      {column.render ? column.render(row) : formatFieldValue(column.key, row[column.key], row)}
                    </td>
                  ))}
                  
                  {actions && (
                    <td className={styles.actionsCell}>
                      {typeof actions === 'function' ? actions(row) : actions}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr className={styles.emptyRow}>
              <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className={styles.emptyMessage}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;