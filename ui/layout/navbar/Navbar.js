"use client";
import React, { useState } from "react";
import classes from "./navbar.module.css";
import Link from "next/link";
import navDefault from "./default";
import {
  FaHome,
  FaBox,
  FaCog,
  FaCreditCard,
  FaChevronRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaSliders, FaClipboardList, FaQrcode } from "react-icons/fa6";

const getIcon = (title) => {
  switch (title) {
    case "Dashboard":
      return <FaHome className={classes.icon} />;
    case "Scanning":
      return <FaQrcode className={classes.icon} />;
    case "Inventory":
      return <FaBox className={classes.icon} />;
    case "Reports":
      return <FaClipboardList className={classes.icon} />;
    case "Settings":
      return <FaCog className={classes.icon} />;
    case "Config":
      return <FaSliders className={classes.icon} />;
    case "Billing":
      return <FaCreditCard className={classes.icon} />;
    default:
      return null;
  }
};

const Navbar = () => {
  const [navbar, setNavbar] = useState(navDefault);

  const toggleNavbar = () => {
    setNavbar({ ...navbar, expanded: !navbar.expanded });
  };

  const expandNavbar = () => {
    if (!navbar.expanded) {
      setNavbar({ ...navbar, expanded: true });
    }
  };

  const toggleSubmenu = (index) => {
    const updatedNavbar = { ...navbar };
    updatedNavbar.items[index].active = !updatedNavbar.items[index].active;
    setNavbar({ ...updatedNavbar, expanded: true });
  };

  const handleNavItemClick = (item, index) => {
    if (item.path===undefined && item?.children?.length > 0) {
      toggleSubmenu(index);
    } else {
      expandNavbar();
    }
  };

  return (
    <div
      className={`${classes.navbar} ${
        navbar.expanded ? classes.expanded : classes.collapsed
      }`}
    >
      <div className={classes.navbar_header}>
        {navbar.expanded ? (
          <div className={classes.logo_container}>
            <h2 className={classes.logo}>XWMS</h2>
            <button className={classes.toggle_btn} onClick={toggleNavbar}>
              <FaTimes />
            </button>
          </div>
        ) : (
          <button className={classes.toggle_btn} onClick={toggleNavbar}>
            <FaBars />
          </button>
        )}
      </div>
      <div className={classes.nav_items}>
        {navbar.items.map((item, index) => (
          <div key={item.title} className={classes.nav_item}>
            <div className={classes.nav_item_header}>
              {item.path ? (
                <Link
                  href={item.path}
                  className={classes.nav_link}
                  onClick={() => expandNavbar()}
                >
                  {getIcon(item.title)}
                  {navbar.expanded && (
                    <span className={classes.nav_title}>{item.title}</span>
                  )}
                </Link>
              ) : (
                <div
                  className={classes.nav_link}
                  onClick={() => handleNavItemClick(item, index)}
                >
                  {getIcon(item.title)}
                  {navbar.expanded && (
                    <>
                      <span className={classes.nav_title}>{item.title}</span>
                      <FaChevronRight
                        className={`${classes.arrow} ${
                          item.active ? classes.arrow_active : ""
                        }`}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
            {item.children && item.active && navbar.expanded && (
              <div className={classes.nav_sub_items}>
                {item.children.map((subItem) => (
                  <Link
                    key={subItem.title}
                    href={subItem.path}
                    className={classes.nav_sub_link}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
