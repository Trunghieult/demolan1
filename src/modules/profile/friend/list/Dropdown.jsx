import React from "react";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeFriend } from "~/store/slices/friendSlice";
import classNames from "classnames/bind";
import styles from "../Friend.module.scss";
const cx = classNames.bind(styles);

const DropdownMore = ({ id }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFriend({ id }));
  };

  return (
    <>
      <Popover
        className={cx("pop-over")}
        arrow
        placement="bottomRight"
        trigger={"click"}
        color="#282828"
        content={
          <div className={cx("pop-content")}>
            <Button onClick={handleRemove}>Remove</Button>
          </div>
        }
      >
        <MoreOutlined className={cx("more")} />
      </Popover>
    </>
  );
};

export default DropdownMore;
