"use client"
import TextInput from '@/ui/inputs/textInput/TextInput'
import Checkbox from '@/ui/inputs/checkbox/Checkbox'
import FormActions from '@/ui/formActions/FormActions'
import {  warehouseInitialState } from '@/utils/IntialState'
import { handleFormSubmit, deleteRecord, validateForm } from '@/lib/formPagesHelperFunctions'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../commodity/form/form.module.css'

const Form = ({id, company, entity_code, fetchedData}) => {
    const router = useRouter();
    const endpoint = 'warehouse';
    
    // Form data and state
    const [data, setData] = useState(fetchedData?fetchedData:{...warehouseInitialState, company: company, entity_code: entity_code});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isCreateMode = id === 'create';
    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        
        // Clear field-specific error when user makes changes
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    
    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm(data, ['warehouse_code', 'warehouse_name', 'warehouse_address', 'warehouse_active'])) {
            setErrors({
                ...errors,
                form: 'Please fill all the required fields'
            });
            return;
        };
        
        setIsSubmitting(true);
        try {
            await handleFormSubmit(endpoint, id, data, true);
            router.push(`/${endpoint}`);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({
                ...errors,
                form: error.message || 'An error occurred while saving the data'
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Handle record deletion
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setIsDeleting(true);
            try {
                await deleteRecord(endpoint, id);
                router.push(`/${endpoint}`);
            } catch (error) {
                console.error('Error deleting record:', error);
                setErrors({
                    ...errors,
                    form: error.message || 'An error occurred while deleting the record'
                });
            } finally {
                setIsDeleting(false);
            }
        }
    };
    
    // Handle cancel action
    const handleCancel = () => {
        router.push(`/${endpoint}`);
    };
    
    return (
        <div className={styles.form}>
            <div className={styles.form_header}>
                <h1 className={styles.form_title}>
                    {isCreateMode ? 'Create New Warehouse' : 'Edit Warehouse'}
                </h1>
            </div>
            
            {errors.form && (
                <div className={styles.form_error}>
                    {errors.form}
                </div>
            )}
 
            <div className={styles.form_grid}>
                <TextInput
                    label="Company"
                    name="company"
                    value={data.company}
                    onChange={handleChange}
                    maxLength={20}
                    required
                    error={errors.company}
                    placeholder='Enter Company'
                    disabled
                />
                
                <TextInput
                    label="Entity Code"
                    name="entity_code"
                    value={data.entity_code}
                    onChange={handleChange}
                    maxLength={20}
                    required
                    error={errors.entity_code}
                    placeholder='Enter Entity Code'
                    disabled
                />
                
                <TextInput
                    label="Warehouse Order"
                    name="warehouse_order"
                    value={data.warehouse_order}
                    onChange={handleChange}
                    type="number"
                    step="0.01" 
                    placeholder='Enter Warehouse Order'
                    error={errors.warehouse_order}
                />
                
                <TextInput
                    label="Warehouse Code"
                    name="warehouse_code"
                    value={data.warehouse_code}
                    onChange={handleChange}
                    maxLength={20}
                    required
                    error={errors.warehouse_code}
                    placeholder='Enter Warehouse Code'
                />
                
                <TextInput
                    label="Warehouse Name"
                    name="warehouse_name"
                    value={data.warehouse_name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    error={errors.warehouse_name}
                    placeholder='Enter Warehouse Name'
                />
                
                <TextInput
                    label="Warehouse Address"
                    name="warehouse_address"
                    value={data.warehouse_address}
                    onChange={handleChange}
                    maxLength={300}
                    required
                    error={errors.warehouse_address}
                    placeholder='Enter Warehouse Address'
                />
                
                <TextInput
                    label="Warehouse Country"
                    name="warehouse_country"
                    value={data.warehouse_country}
                    onChange={handleChange}
                    maxLength={50}
                    error={errors.warehouse_country}
                    placeholder='Enter Warehouse Country'
                />
                
                <TextInput
                    label="Warehouse Postcode"
                    name="warehouse_postcode"
                    value={data.warehouse_postcode}
                    onChange={handleChange}
                    maxLength={10}
                    error={errors.warehouse_postcode}
                    placeholder='Enter Warehouse Postcode'
                />
                
                <TextInput
                    label="Warehouse Telephone"
                    name="warehouse_telephone"
                    value={data.warehouse_telephone}
                    onChange={handleChange}
                    maxLength={20}
                    error={errors.warehouse_telephone}
                    type='tel'
                    placeholder='Enter Warehouse Telephone'
                />
                
                <TextInput
                    label="Warehouse Contact"
                    name="warehouse_contact"
                    value={data.warehouse_contact}
                    onChange={handleChange}
                    maxLength={50}
                    error={errors.warehouse_contact}
                    placeholder='Enter Warehouse Contact'
                />
                
                <TextInput
                    label="Warehouse Email"
                    name="warehouse_email"
                    value={data.warehouse_email}
                    onChange={handleChange}
                    maxLength={200}
                    error={errors.warehouse_email}
                    type='email'
                    placeholder='Enter Warehouse Email'
                />
                
                <Checkbox
                    label="Warehouse Active"
                    name="warehouse_active"
                    checked={data.warehouse_active === 'Y'}
                    onChange={handleChange}
                    required
                    error={errors.warehouse_active}
                    placeholder='Enter Warehouse Active'
                    valueMapping={{ true: 'Y', false: 'N' }}
                />
            </div>
            
            <FormActions
                isCreateMode={isCreateMode}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
                isDeleting={isDeleting}
                submitText={isCreateMode ? 'Create' : 'Update'}
                showDelete={!isCreateMode}
            />
        </div>
    );
};

export default Form;