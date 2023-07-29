import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../Friend.module.scss";
import { List, Skeleton, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendList, getRequestList } from "~/store/slices/friendSlice";
import { resetList } from "~/store/slices/friendSlice";
import ButtonGroup from "./ButtonGroup";
import DropdownMore from "./Dropdown";
import moment from "moment/moment";
const cx = classNames.bind(styles);

const FriendList = ({ type, userId }) => {
  const {
    friend: {
      list,
      meta: { page, pages },
    },
    info,
  } = useSelector((state) => Object.assign({ friend: state.friend, info: state.auth.info }));
  const currentUserId = info?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetList());
    dispatch(type === "request" ? getRequestList({ page: 1 }) : getFriendList({ page: 1, userId }));
  }, [dispatch, type, userId]);

  const loadMoreData = () => {
    dispatch(
      type === "request" ? getRequestList({ page: page + 1 }) : getFriendList({ page: page + 1, userId })
    );
  };

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={loadMoreData}
      hasMore={page < pages}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
    >
      <List
        className={cx("list")}
        dataSource={list}
        grid={{ gutter: 15, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 3 }}
        renderItem={(item) => {
          const { _id, userInfo, lastUpdateAt } = item;
          return (
            <List.Item className={cx("item")}>
              <NavLink
                className={cx("nav")}
                to={`/profile/${userInfo?._id === currentUserId ? "" : userInfo?._id}`}
              >
                <List.Item.Meta
                  className={cx("item-meta")}
                  avatar={
                    <Avatar
                      className={cx("avatar")}
                      size={60}
                      src={userInfo?.avatar?.path}
                      icon={<UserOutlined />}
                    />
                  }
                  title={
                    <div style={{ color: "white" }}>
                      <i>@{userInfo?.username}</i>
                      <br />
                      {`${userInfo?.firstname} ${userInfo?.lastname}`}
                    </div>
                  }
                  description={
                    <div style={{ color: "white" }}>
                      <i>{lastUpdateAt ? moment(new Date(lastUpdateAt)).fromNow() : ""}</i>
                    </div>
                  }
                />
              </NavLink>
              <div className={cx("button-container")}>
                {type === "request" ? <ButtonGroup id={_id} /> : <DropdownMore id={userInfo?._id} />}
              </div>
            </List.Item>
          );
        }}
      />
    </InfiniteScroll>
  );
};

export default FriendList;
