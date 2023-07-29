import React from "react";
import { Typography } from "antd";
import styles from "../Noti.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const LikeComment = ({ item }) => {
  const { modelInfo, action, isFirst, userInfo } = item;

  return (
    <Typography.Text className={cx("content")}>
      <span className={cx("bold")}>{userInfo?.username} </span>
      <span>
        {(isFirst ? "" : "and others ").concat(action, isFirst ? "s" : "", " your ", modelInfo?.type)}
      </span>
      <span className={cx("italic")}> "{modelInfo?.content}"</span>
    </Typography.Text>
  );
};

export default LikeComment;
