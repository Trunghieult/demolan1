import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { Dropdown } from "antd";
import { SendOutlined, ClockCircleOutlined, UserDeleteOutlined, TeamOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFriend, addFriend } from "~/store/slices/friendSlice";
import { getInfoUser } from "~/store/slices/authSlice";
const cx = classNames.bind(styles);

const Navbar = ({ userId }) => {
  const { friendStatus, _id } = useSelector((state) => state.auth.otherUserInfo);
  const { status } = useSelector((state) => state.friend);
  const dispatch = useDispatch();

  let button, list;
  switch (friendStatus) {
    case "accepted":
      button = (
        <>
          <TeamOutlined /> Friend
        </>
      );
      list = [
        {
          key: "remove",
          label: "Remove",
          icon: <UserDeleteOutlined />,
        },
      ];
      break;

    case "pending":
      button = (
        <>
          <ClockCircleOutlined /> Pending
        </>
      );
      list = [
        {
          key: "remove",
          label: "Remove",
          icon: <UserDeleteOutlined />,
        },
      ];
      break;

    default:
      button = (
        <>
          <SendOutlined /> Add Friend
        </>
      );
      list = [
        {
          key: "add",
          icon: <SendOutlined />,
          label: "Add Friend",
        },
      ];
      break;
  }

  const handleButtonClick = (e) => {
    switch (e.target.innerText) {
      case " Add Friend":
        dispatch(addFriend({ id: _id }));
        break;

      default:
        break;
    }
  };

  const handleMenuClick = (event) => {
    switch (event.key) {
      case "remove":
        dispatch(removeFriend({ id: _id }));
        break;

      case "add":
        dispatch(addFriend({ id: _id }));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getInfoUser(_id));
  }, [status, _id, dispatch]);

  return (
    <div className={cx("header")}>
      <div className={cx("navigation")}>
        <NavLink to="vacation" end className={({ isActive }) => (isActive ? cx("active") : "")}>
          Vacations
        </NavLink>
        <NavLink to="album" end className={({ isActive }) => (isActive ? cx("active") : "")}>
          Albums
        </NavLink>
        <NavLink to="friends" end className={({ isActive }) => (isActive ? cx("active") : "")}>
          Friends
        </NavLink>
      </div>
      {userId && (
        <Dropdown.Button
          className={cx("dropdown")}
          onClick={handleButtonClick}
          menu={{
            onClick: handleMenuClick,
            className: cx("dropdown-list"),
            items: list,
          }}
        >
          {button}
        </Dropdown.Button>
      )}
    </div>
  );
};

export default Navbar;
