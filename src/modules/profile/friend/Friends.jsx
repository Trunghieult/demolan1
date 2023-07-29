import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { Tabs } from "antd";
import FriendList from "./list/List";
import { resetList } from "~/store/slices/friendSlice";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
const cx = classNames.bind(styles);

const Friends = () => {
  const [type, setType] = useState("friend");
  const dispatch = useDispatch();
  const onTabChange = (key) => {
    dispatch(resetList());
    setType(Number(key) === 1 ? "friend" : "request");
  };
  const { userId } = useOutletContext();

  return (
    <Tabs
      className={cx("friend-nav")}
      defaultActiveKey="1"
      type="line"
      size="middle"
      items={[
        {
          key: "1",
          label: "Friend List",
          children: <FriendList type={type} userId={userId} />,
        },
        userId
          ? {}
          : {
              key: "2",
              label: "Request List",
              children: <FriendList type={type} />,
            },
      ]}
      onChange={onTabChange}
    />
  );
};

export default Friends;
