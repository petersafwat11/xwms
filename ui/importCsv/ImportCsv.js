"use client";
import React, { useState, useRef } from 'react';
import styles from './importCsv.module.css';
import Dropdown from '@/ui/inputs/dropdown/Dropdown';
import { toast } from 'react-toastify';

const ImportCsv = ({ 
    title, 
    orderRefOptions, 
    requiredKeys, 
    allKeys, 
    onImport 
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('Chosen File Name');
    const [orderRef, setOrderRef] = useState('');
    const [importedData, setImportedData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.csv')) {
            toast.error('Please select a CSV file');
            return;
        }

        setSelectedFile(file);
        setFileName(file.name);
    };

    const validateCSVData = (data) => {
        // Check row count
        if (data.length > 1000) {
            throw new Error('CSV file cannot contain more than 1000 records');
        }

        // Check for required keys
        const headers = Object.keys(data[0]);
        const missingKeys = requiredKeys.filter(key => !headers.includes(key));
        if (missingKeys.length > 0) {
            throw new Error(`Missing required columns: ${missingKeys.join(', ')}`);
        }

        // Check for extra or invalid keys
        const invalidKeys = headers.filter(key => !allKeys.includes(key));
        if (invalidKeys.length > 0) {
            throw new Error(`Invalid columns found: ${invalidKeys.join(', ')}`);
        }

        return true;
    };

    const handleImport = async () => {
        if (!selectedFile) {
            toast.error('Please select a file first');
            return;
        }

        if (!orderRef) {
            toast.error('Please select an order reference');
            return;
        }

        const confirmed = window.confirm('Are you sure you want to import this file?');
        if (!confirmed) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const csvContent = event.target.result;
                const rows = csvContent.split('\\n');
                const headers = rows[0].split(',').map(header => header.trim());
                
                const parsedData = rows.slice(1).filter(row => row.trim()).map(row => {
                    const values = row.split(',');
                    return headers.reduce((obj, header, index) => {
                        obj[header] = values[index]?.trim() || '';
                        return obj;
                    }, {});
                });

                validateCSVData(parsedData);
                setImportedData(parsedData);
                setTotalRecords(parsedData.length);
            } catch (error) {
                toast.error(error.message);
            }
        };

        reader.readAsText(selectedFile);
    };

    const handleProcess = async () => {
        if (importedData.length === 0) {
            toast.error('No data to process');
            return;
        }

        try {
            const dataToProcess = selectedRows.length > 0 
                ? importedData.filter((_, index) => selectedRows.includes(index))
                : importedData;

            await onImport(dataToProcess, orderRef);
            toast.success('Data processed successfully');
            handleReset();
        } catch (error) {
            toast.error(error.message || 'Error processing data');
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setFileName('Chosen File Name');
        setOrderRef('');
        setImportedData([]);
        setSelectedRows([]);
        setTotalRecords(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRowSelect = (index) => {
        setSelectedRows(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            return [...prev, index];
        });
    };

    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            toast.error('Please select rows to delete');
            return;
        }

        setImportedData(prev => 
            prev.filter((_, index) => !selectedRows.includes(index))
        );
        setSelectedRows([]);
        setTotalRecords(prev => prev - selectedRows.length);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                </div>

                <div className={styles.controls}>
                    <Dropdown
                        options={orderRefOptions}
                        value={orderRef}
                        onChange={(value) => setOrderRef(value)}
                        placeholder="Order Ref DD"
                    />
                    
                    <div className={styles.fileInput}>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileSelect}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className={styles.fileButton}
                        >
                            {fileName}
                        </button>
                    </div>

                    <button 
                        onClick={handleImport}
                        className={styles.importButton}
                    >
                        Import
                    </button>

                    <div className={styles.recordCount}>
                        Total Number of Records: {totalRecords}
                    </div>
                </div>

                {importedData.length > 0 && (
                    <div className={styles.tableContainer}>
                        <h3>Imported Records</h3>
                        <div className={styles.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        {Object.keys(importedData[0]).map(key => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {importedData.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(index)}
                                                    onChange={() => handleRowSelect(index)}
                                                />
                                            </td>
                                            {Object.values(row).map((value, i) => (
                                                <td key={i}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className={styles.actions}>
                    <button 
                        onClick={handleDeleteSelected}
                        className={styles.deleteButton}
                        disabled={selectedRows.length === 0}
                    >
                        Delete Selected
                    </button>
                    <button 
                        onClick={handleReset}
                        className={styles.resetButton}
                    >
                        Reset All
                    </button>
                    <button 
                        onClick={handleProcess}
                        className={styles.processButton}
                        disabled={importedData.length === 0}
                    >
                        Process
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImportCsv;