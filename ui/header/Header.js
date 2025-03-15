"use client";
import React, { useState } from 'react';
import styles from './header.module.css';
import { FaUser, FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

const Header = ({ 
//   leftContent,
  centerContent,
  userName = "John Doe",
  userAvatar
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log('Logging out');
    // Implement logout functionality
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        {pathname === "/" ? "Dashboard" : pathname}
        {/* {leftContent} */}
      </div>
      
      {/* <div className={styles.header_center}>
        {centerContent}
      </div> */}
      
      <div className={styles.header_right}>
        <div className={styles.user_dropdown}>
          <button 
            className={styles.user_button} 
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <div className={styles.user_info}>
              {userAvatar ? (
                <div className={styles.avatarContainer}>
                  <Image 
                    src={userAvatar} 
                    alt={userName} 
                    width={32} 
                    height={32}
                    className={styles.user_avatar} 
                  />
                </div>
              ) : (
                <FaUserCircle className={styles.user_icon} />
              )}
              <span className={styles.user_name}>{userName}</span>
              <FaChevronDown className={`${styles.chevron} ${isDropdownOpen ? styles.chevron_up : ''}`} />
            </div>
          </button>
          
          {isDropdownOpen && (
            <div 
              className={styles.dropdown_menu}
              role="menu"
            >
              <Link href="/profile" className={styles.dropdown_item}>
                <FaUser className={styles.dropdown_icon} />
                <span>Profile</span>
              </Link>
              <button 
                className={`${styles.dropdown_item} ${styles.logout_button}`} 
                onClick={handleLogout}
              >
                <FaSignOutAlt className={styles.dropdown_icon} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;