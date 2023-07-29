import React from "react";
import { Space, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { acceptFriend, removeFriend } from "~/store/slices/friendSlice";
import classNames from "classnames/bind";
import styles from "../Friend.module.scss";
const cx = classNames.bind(styles);

const ButtonGroup = ({ id }) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(acceptFriend({ id }));
  };

  const handleRemove = () => {
    dispatch(removeFriend({ id: id }));
  };

  return (
    <Space align={"center"} direction={"vertical"} className={cx("button-group")}>
      <Button
        onClick={handleAccept}
        type="primary"
        block
        ghost
        icon={<CheckOutlined style={{ marginInlineEnd: "-8px" }} />}
      >
        <span className={cx("text")}>Accept</span>
      </Button>
      <Button
        onClick={handleRemove}
        type="primary"
        block
        danger
        ghost
        icon={<CloseOutlined style={{ marginInlineEnd: "-8px" }} />}
      >
        <span className={cx("text")}>Decline</span>
      </Button>
    </Space>
  );
};

export default ButtonGroup;
