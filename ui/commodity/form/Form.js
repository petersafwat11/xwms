"use client"
import TextInput from '@/ui/inputs/textInput/TextInput'
import FormActions from '@/ui/formActions/FormActions'
import { commodityInitialState } from '@/utils/IntialState'
import { determineFormMode, fetchRecordById, initializeFormData } from '@/lib/tablePagesHelperFunctions'
import { handleFormSubmit, deleteRecord, validateForm } from '@/lib/formPagesHelperFunctions'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './form.module.css'

const Form = ({id}) => {
    const router = useRouter();
    const endpoint = 'commodity';
    
    // Form data and state
    const [data, setData] = useState(commodityInitialState);
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
        if (!validateForm(data)) {
            setErrors({
                ...errors,
                form: 'Please fill all the required fields'
            });
            return;
        };
        
        setIsSubmitting(true);
        try {
            await handleFormSubmit(endpoint, id, data);
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
                    {isCreateMode ? 'Create New Commodity' : 'Edit Commodity'}
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
                    disabled
                />
                
                <TextInput
                    label="Partner Code"
                    name="partner_code"
                    value={data.partner_code}
                    onChange={handleChange}
                    maxLength={20}
                    required
                    error={errors.partner_code}
                />
                
                <TextInput
                    label="Commodity"
                    name="commodity"
                    value={data.commodity}
                    onChange={handleChange}
                    maxLength={30}
                    required
                    error={errors.commodity}
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