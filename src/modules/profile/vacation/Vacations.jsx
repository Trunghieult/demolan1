import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Vacation.module.scss";
import { HeartFilled, CommentOutlined, EyeOutlined } from "@ant-design/icons";
import { getListVacation, resetList } from "~/store/slices/vacationSlice";
import { Card, List, Typography, Skeleton, Image } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useOutletContext } from "react-router-dom";
import images from "~/images";
const cx = classNames.bind(styles);

const Vacations = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const { userId } = useOutletContext();
  const dispatch = useDispatch();
  const {
    listVacationProf: { list, page, pages },
  } = useSelector((state) => state.vacation);

  useEffect(() => {
    dispatch(resetList());
    dispatch(getListVacation(Object.assign({ type: "userProfile", page: 1 }, userId ? { userId } : {})));
  }, [userId, dispatch]);

  const loadMoreData = () => {
    dispatch(
      getListVacation(Object.assign({ type: "userProfile", page: page + 1 }, userId ? { userId } : {}))
    );
  };

  return (
    <div className={cx("feed-container")}>
      <InfiniteScroll
        dataLength={list.length}
        next={loadMoreData}
        hasMore={page < pages}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
      >
        <List
          className={cx("feed")}
          grid={{ gutter: 35, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item className={cx("feed-item")}>
              <NavLink to={`/vacation?vacationID=${item._id}`}>
                <Card
                  bordered={false}
                  className={cx("feed-card")}
                  hoverable={true}
                  cover={
                    <Image
                      preview={false}
                      className={cx("feed-cover")}
                      fallback={images.noImage}
                      src={item?.cover?.path}
                    />
                  }
                >
                  <Typography.Paragraph
                    className={cx("feed-title")}
                    ellipsis={{ expandable: false, rows: 1 }}
                  >
                    {item.title}
                  </Typography.Paragraph>
                  <div className={cx("feed-cover-rad")}></div>
                  <div className={cx("feed-info")}>
                    <div className={cx("views")}>
                      <EyeOutlined />
                      {formatter.format(item.views)}
                    </div>
                    <div className={cx("likes")}>
                      <HeartFilled />
                      {formatter.format(item.likes)}
                    </div>
                    <div className={cx("cmts")}>
                      <CommentOutlined />
                      {formatter.format(item.comments)}
                    </div>
                  </div>
                </Card>
              </NavLink>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Vacations;
