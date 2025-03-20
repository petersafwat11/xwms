"use client"
import TextInput from '@/ui/inputs/textInput/TextInput'
import Checkbox from '@/ui/inputs/checkbox/Checkbox'
import FormActions from '@/ui/formActions/FormActions'
import {  stockTakeInitialState } from '@/utils/IntialState'
import { handleFormSubmit, deleteRecord, validateForm } from '@/lib/formPagesHelperFunctions'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../commodity/form/form.module.css'
import { toast } from 'react-toastify'
import { stockTakeRequiredDbFields } from '@/utils/requireddbFields'
const Form = ({id, company, entity_code, fetchedData}) => {
    const router = useRouter();
    const endpoint = 'stock-take';
    console.log("fetchedData", fetchedData);
    // Form data and state
    const [data, setData] = useState(fetchedData?fetchedData:{...stockTakeInitialState, company: company, entity_code: entity_code});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isCreateMode = id === 'create';
    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value.toUpperCase() });
        
        // Clear field-specific error when user makes changes
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    
    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm(data, stockTakeRequiredDbFields)) {
            setErrors({
                ...errors,
                form: 'Please fill all the required fields'
            });
            return;
        };
        
        setIsSubmitting(true);
        try {
            await handleFormSubmit(endpoint, id, data, true);
            toast.success(id === 'create' ? 'Stock take created successfully!' : 'Stock take updated successfully!');
            router.push(`/${endpoint}`);
        } catch (error) {
            toast.error(error.message || 'An error occurred');
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
                toast.success('Stock take deleted successfully!');
                router.push(`/${endpoint}`);
            } catch (error) {
                toast.error(error.message || 'An error occurred');
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
                    {isCreateMode ? 'Create New Stock Take' : 'Edit Stock Take'}
                </h1>
            </div>
            
            {errors.form && (
                <div className={styles.form_error}>
                    {errors.form}
                </div>
            )}
 
            <div className={styles.form_grid}>
                
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