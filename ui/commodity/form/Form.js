"use client"
import TextInput from '@/ui/inputs/textInput/TextInput'
import FormActions from '@/ui/formActions/FormActions'
import { commodityInitialState } from '@/utils/IntialState'
import { handleFormSubmit, deleteRecord, validateForm } from '@/lib/formPagesHelperFunctions'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './form.module.css'
import Dropdown from '@/ui/inputs/dropdown/Dropdown'
import { toast } from 'react-toastify'

const Form = ({id, company, entity_code, partner_codes, fetchedData}) => {
    const router = useRouter();
    const endpoint = 'commodity';
    // Form data and state
    const [data, setData] = useState(fetchedData?fetchedData:{...commodityInitialState, company: company, entity_code: entity_code});
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(data)) {
            setErrors({
                ...errors,
                form: 'Please fill all the required fields'
            });
            return;
        }
        
        setIsSubmitting(true);
        try {
            await handleFormSubmit(endpoint, id, data, true);
            toast.success(id === 'create' ? 'Commodity created successfully!' : 'Commodity updated successfully!');
            router.push(`/${endpoint}`);
        } catch (error) {
            toast.error(error.message || 'An error occurred');
            setErrors({ submit: error.message });
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
                toast.success('Commodity deleted successfully!');
                router.push(`/${endpoint}`);
            } catch (error) {
                toast.error(error.message || 'An error occurred while deleting');
                setErrors({ submit: error.message });
            } finally {
                setIsDeleting(false);
            }
        }
    };
    
    // Handle form cancellation
    const handleCancel = () => {
        router.push(`/${endpoint}`);
    };
    
    const handleDropdownChange = (name, value) => {
        setData({ ...data, [name]: value });
        
        // Clear field-specific error when user makes changes
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
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
                    <Dropdown
                        label="Partner Code"
                        options={partner_codes?.data || []}
                        value={data.partner_code}
                        onChange={(value) => handleDropdownChange('partner_code', value)}
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
                
                {/* Form Actions */}
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
            </form>
        </div>
    );
};

export default Form;