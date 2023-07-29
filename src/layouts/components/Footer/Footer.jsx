import React, { useState } from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { HomeOutlined, ProfileOutlined, PlusCircleFilled } from "@ant-design/icons";
import HandleVacation from "~/modules/vacation/HandleVacation/HandleVacation";
const cx = classNames.bind(styles);

const Footer = () => {
  const [open, setOpen] = useState(false);
  const initVacationDetail = {
    title: "",
    des: "",
    memberList: [],
    dates: [],
    status: "Public",
  };
  return (
    <div className={cx("footer")}>
      <NavLink to="/" className={({ isActive }) => (isActive ? cx("active") : "")}>
        <HomeOutlined />
      </NavLink>
      <PlusCircleFilled className={cx("add")} style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
      <NavLink to="/profile/vacation" className={({ isActive }) => (isActive ? cx("active") : "")}>
        <ProfileOutlined />
      </NavLink>
      <HandleVacation
        setOpen={setOpen}
        showModal={open}
        initVacationDetail={initVacationDetail}
        type="create"
      />
    </div>
  );
};

export default Footer;
