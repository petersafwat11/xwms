import styles from '../ui/wrapper/wrapper.module.css';

// Export the formatters as objects instead of functions
export const partnerFormatters = {
  partner_active: (value) => (
    <div className={styles.statusWrapper}>
      <span className={`${styles.statusDot} ${value === 'Y' ? styles.active : styles.inactive}`}></span>
      {value === 'Y' ? 'Active' : 'Inactive'}
    </div>
  ),
  role_wms: (value) => value === 'Y' ? 'Yes' : 'No',
  role_lastmile: (value) => value === 'Y' ? 'Yes' : 'No',
  role_contractor: (value) => value === 'Y' ? 'Yes' : 'No',
  partner_status: (value) => (
    <span className={`${styles.statusBadge} ${styles[`status_${value?.toLowerCase()}`]}`}>
      {value || 'N/A'}
    </span>
  )
};
