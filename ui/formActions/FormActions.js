"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './formActions.module.css';
import { FaSave, FaTrash, FaTimes } from 'react-icons/fa';

const FormActions = ({
  isCreateMode,
  onSubmit,
  onDelete,
  onCancel,
  isSubmitting = false,
  isDeleting = false,
  showDelete = true,
  submitText = 'Save',
  deleteText = 'Delete',
  cancelText = 'Cancel'
}) => {
  const router = useRouter();
  
  // Default button labels based on mode
  const defaultSubmitLabel = isCreateMode ? 'Create' : 'Update';
  const finalSubmitLabel = submitText || defaultSubmitLabel;
  
  const handleCancel = () => {
    router.push('/');
  };
  
  return (
    <div className={styles.form_actions}>
      <div className={styles.left_actions}>
        <button
          type="button"
          className={styles.cancel_button}
          onClick={onCancel || handleCancel}
          disabled={isSubmitting || isDeleting}
        >
          <FaTimes className={styles.button_icon} />
          <span>{cancelText}</span>
        </button>
      </div>
      
      <div className={styles.right_actions}>
        {showDelete && !isCreateMode && onDelete && (
          <button
            type="button"
            className={styles.delete_button}
            onClick={onDelete}
            disabled={isSubmitting || isDeleting}
          >
            {isDeleting ? (
              <>
                <span className={styles.spinner}></span>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <FaTrash className={styles.button_icon} />
                <span>{deleteText}</span>
              </>
            )}
          </button>
        )}
        
        <button
          type="button"
          className={styles.submit_button}
          onClick={onSubmit}
          disabled={isSubmitting || isDeleting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FaSave className={styles.button_icon} />
              <span>{finalSubmitLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FormActions;