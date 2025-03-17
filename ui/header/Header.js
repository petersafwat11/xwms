"use client";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './header.module.css';
import { FaUser, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/login";
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const user = Cookies.get('user')&&JSON.parse(Cookies.get('user'));
    console.log("user",user);
    user && setUserName(user?.user_name || '');
  }, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format pathname for display
  const formatPathname = (path) => {
    if (path === "/") return "Dashboard";
    return path.split("/").map(segment => {
      if (!segment) return null;
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    }).filter(Boolean).join(" / ");
  };

  const handleLogout = async() => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/users/logout`);
      if (response.status === 200) {
        // Clear cookies
        Cookies.remove('user');
        Cookies.remove('jwt');
        // Redirect to login page
        router.push('/login');
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    isLogin ? null :
    <header className={styles.header}>
      <div className={styles.header_left}>
        {formatPathname(pathname)}
      </div>
      
      <div className={styles.header_right}>
        <div className={styles.user_dropdown} ref={dropdownRef}>
          <button className={styles.user_button} onClick={toggleDropdown}>
            <div className={styles.user_info}>
              <div className={styles.avatarContainer}>
                <FaUser className={styles.user_icon} />
              </div>
              <span className={styles.user_name}>{userName}</span>
            </div>
            <FaChevronDown className={`${styles.chevron} ${isDropdownOpen ? styles.chevron_up : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdown_menu}>
              <Link href="/profile" className={styles.dropdown_item}>
                <FaUser className={styles.dropdown_icon} />
                <span>Profile</span>
              </Link>
              <Link href="/settings" className={styles.dropdown_item}>
                <FaCog className={styles.dropdown_icon} />
                <span>Settings</span>
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
}