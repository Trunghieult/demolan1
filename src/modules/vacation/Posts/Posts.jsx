import classNames from "classnames/bind";
import styles from "./Posts.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Avatar } from "antd";

import Timeline from "../components/Timelines/Timeline";
import PostItem from "./PostItem/PostItem";
// import CreatePost from "./CreatePost/CreatePost";
import Loading from "~/components/Loading/Loading";
import HandlePost from "./HandlePost/HandlePost";

const cx = classNames.bind(styles);

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const { info } = useSelector((state) => state.auth);
  const { posts, detail, isLoading } = useSelector((state) => state.vacation);
  const { list } = posts;
  const [handlePost, setHandlePost] = useState("create");

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          {detail?.isMember && (
            <div className={cx("create-post")}>
              <Avatar
                src={info.avatar?.path}
                className={cx("avatar")}
                size={60}
              />
              <div
                onClick={() => {
                  setShowModal(true);
                  setHandlePost("create");
                }}
              >
                Every step is a milestone...
              </div>
            </div>
          )}

          {handlePost === "create" && (
            <HandlePost
              setShowModal={setShowModal}
              showModal={showModal}
              type={handlePost}
            />
          )}

          {list?.map((item, index) => (
            <PostItem
              postDetail={item}
              key={index}
              setHandlePost={setHandlePost}
              handlePost={handlePost}
            />
          ))}

          <>{isLoading && <Loading />}</>
        </div>
        <Timeline />
      </div>
    </>
  );
};

export default Posts;
