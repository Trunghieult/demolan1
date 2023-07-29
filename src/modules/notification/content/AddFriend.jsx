import React from "react";
import { Typography } from "antd";
import styles from "../Noti.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const AddFriend = ({ item }) => {
  const { userInfo } = item;

  return (
    <Typography.Text className={cx("content")}>
      <span className={cx("bold")}>{userInfo?.username} </span>
      wants to add you as friend
    </Typography.Text>
  );
};

export default AddFriend;
