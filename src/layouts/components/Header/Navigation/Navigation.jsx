import React from "react";
import {
  HomeOutlined,
  TeamOutlined,
  ProfileOutlined,
  BellOutlined,
  PictureOutlined,
  RiseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchMobileVisible } from "~/store/slices/generalSlice";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import classNames from "classnames/bind";
import { changeVisible } from "~/store/slices/locationSlice";
const cx = classNames.bind(styles);

const Navigation = () => {
  const dispatch = useDispatch();
  const { isVisible, totalUnseen } = useSelector((state) => state.noti);
  const { isSearchMobileVisible } = useSelector((state) => state.general);
  const isTrendingVisible = useSelector((state) => state.location.isVisible);
  const { size } = useSelector((state) => state.general);
  const isMediumSize = size.width <= 992;
  const isSmallSize = size.width <= 576;

  return (
    <div className={cx("nav-tools")}>
      {!isMediumSize && (
        <NavLink to="/" className={({ isActive }) => (isActive ? cx("active") : "")}>
          <HomeOutlined />
        </NavLink>
      )}
      {!isSmallSize ? (
        <>
          <NavLink to="/profile/vacation" className={({ isActive }) => (isActive ? cx("active") : "")}>
            <ProfileOutlined />
          </NavLink>

          <NavLink to="/profile/album" className={({ isActive }) => (isActive ? cx("active") : "")}>
            <PictureOutlined />
          </NavLink>

          <NavLink to="/profile/friends" className={({ isActive }) => (isActive ? cx("active") : "")}>
            <TeamOutlined />
          </NavLink>
        </>
      ) : (
        <>
          <SearchOutlined
            style={{ cursor: "pointer" }}
            className={isSearchMobileVisible ? cx("active") : ""}
            onClick={() => dispatch(updateSearchMobileVisible())}
          />
          <RiseOutlined
            onClick={() => dispatch(changeVisible())}
            style={{ cursor: "pointer" }}
            className={isTrendingVisible ? cx("active") : ""}
          />
        </>
      )}

      <Badge
        className={isVisible ? cx("active") : ""}
        count={totalUnseen || 0}
        overflowCount={9}
        color="#b18735"
      >
        <BellOutlined className={cx("bell")} />
      </Badge>
    </div>
  );
};

export default Navigation;
