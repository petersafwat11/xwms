"use client"
import TextInput from '@/ui/inputs/textInput/TextInput'
import Checkbox from '@/ui/inputs/checkbox/Checkbox'
import Dropdown from '@/ui/inputs/dropdown/Dropdown'
import FormActions from '@/ui/formActions/FormActions'
import { customerIntialState } from '@/utils/IntialState'
import { handleFormSubmit, deleteRecord, validateForm } from '@/lib/formPagesHelperFunctions'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './form.module.css'
import { toast } from 'react-toastify';

const Form = ({id, company, entity_code, fetchedData}) => {
    const router = useRouter();
    const endpoint = 'customer';
    console.log('fetchedData', fetchedData)
    // Form data and state
    const [data, setData] = useState(fetchedData?fetchedData:{...customerIntialState, company: company, entity_code: entity_code});
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
    
    // Handle dropdown changes
    const handleDropdownChange = (name, value) => {
        setData({ ...data, [name]: value });
        
        // Clear field-specific error when user makes changes
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    
    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm(data, ['partner_code', 'partner_active', 'partner_name', 'partner_ref', 'partner_address1', 'partner_sales_person', 'partner_class', 'partner_status', 'partner_type', 'partner_term', 'choose_sel','partner_source', 'role_wms', 'role_lastmile', 'role_contractor'])) {
            setErrors({
                ...errors,
                form: 'Please fill all the required fields'
            });
            return;
        };
        
        setIsSubmitting(true);
        try {
            await handleFormSubmit(endpoint, id, data);
            toast.success(id === 'create' ? 'Customer created successfully!' : 'Customer updated successfully!');
            router.push(`/${endpoint}`);
        } catch (error) {
            toast.error(error.message || 'An error occurred while saving the data');
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
                toast.success('Customer deleted successfully!');
                router.push(`/${endpoint}`);
            } catch (error) {
                toast.error(error.message || 'An error occurred while deleting the record');
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
    
    // Options for dropdown fields
    const partnerTypeOptions = ['C', 'S', 'A', 'O']; // Customer, Supplier, Agent, Other
    const partnerClassOptions = ['A', 'B', 'C', 'D'];
    const partnerStatusOptions = ['A', 'I', 'N']; // Active, Inactive, New
    const countryOptions = ['SG', 'MY', 'TH', 'ID', 'VN', 'PH', 'MM', 'KH', 'LA', 'BN', 'CN', 'HK', 'TW', 'JP', 'KR', 'IN', 'AU', 'NZ', 'US', 'GB', 'DE', 'FR', 'IT', 'ES'];
    const currencyOptions = ['USD', 'SGD', 'MYR', 'THB', 'IDR', 'VND', 'PHP', 'MMK', 'KHR', 'LAK', 'BND', 'CNY', 'HKD', 'TWD', 'JPY', 'KRW', 'INR', 'AUD', 'NZD', 'EUR', 'GBP'];
    const salesTypeOptions = ['R', 'W']; // Retail, Wholesale
    const partnerGroupOptions = ['A', 'B', 'C', 'D'];
    const partnerCategoryOptions = ['STD', 'VIP', 'PRE'];
    
    return (
        <div className={styles.form}>
            <div className={styles.form_header}>
                <h1 className={styles.form_title}>
                    {isCreateMode ? 'Create New Customer' : 'Edit Customer'}
                </h1>
            </div>
            
            {errors.form && (
                <div className={styles.form_error}>
                    {errors.form}
                </div>
            )}
 
            <div className={styles.form_grid}>
                <div>
                <TextInput
                        label="Company"
                        name="company"
                        value={data.company}
                        onChange={handleChange}
                        required
                        maxLength={20}
                        error={errors.company}
                        disabled
                    />
                    <TextInput
                        label="Entity Code"
                        name="entity_code"
                        value={data.entity_code}
                        onChange={handleChange}
                        required
                        maxLength={20}
                        error={errors.entity_code}
                        disabled
                    />
                </div>
                {/* Basic Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Basic Information</h2>
                    
                    <TextInput
                        label="Partner Code"
                        name="partner_code"
                        value={data.partner_code}
                        onChange={handleChange}
                        required
                        maxLength={20}
                        error={errors.partner_code}
                    />
                    <div className={styles.checkbox_wrapper}>
                        <Checkbox
                            label="Active"
                            name="partner_active"
                            checked={data.partner_active}
                            onChange={handleChange}
                            required
                            valueMapping={{ true: 'Y', false: 'N' }}
                    />
                    </div>
                    <TextInput
                        label="Reference"
                        name="partner_ref"
                        value={data.partner_ref}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        error={errors.partner_ref}
                    />
                    
                    <TextInput
                        label="Name"
                        name="partner_name"
                        value={data.partner_name}
                        onChange={handleChange}
                        required
                        maxLength={150}
                        error={errors.partner_name}
                    />
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Partner Type"
                            options={partnerTypeOptions}
                            value={data.partner_type}
                            onChange={(value) => handleDropdownChange('partner_type', value)}
                            required
                            error={errors.partner_type}
                        />
                    </div>
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Partner Class"
                            options={partnerClassOptions}
                            value={data.partner_class}
                            onChange={(value) => handleDropdownChange('partner_class', value)}
                            required
                            error={errors.partner_class}
                        />
                    </div>
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Status"
                            options={partnerStatusOptions}
                            value={data.partner_status}
                            onChange={(value) => handleDropdownChange('partner_status', value)}
                            required
                            error={errors.partner_status}
                        />
                    </div>
                    
                    <TextInput
                        label="Term (Days)"
                        name="partner_term"
                        value={data.partner_term}
                        onChange={handleChange}
                        type="text"
                        required
                        // min={0}
                        error={errors.partner_term}
                    />
                    
                    <div className={styles.checkbox_wrapper}>
                        <Checkbox
                            label="Choose Selection"
                            name="choose_sel"
                            checked={data.choose_sel}
                            onChange={handleChange}
                            required
                            valueMapping={{ true: 'Y', false: 'N' }}
                        />
                    </div>
                    
                    <TextInput
                        label="Source"
                        name="partner_source"
                        value={data.partner_source}
                        onChange={handleChange}
                        required
                        maxLength={30}
                        error={errors.partner_source}
                    />
                </div>
                
                {/* Address Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Address Information</h2>
                    
                    <TextInput
                        label="Address Line 1"
                        name="partner_address1"
                        value={data.partner_address1}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        error={errors.partner_address1}
                    />
                    
                    <TextInput
                        label="Address Line 2"
                        name="partner_address2"
                        value={data.partner_address2}
                        onChange={handleChange}
                        maxLength={100}
                    />
                    
                    <TextInput
                        label="Address Line 3"
                        name="partner_address3"
                        value={data.partner_address3}
                        onChange={handleChange}
                        maxLength={100}
                    />
                    
                    <TextInput
                        label="City"
                        name="partner_city"
                        value={data.partner_city}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="State/Province"
                        name="partner_state"
                        value={data.partner_state}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="Country"
                        name="partner_country"
                        value={data.partner_country}
                        onChange={handleChange}
                        maxLength={100}
                    />
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Country ISO"
                            options={countryOptions}
                            value={data.partner_country_iso}
                            onChange={(value) => handleDropdownChange('partner_country_iso', value)}
                        />
                    </div>
                    
                    <TextInput
                        label="Postal Code"
                        name="partner_postcode"
                        value={data.partner_postcode}
                        onChange={handleChange}
                        maxLength={10}
                    />
                </div>
                
                {/* Contact Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Contact Information</h2>
                    
                    <TextInput
                        label="Telephone 1"
                        name="partner_tel_1"
                        value={data.partner_tel_1}
                        onChange={handleChange}
                        maxLength={30}
                    />
                    
                    <TextInput
                        label="Telephone 2"
                        name="partner_tel_2"
                        value={data.partner_tel_2}
                        onChange={handleChange}
                        maxLength={30}
                    />
                    
                    <TextInput
                        label="Telephone 3"
                        name="partner_tel_3"
                        value={data.partner_tel_3}
                        onChange={handleChange}
                        maxLength={30}
                    />
                    
                    <TextInput
                        label="Fax"
                        name="partner_fax_1"
                        value={data.partner_fax_1}
                        onChange={handleChange}
                        maxLength={30}
                    />
                    
                    <TextInput
                        label="Telex"
                        name="partner_telex"
                        value={data.partner_telex}
                        onChange={handleChange}
                        maxLength={30}
                    />
                    
                    <TextInput
                        label="Contact Person 1"
                        name="partner_contact_1"
                        value={data.partner_contact_1}
                        onChange={handleChange}
                        maxLength={50}
                    />
                    
                    <TextInput
                        label="Contact Person 2"
                        name="partner_contact_2"
                        value={data.partner_contact_2}
                        onChange={handleChange}
                        maxLength={50}
                    />
                    
                    <TextInput
                        label="Sales Person"
                        name="partner_sales_person"
                        value={data.partner_sales_person}
                        onChange={handleChange}
                        required
                        maxLength={10}
                        error={errors.partner_sales_person}
                    />
                    
                    <TextInput
                        label="CS Person"
                        name="partner_cs_person"
                        value={data.partner_cs_person}
                        onChange={handleChange}
                        maxLength={10}
                    />
                    
                    <TextInput
                        label="Email"
                        name="partner_email_1"
                        value={data.partner_email_1}
                        onChange={handleChange}
                        type="email"
                        maxLength={50}
                    />
                    
                    <TextInput
                        label="Website"
                        name="partner_website"
                        value={data.partner_website}
                        onChange={handleChange}
                        maxLength={50}
                    />
                </div>
                
                {/* Business Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Business Information</h2>
                    
                    <TextInput
                        label="GST Registration"
                        name="partner_gst_reg"
                        value={data.partner_gst_reg}
                        onChange={handleChange}
                        maxLength={30}
                    />
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Partner Group"
                            options={partnerGroupOptions}
                            value={data.partner_group}
                            onChange={(value) => handleDropdownChange('partner_group', value)}
                        />
                    </div>
                    
                    <TextInput
                        label="Terms"
                        name="partner_terms"
                        value={data.partner_terms}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Currency"
                            options={currencyOptions}
                            value={data.partner_currency}
                            onChange={(value) => handleDropdownChange('partner_currency', value)}
                        />
                    </div>
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Sales Type"
                            options={salesTypeOptions}
                            value={data.sales_type}
                            onChange={(value) => handleDropdownChange('sales_type', value)}
                        />
                    </div>
                    
                    <div className={styles.dropdown_wrapper}>
                        <Dropdown
                            label="Partner Category"
                            options={partnerCategoryOptions}
                            value={data.partner_category}
                            onChange={(value) => handleDropdownChange('partner_category', value)}
                        />
                    </div>
                    
                    <TextInput
                        label="ISO Code"
                        name="partner_iso_code"
                        value={data.partner_iso_code}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="IATA Code"
                        name="partner_iata_code"
                        value={data.partner_iata_code}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="IATA Account"
                        name="partner_iata_account"
                        value={data.partner_iata_account}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="SCAC Code"
                        name="partner_scac_code"
                        value={data.partner_scac_code}
                        onChange={handleChange}
                        maxLength={20}
                    />
                </div>
                
                {/* Social Media Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Social Media</h2>
                    
                    <TextInput
                        label="WhatsApp"
                        name="partner_whatsapp"
                        value={data.partner_whatsapp}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="WeChat"
                        name="partner_wechat"
                        value={data.partner_wechat}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="Facebook"
                        name="partner_facebook"
                        value={data.partner_facebook}
                        onChange={handleChange}
                        maxLength={200}
                    />
                    
                    <TextInput
                        label="Line ID"
                        name="partner_line_id"
                        value={data.partner_line_id}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="Instagram"
                        name="partner_instagram"
                        value={data.partner_instagram}
                        onChange={handleChange}
                        maxLength={100}
                    />
                </div>
                
                {/* Network Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Network Information</h2>
                    
                    <TextInput
                        label="WCA No."
                        name="wca_no"
                        value={data.wca_no}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="Lognet No."
                        name="lognet_no"
                        value={data.lognet_no}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="GAA No."
                        name="gaa_no"
                        value={data.gaa_no}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="EGLN No."
                        name="egln_no"
                        value={data.egln_no}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="UEN"
                        name="partner_uen"
                        value={data.partner_uen}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="IEC Code"
                        name="partner_iec_code"
                        value={data.partner_iec_code}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="USCI Code"
                        name="partner_usci_code"
                        value={data.partner_usci_code}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="RACA Code"
                        name="partner_raca_code"
                        value={data.partner_raca_code}
                        onChange={handleChange}
                        maxLength={20}
                    />
                </div>
                
                {/* API Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>API Information</h2>
                    
                    <TextInput
                        label="API User"
                        name="api_user"
                        value={data.api_user}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="API Password"
                        name="api_password"
                        value={data.api_password}
                        onChange={handleChange}
                        type="password"
                        maxLength={20}
                    />
                    
                    <TextInput
                        label="API Key"
                        name="api_key"
                        value={data.api_key}
                        onChange={handleChange}
                        maxLength={100}
                    />
                    
                    <TextInput
                        label="Peppol ID"
                        name="peppol_id"
                        value={data.peppol_id}
                        onChange={handleChange}
                        maxLength={30}
                    />
                </div>
                
                {/* Role Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Role Information</h2>
                    
                    <div className={styles.checkbox_wrapper}>
                        <Checkbox
                            label="WMS Role"
                            name="role_wms"
                            checked={data.role_wms}
                            onChange={handleChange}
                            required
                            valueMapping={{ true: 'Y', false: 'N' }}
                        />
                    </div>
                    
                    <div className={styles.checkbox_wrapper}>
                        <Checkbox
                            label="Last Mile Role"
                            name="role_lastmile"
                            checked={data.role_lastmile}
                            onChange={handleChange}
                            required
                            valueMapping={{ true: 'Y', false: 'N' }}
                        />
                    </div>
                    
                    <div className={styles.checkbox_wrapper}>
                        <Checkbox
                        label="Contractor Role"
                        name="role_contractor"
                        checked={data.role_contractor}
                        onChange={handleChange}
                        required
                        valueMapping={{ true: 'Y', false: 'N' }}
                        />
                    </div>
                    
                    <TextInput
                        label="Partner Roles"
                        name="partner_roles"
                        value={data.partner_roles}
                        onChange={handleChange}
                        maxLength={200}
                    />
                </div>
                
                {/* Other Information Section */}
                <div className={styles.form_section}>
                    <h2 className={styles.section_title}>Other Information</h2>
                    
                    <TextInput
                        label="Partner Logo"
                        name="partner_logo"
                        value={data.partner_logo}
                        onChange={handleChange}
                        maxLength={200}
                    />
                    
                    <TextInput
                        label="Partner Label File"
                        name="partner_label_file"
                        value={data.partner_label_file}
                        onChange={handleChange}
                        maxLength={300}
                    />
                    
                    <TextInput
                        label="Partner Network"
                        name="partner_network"
                        value={data.partner_network}
                        onChange={handleChange}
                        maxLength={200}
                    />
                </div>
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