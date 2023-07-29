import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./PostItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment/moment";
import { Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Interaction from "../../components/Interact/Interaction";
import { isPostListChanged, setTimeline } from "~/store/slices/vacationSlice";
import { getDate } from "~/helpers/function";
import vacationAPI from "~/api/vacationAPI";
import Modal from "~/components/Modal/Modal";
import ImageField from "~/components/ImageField/ImageField";
import HandlePost from "../HandlePost/HandlePost";
import Notification from "~/components/Notification/Notification";

const cx = classNames.bind(styles);

const PostItem = ({ postDetail, vacationId, setHandlePost, handlePost }) => {
  const {
    authorInfo,
    content,
    resource,
    comments,
    likes,
    lastUpdateAt,
    _id,
    createdAt,
    isLiked,
    location,
  } = postDetail;

  const { info } = useSelector((state) => state.auth);
  const postItemRef = useRef(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const [openNoti, setOpenNoti] = useState(false);
  const [postId, setPostId] = useState("");

  useEffect(() => {
    const handleScrollPost = () => {
      const element = postItemRef.current;
      const distanceFromTop = element.getBoundingClientRect().top;

      if (
        distanceFromTop <= window.innerHeight * 0.2 &&
        distanceFromTop >= window.innerHeight * 0.15
      ) {
        dispatch(setTimeline(postItemRef.current.getAttribute("timeline")));
      }
    };

    window.addEventListener("scroll", handleScrollPost);

    return () => window.removeEventListener("scroll", handleScrollPost);
  }, []);

  const handleDeletePost = async () => {
    try {
      setOpen(false);
      const res = await vacationAPI.deletePost(_id);
      setMsg(res.data?.message);
      dispatch(isPostListChanged(true));
      setIsSuccess(true);
    } catch (error) {
      setMsg(error.message);
      setIsError(true);
    }

    setOpenNoti(true);
  };
  return (
    <div
      className={cx("wrapper")}
      ref={postItemRef}
      timeline={getDate(createdAt)}
    >
      <header>
        <div className={cx("user-info")}>
          <Avatar src={authorInfo?.avatar?.path} size={45} />
          <div className={cx("username-container")}>
            <div className={cx("username")}>
              {authorInfo.username}

              <span>at</span>
              <span className={cx("location")}>
                {` ${location?.detail} - ${location?.district} - ${location?.city}`}
              </span>
            </div>
            <div className={cx("moment")}>{moment(lastUpdateAt).fromNow()}</div>
          </div>
        </div>
        {authorInfo._id === info._id && (
          <Popover
            content={
              <div className={cx("pop-over")}>
                <p
                  className={cx("options")}
                  onClick={() => {
                    setShowModal(true);
                    setOpen(false);
                    setHandlePost("update");
                    setPostId(_id);
                  }}
                >
                  Edit
                </p>

                <p className={cx("options")} onClick={handleDeletePost}>
                  Delete
                </p>
              </div>
            }
            open={open}
            trigger="click"
            placement="bottom"
          >
            {handlePost === "update" && (
              <HandlePost
                showModal={showModal}
                setShowModal={setShowModal}
                setPostId={setPostId}
                postId={postId}
                vacationId={vacationId}
                type={handlePost}
              />
            )}
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={cx("options")}
              onClick={() => setOpen(!open)}
            />
          </Popover>
        )}
      </header>

      <main>
        <div className={cx("description")}>{content}</div>
        <div className={cx("img-container")}>
          {resource?.map((item, index) => {
            return (
              index <= 5 && (
                <div
                  className={cx(index === 5 && "last-img")}
                  onClick={() => index === 5 && setOpenImg(true)}
                  key={index}
                >
                  <ImageField src={item.path} preview={index < 5} />
                </div>
              )
            );
          })}
        </div>

        <Modal open={openImg} setOpen={setOpenImg} title="Resources">
          <div className={cx("img-container")}>
            {resource?.map((item, index) => (
              <div key={index}>
                <ImageField src={item.path} />
              </div>
            ))}
          </div>
        </Modal>
      </main>

      <Interaction
        likes={likes}
        comments={comments}
        postID={_id}
        isLikedStatus={isLiked}
      />
      {(isSuccess || isError) && (
        <Notification
          isSuccess={isSuccess}
          isError={isError}
          msg={msg}
          openNoti={openNoti}
          setOpenNoti={setOpenNoti}
        />
      )}
    </div>
  );
};

export default PostItem;
