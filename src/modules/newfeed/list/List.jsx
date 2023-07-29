import React from "react";
import { getDate } from "~/helpers/function";
import { useSelector, useDispatch } from "react-redux";
import { getListVacation } from "~/store/slices/vacationSlice";
import images from "~/images";
import { NavLink } from "react-router-dom";
import { List, Skeleton, Avatar } from "antd";
import { HeartFilled, CommentOutlined, EyeOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
const cx = classNames.bind(styles);

const NewFeedList = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dispatch = useDispatch();
  const { page, pages, list } = useSelector(
    (state) => state.vacation.listVacation
  );
  const loadMorePosts = () =>
    dispatch(getListVacation({ page: page + 1, type: "newFeed" }));

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={loadMorePosts}
      hasMore={page < pages}
      loader={<Skeleton paragraph={{ rows: 1 }} active />}
    >
      <List
        className={cx("feed")}
        grid={{ column: 1 }}
        dataSource={list}
        renderItem={({
          _id,
          authorInfo,
          cover,
          title,
          startingTime,
          endingTime,
          views,
          likes,
          comments,
        }) => (
          <div className={cx("feed-post")} to={`/vacation?vacationID=${_id}`}>
            <NavLink
              to={`/profile/${authorInfo._id}/vacation`}
              className={cx("feed-head")}
            >
              <Avatar
                src={authorInfo?.avatar?.path}
                className={cx("feed-ava")}
              />
              <div className={cx("feed-head-info")}>
                <div className={cx("feed-user-name")}>
                  @{authorInfo?.username}
                </div>
                <div className={cx("feed-time")}>
                  {getDate(startingTime)} - {getDate(endingTime)}
                </div>
              </div>
            </NavLink>
            <NavLink
              to={`/vacation?vacationID=${_id}`}
              className={cx("feed-cover")}
            >
              <img
                src={cover?.path || images.noImage}
                alt="This is Vacation cover"
              />
              <div className={cx("feed-cover-rad")}></div>
              <div className={`${cx("cover-item")} ${cx("views")}`}>
                <EyeOutlined />
                {formatter.format(views)}
              </div>
              <div className={`${cx("cover-item")} ${cx("likes")}`}>
                <HeartFilled />
                {formatter.format(likes)}
              </div>
              <div className={`${cx("cover-item")} ${cx("cmts")}`}>
                <CommentOutlined />
                {formatter.format(comments)}
              </div>
            </NavLink>
            <div className={cx("feed-title-center")}>
              <div className={cx("feed-title")}>{title}</div>
            </div>
          </div>
        )}
      />
    </InfiniteScroll>
  );
};

export default NewFeedList;
