import React from "react";
import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
import { Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

const UserInfo = () => {
  const { friends, posts, avatar, firstname, lastname, username, description } =
    useSelector((state) => state.auth.info);
  return (
    <div className={cx("user-info")}>
      <div className={cx("user-cover-linear")}></div>
      <div className={cx("user-info-background")}>
        <img
          src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="?"
          className={cx("user-info-bgimg")}
        />
      </div>
      <div className={cx("user-info-head")}>
        <div className={cx("user-info-header")}>
          <div className={cx("user-info-header-details")}>
            <NavLink to="profile/friends">{friends}</NavLink>
            <div className={cx("user-info-header-line")}>friends</div>
          </div>
          <Avatar
            src={avatar?.path}
            className={cx("user-info-bgava")}
            size={140}
          />
          <div className={cx("user-info-header-details")}>
            <NavLink to="profile">{posts}</NavLink>
            <div className={cx("user-info-header-line")}>Posts</div>
          </div>
        </div>
        <div className={cx("user-info-fullname")}>
          {lastname} {firstname}
        </div>
        <div className={cx("user-info-username")}>@{username}</div>
        <div className={cx("user-info-des")}>{description}</div>
        <div className={cx("user-info-line")}></div>
        <NavLink to="profile" className={cx("user-info-btn")}>
          See Profile
        </NavLink>
      </div>
    </div>
  );
};

export default UserInfo;
