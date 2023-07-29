import React, { useState, useEffect } from "react";
import styles from "./Album.module.scss";
import classNames from "classnames/bind";
import { useSearchParams } from "react-router-dom";
import { Image, Skeleton, List, message } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import albumAPI from "~/api/albumAPI";

const cx = classNames.bind(styles);

const Album = () => {
  const [img, setImg] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 1 });
  const [searchParams] = useSearchParams();
  const vacationId = searchParams.get("vacationID");

  useEffect(() => {
    albumAPI
      .getAllImage({ id: vacationId, page: meta.page })
      .then((res) => {
        const { data, meta } = res.data;
        setImg((prevImg) => (res.data ? prevImg.concat(data) : []));
        setMeta(res.data ? meta : { page: 1, pages: 1, total: 1 });
      })
      .catch((err) => {
        message.error(err.response.data.message, 3);
      });
  }, [vacationId, meta.page]);

  const loadMoreData = () => {
    setMeta((prevMeta) => Object.assign(prevMeta, { page: prevMeta.page + 1 }));
  };

  return (
    <div className={cx("album-wrap")}>
      <h1 className={cx("album-title")}>Vacation's Album</h1>

      <InfiniteScroll
        dataLength={img.length}
        next={loadMoreData}
        hasMore={meta.page < meta.pages}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      >
        <List
          className={cx("album-container")}
          grid={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
          dataSource={img}
          renderItem={(item) => (
            <List.Item className={cx("album-item")}>
              <div className={cx("stack")}>
                <div className={cx("card-album-container")}>
                  <div className={cx("image")}>
                    <Image
                      preview={{ toolbarRender: () => null }}
                      src={item?.path}
                      alt="?"
                      rootClassName={cx("images")}
                    />
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Album;
