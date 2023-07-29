import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./PostResult.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getManyPosts, isPostListChanged } from "~/store/slices/vacationSlice";
import { List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "~/modules/vacation/Posts/PostItem/PostItem";
import Preloader from "~/components/Preloader/Preloader";

const cx = classNames.bind(styles);
const PostResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = useParams()?.type;
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get("k");
  const id = searchParams.get("id");
  const timeline = searchParams.get("tl");
  const { posts } = useSelector((state) => state.vacation);
  const { list, page, pages, isUpdatePost } = posts;
  const [loading, setLoading] = useState(false);
  const [handlePost, setHandlePost] = useState("update");

  useEffect(() => {
    setLoading(true);
    if (searchKey === null && timeline === null) {
      navigate(-1);
    } else if (searchKey) {
      dispatch(
        getManyPosts({
          type: title,
          id: id,
          page: 1,
        })
      ).then(() => setLoading(false));
    } else if (timeline) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: id,
          timeline: timeline,
          page: 1,
        })
      ).then(() => setLoading(false));
    }
  }, [searchKey]);

  useEffect(() => {
    if (isUpdatePost) {
      if (searchKey) {
        dispatch(
          getManyPosts({
            type: title,
            id: id,
            page: 1,
          })
        );
      } else if (timeline) {
        dispatch(
          getManyPosts({
            type: "vacation",
            id: id,
            timeline: timeline,
            page: 1,
          })
        );
      }

      dispatch(isPostListChanged(false));
    }
  }, [isUpdatePost]);

  const loadMoreData = () => {
    if (searchKey) {
      dispatch(
        getManyPosts({
          type: title,
          id: id,
          page: page + 1,
        })
      );
    } else if (timeline) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: id,
          timeline: timeline,
          page: page + 1,
        })
      );
    }
  };
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={cx("wrapper")}>
          <header className={cx("header")}>
            <h1>{title}</h1>
            <h3>{`#${searchKey || timeline}`}</h3>
          </header>
          <main className={cx("main")}>
            <div className={cx("container")}>
              <InfiniteScroll
                scrollThreshold="20%"
                dataLength={list?.length}
                next={loadMoreData}
                hasMore={page < pages}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={list}
                  renderItem={(item, index) => {
                    return (
                      <PostItem
                        postDetail={item}
                        vacationId={searchKey ? item.vacation?._id : id}
                        handlePost={handlePost}
                        setHandlePost={setHandlePost}
                      />
                    );
                  }}
                />
              </InfiniteScroll>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default PostResult;
