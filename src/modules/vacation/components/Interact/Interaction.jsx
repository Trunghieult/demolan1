import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faHeart,
  faMessage,
  faPaperPlane,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, List, Popover, Skeleton } from "antd";
import { useSelector } from "react-redux";
import styles from "./Interaction.module.scss";
import classNames from "classnames/bind";
import interactionAPI from "~/api/interactionAPI";
import Notification from "~/components/Notification/Notification";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);

const Interaction = (props) => {
  const isFirstReq = useRef(true);
  const { comments, postID, isLikedStatus, likes } = props;
  const { info } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false); // state for open the modal of list of users has like
  const [cmtList, setCmtList] = useState({
    list: [],
    page: 1,
    pages: 0,
    total: comments || 0,
  });
  const { list: commentList, page, pages, total } = cmtList;
  const [value, setValue] = useState(""); // state for input value

  // state for react fnc
  const [likedList, setLikedList] = useState({
    list: [],
    page: 1,
    pages: 1,
  });
  const [isLiked, setIsLiked] = useState(isLikedStatus);
  const [totalLike, setTotalLike] = useState(likes);
  const [isLikeAction, setAction] = useState(false);
  const [isCallingReq, setIsCallingReq] = useState(false);
  const [openLike, setOpenLike] = useState(false);
  // state for edit cmt
  const [editCmtId, setEditCmtId] = useState(null);
  const [editCmtValue, setEditCmtValue] = useState(""); // state for input value
  const [openPopOver, setOpenPopOver] = useState(false);
  // state for message when error
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const [openNoti, setOpenNoti] = useState(false);
  //state for loading
  const [loading, setLoading] = useState(true);
  const [cmtLoadingId, setCmtLoadingId] = useState("");
  const [likeLoading, setLikeLoading] = useState(true);

  // Get comment list
  useEffect(() => {
    if (open && isFirstReq.current) {
      const fetchApi = async () => {
        const res = await interactionAPI.getCommentList({
          id: postID,
          type: "posts",
          page: 1,
        });
        if (res.data) {
          setCmtList({
            list: res.data.data,
            page: res.data.meta?.page,
            pages: res.data.meta?.pages,
            total: res.data.meta?.total,
          });
        }
        isFirstReq.current = false;
        setLoading(false);
      };
      fetchApi();
    }

    setTotalLike(likes);
    setIsLiked(isLikedStatus);
  }, [open, likes, isLikedStatus]);

  // function load nex page cmt
  const loadMoreData = async () => {
    const res = await interactionAPI.getCommentList({
      id: postID,
      type: "posts",
      page: page + 1,
    });
    setCmtList((prev) => {
      return {
        ...prev,
        list: prev.list.concat(res.data?.data),
        page: res.data.meta?.page,
      };
    });
  };
  // set input value of comment
  const handleChangeValue = (e, type) => {
    if (type === "newCmt") setValue(e.target.value);
    else setEditCmtValue(e.target.value);
  };

  // send update comment's request
  const handleCmt = async (type, cmtId) => {
    setValue("");
    setEditCmtId(null);
    try {
      // when user add new Cmt => change cmtList state and send a request to add new Cmt
      if (type === "newCmt" && value !== "") {
        let res = await interactionAPI.addComment({
          id: postID,
          type: "posts",
          content: value,
        });
        // create new Cmt
        const newCmt = {
          authorInfo: {
            _id: info._id,
            avatar: {
              path: info.avatar.path,
            },
            username: info.username,
          },
          content: res.data.data?.content,
          lastUpdateAt: res.data.data?.lastUpdateAt,
          _id: res.data.data._id,
        };
        // push new cmt to cmtList state
        setCmtList((prev) => {
          return {
            ...prev,
            list: prev.list.concat(newCmt),
            total: prev.total + 1,
          };
        });
      } else if (type === "editCmt" && editCmtValue !== "") {
        setCmtLoadingId(cmtId);
        // when user edit Cmt => change cmtList state and send a request to edit Cmt
        let res = await interactionAPI.updateComment({
          id: cmtId,
          content: editCmtValue,
        });
        // create new cmt List
        const newCmtList = commentList.map((item) => {
          if (item._id === cmtId) {
            return {
              ...item,
              content: res.data.data?.content,
            };
          } else return item;
        });
        // change cmtList state
        setCmtList((prev) => {
          return {
            ...prev,
            list: newCmtList,
          };
        });
        setEditCmtValue("");
      }
    } catch (error) {
      setIsError(true);
      setOpenNoti(true);
      setMsg(error.message);
    }
    setCmtLoadingId("");
  };

  // update like when user click icon
  const handleLike = async () => {
    setIsCallingReq(true);
    if (!isCallingReq) {
      try {
        setIsLiked((prev) => !prev); // set Like status
        // update total like
        if (isLiked) {
          setTotalLike((prev) => prev - 1);
        } else {
          setTotalLike((prev) => prev + 1);
        }
        setAction(true); // set like action
        await interactionAPI.updateLike({
          id: postID,
          type: "posts",
        });
        setIsCallingReq(false);
      } catch (error) {
        setIsError(true);
        setOpenNoti(true);
        setMsg(error.message);
      }
    }
  };

  // Handle when mouse enter the total like's area
  const handleMouseEnter = async () => {
    setOpenLike(true);
    if (likedList.list?.length === 0 || isLikeAction) {
      //when user mouse enter first time or after user click heart icon
      try {
        const res = await interactionAPI.getLikedList({
          id: postID,
          type: "posts",
          page: 1,
        });

        // update info list of user who liked
        setLikedList({
          list: res.data.data,
          page: 1,
          pages: res.data.meta?.pages,
        });

        setLikeLoading(false);
      } catch (error) {
        setIsError(true);
        setOpenNoti(true);
        setMsg(error.message);
      }
    }
  };
  const loadMoreDataLikes = async () => {
    const res = await interactionAPI.getLikedList({
      id: postID,
      type: "posts",
      page: likedList.page + 1,
    });
    setLikedList((prev) => ({
      ...prev,
      list: [...prev.list, ...res.data.data],
      page: res.data.meta.page,
    }));
  };
  // Handle Mouse leave
  const handleMouseLeave = () => {
    setOpenLike(false);
    setAction(false);
  };

  // handle when user click "edit"
  const handleEditCmt = (id, content) => {
    setEditCmtId(id);
    setEditCmtValue(content);
  };

  // delete comment

  const handleDelCmt = async (id) => {
    try {
      await interactionAPI.deleteComment(id);
      const newCmtList = commentList.filter((item) => id !== item._id);
      // change cmtList state
      setCmtList((prev) => {
        return {
          ...prev,
          list: newCmtList,
          total: prev.total - 1,
        };
      });
    } catch (error) {
      setIsError(true);
      setOpenNoti(true);
      setMsg(error.message);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("react")}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={handleLike}
            className={cx(isLiked ? "liked" : "unlike")}
          />

          <div
            className={cx("react-list-wrapper")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>{totalLike}</span>
            {openLike && (
              <div
                id="react-list-container"
                className={cx("react-list-container")}
              >
                {likeLoading ? (
                  <Loading className={cx("interaction-loading")} />
                ) : (
                  <InfiniteScroll
                    scrollThreshold="50%"
                    dataLength={likedList.list?.length || 0}
                    next={loadMoreDataLikes}
                    hasMore={likedList.page < likedList.pages}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    scrollableTarget="react-list-container"
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={likedList.list}
                      renderItem={(item) => {
                        return (
                          <List.Item
                            key={item.email}
                            className={cx("react-list-item")}
                          >
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  src={item.authorInfo?.avatar.path}
                                  size={25}
                                />
                              }
                              title={item.authorInfo.username}
                            />
                          </List.Item>
                        );
                      }}
                    />
                  </InfiniteScroll>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={cx("comment")} onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={faMessage} />
          <span>{total}</span>
        </div>
      </div>

      {open && (
        <div className={cx("cmt-container")}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className={cx("input-container")}>
                <div className={cx("input-content")}>
                  <textarea
                    value={value}
                    type="text"
                    placeholder="Write your comment here"
                    spellCheck={false}
                    onChange={(e) => handleChangeValue(e, "newCmt")}
                  />
                </div>

                <button onClick={() => handleCmt("newCmt")}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
              <div className={cx("cmt-list")} id="cmt-list">
                <InfiniteScroll
                  scrollThreshold="50%"
                  dataLength={commentList?.length || 0}
                  next={loadMoreData}
                  hasMore={page < pages}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  scrollableTarget="cmt-list"
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={commentList}
                    renderItem={(item) => {
                      return (
                        <>
                          <div key={item._id} className={cx("cmt-item")}>
                            <Avatar
                              src={item.authorInfo.avatar?.path}
                              size={45}
                            />
                            <div className={cx("item-content-container")}>
                              <div className={cx("item-username")}>
                                {item.authorInfo.username}
                                <div className={cx("moment")}>
                                  {moment(item.lastUpdateAt).fromNow()}
                                </div>
                              </div>

                              {editCmtId === item._id ? (
                                <div className={cx("edit-cmt")}>
                                  <textarea
                                    type="text"
                                    value={editCmtValue}
                                    spellCheck={false}
                                    onChange={(e) =>
                                      handleChangeValue(e, "editCmt")
                                    }
                                  />
                                  <div className={cx("icon-container")}>
                                    <FontAwesomeIcon
                                      icon={faPaperPlane}
                                      onClick={() =>
                                        handleCmt("editCmt", item._id)
                                      }
                                    />
                                    <FontAwesomeIcon
                                      icon={faRectangleXmark}
                                      onClick={() => setEditCmtId(null)}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className={cx("item-content")}>
                                  {item.content}
                                </div>
                              )}
                            </div>
                            {item.authorInfo._id === info._id && (
                              <Popover
                                content={
                                  openPopOver && (
                                    <div className={cx("pop-over")}>
                                      <p
                                        onClick={() => {
                                          handleEditCmt(item._id, item.content);
                                          setOpenPopOver(false);
                                        }}
                                      >
                                        Edit
                                      </p>
                                      <p
                                        onClick={() => {
                                          handleDelCmt(item._id);
                                          setOpenPopOver(false);
                                        }}
                                      >
                                        Delete
                                      </p>
                                    </div>
                                  )
                                }
                                trigger="click"
                                placement="bottom"
                              >
                                <FontAwesomeIcon
                                  icon={faEllipsisVertical}
                                  className={cx("icon")}
                                  onClick={() => setOpenPopOver(true)}
                                />
                              </Popover>
                            )}
                          </div>
                          {item._id === cmtLoadingId && (
                            <div className={cx("loading")}>...Updating</div>
                          )}
                        </>
                      );
                    }}
                  />
                </InfiniteScroll>
              </div>
            </>
          )}
        </div>
      )}
      {isError && (
        <Notification
          openNoti={openNoti}
          setOpenNoti={setOpenNoti}
          msg={msg}
          isError={isError}
        />
      )}
    </div>
  );
};

export default Interaction;
