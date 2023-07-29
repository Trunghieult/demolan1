import React, { useRef, useEffect, useCallback } from "react";
import NotiItem from "./NotiItem";
import { Row, Col, Button, Typography, List, Skeleton } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./Noti.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "~/store/slices/notiSlice";
import { updateAll, changeVisible } from "~/store/slices/notiSlice";
import { query, where, orderBy, onSnapshot, collection } from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import firestore from "~/utils/firestore";
const cx = classNames.bind(styles);

const NotiList = () => {
  const { list, isVisible, page, pages } = useSelector((state) => state.noti);
  const userId = useSelector((state) => state.auth?.info?._id);
  const dispatch = useDispatch();
  const notiRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      const iconName = event.target.getAttribute("data-icon");
      iconName === "bell" ? dispatch(changeVisible()) : isVisible && dispatch(changeVisible(false));
    },
    [dispatch, isVisible]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (userId) {
      const notiRef = collection(firestore, "notifications");
      const q = query(notiRef, where("receiverId", "==", userId), orderBy("lastUpdateAt", "desc"));
      onSnapshot(q, (query) => {
        dispatch(getList({ page: 1 }));
      });
    }
  }, [userId, dispatch]);

  const handleUpdateAll = () => {
    dispatch(updateAll());
  };

  const loadMoreData = () => {
    dispatch(getList({ page: page + 1 }));
  };

  return (
    <div ref={notiRef} id={cx(isVisible ? "show" : "hide")} className={cx("notification")}>
      {isVisible && (
        <>
          <Row className={cx("header")}>
            <Col span={13}>
              <Typography.Title level={2} style={{ margin: 0, color: "white" }}>
                Notifications
              </Typography.Title>
            </Col>

            <Col offset={4} span={7}>
              <Button block={true} className={cx("button-mark")} ghost icon={<ReadOutlined />}>
                <Typography.Text style={{ marginRight: 0 }} underline onClick={handleUpdateAll}>
                  Mark as Read
                </Typography.Text>
              </Button>
            </Col>
          </Row>
          <div id="noti-table" className={cx("noti-table")}>
            <InfiniteScroll
              scrollThreshold="50%"
              dataLength={list.length}
              next={loadMoreData}
              hasMore={page < pages}
              loader={
                <Skeleton
                  avatar
                  paragraph={{
                    rows: 1,
                  }}
                  active
                />
              }
              scrollableTarget="noti-table"
            >
              <List
                className={cx("noti-list")}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item, index) => <NotiItem key={item.id} item={item} />}
              />
            </InfiniteScroll>
          </div>
        </>
      )}
    </div>
  );
};

export default NotiList;
