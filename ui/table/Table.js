"use client";
import React, { useState } from 'react';
import styles from './table.module.css';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const Table = ({ 
  columns = [], 
  data = [], 
  onRowClick,
  selectable = false,
  onSelectionChange,
  actions,
  emptyMessage = "No data available"
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle sort when a column header is clicked
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply the current sort to the data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Handle select/deselect all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.map(item => item.id);
      setSelectedRows(allIds);
      onSelectionChange && onSelectionChange(allIds);
    } else {
      setSelectedRows([]);
      onSelectionChange && onSelectionChange([]);
    }
  };

  // Handle select/deselect a single row
  const handleSelectRow = (e, id) => {
    e.stopPropagation();
    let newSelected;
    
    if (selectedRows.includes(id)) {
      newSelected = selectedRows.filter(rowId => rowId !== id);
    } else {
      newSelected = [...selectedRows, id];
    }
    
    setSelectedRows(newSelected);
    onSelectionChange && onSelectionChange(newSelected);
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
                  indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                />
              </th>
            )}
            
            {columns.map(column => (
              <th 
                key={column.key} 
                className={`${styles.headerCell} ${column.sortable ? styles.sortable : ''}`}
                onClick={() => column.sortable && handleSort(column.key)}
                style={{ width: column.width || 'auto' }}
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
            sortedData.map((row, index) => (
              <tr 
                key={row.id || index} 
                className={styles.tableRow}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {selectable && (
                  <td className={styles.checkboxCell}>
                    <input 
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => handleSelectRow(e, row.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                
                {columns.map(column => (
                  <td key={column.key} className={styles.tableCell}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                
                {actions && (
                  <td className={styles.actionsCell}>
                    {typeof actions === 'function' ? actions(row) : actions}
                  </td>
                )}
              </tr>
            ))
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