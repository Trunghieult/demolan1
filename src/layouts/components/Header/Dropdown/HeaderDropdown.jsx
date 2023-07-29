// HeaderDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderDropdown.module.scss";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
const cx = classNames.bind(styles);

const HeaderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { info } = useSelector((state) => state.auth);
  const { size } = useSelector((state) => state.general);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isSmallSize = size.width <= 576;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={cx("dropdown-container")}>
      <div ref={dropdownRef} className={cx("nav-user")} onClick={toggleDropdown}>
        <Avatar src={info?.avatar?.path} size="small" alt="" className={cx("avatar")} />
        {!isSmallSize && (
          <>
            <div className={cx("user-fullname")}>
              <li>{info?.username}</li>
            </div>
            <CaretDownOutlined className={cx("dropdown-icon")} />
          </>
        )}
      </div>
      {isOpen && (
        <div className={cx("dropdown-menu")}>
          {/* Dropdown menu content goes here */}
          <ul>
            <li>
              <NavLink to="/profile">See Profile</NavLink>
            </li>

            <li>
              <NavLink to="/setting">Setting</NavLink>
            </li>

            <div className={cx("dropdown-menu-line")}></div>

            <li onClick={handleLogout}>
              <NavLink to="/login">Log Out</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
