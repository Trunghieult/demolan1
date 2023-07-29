import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Vacation.module.scss";
import classNames from "classnames/bind";
import { VACATION_ROUTE } from "~/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCircleInfo,
  faPen,
  faShareNodes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip } from "antd";
import {
  getDetailVacation,
  getManyPosts,
  getStatusList,
  isPostListChanged,
  setTimeline,
} from "~/store/slices/vacationSlice";
import { getDate } from "~/helpers/function";
import Posts from "./Posts/Posts";
import Album from "./Album/Album";
import UserList from "./components/UserList/UserList";
import HandleVacation from "./HandleVacation/HandleVacation";
import Preloader from "~/components/Preloader/Preloader";
import ImageField from "~/components/ImageField/ImageField";
import UpLoad from "~/components/UpLoad/UpLoad";
import Notification from "~/components/Notification/Notification";
const cx = classNames.bind(styles);
const Vacation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let vacationID = searchParams.get("vacationID"); // get vacationId of url
  const urlType = searchParams.get("type") || "post"; // get type  of url (post || album)
  const imgRef = useRef();
  const currentPage = useRef(1);
  // Get User's info
  const { info } = useSelector((state) => state.auth);
  // Get detail of vacation
  const { detail, posts, memberList, shareList } = useSelector(
    (state) => state.vacation
  );
  const {
    authorInfo,
    cover,
    members,
    title,
    startingTime,
    endingTime,
    shareStatus,
  } = detail;

  // Get detail of posts
  const { page, pages, timeline, totalPost, isUpdatePost } = posts;
  // get msg of upload image
  const { msg, isSuccess, isError } = useSelector((state) => state.resource);
  const [openNoti, setOpenNoti] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);
  const [open, setOpen] = useState(false);
  const [preload, setPreload] = useState(true);
  // create state for listType is memberList or shareList
  const [listType, setListType] = useState("memberList");
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);

  const handleRoute = (type) => {
    navigate(`${VACATION_ROUTE}?vacationID=${vacationID}&type=${type}`);
  };
  // Get vacation detail & set activeTimeline
  useEffect(() => {
    setPreload(true);

    Promise.all([
      dispatch(getDetailVacation(vacationID)),
      dispatch(
        getStatusList({
          type: "vacations",
          id: vacationID,
          listType: "memberList",
          page: 1,
        })
      ),
      dispatch(
        getStatusList({
          type: "vacations",
          id: vacationID,
          listType: "shareList",
          page: 1,
        })
      ),
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: 1,
        })
      ),
    ]).then(() => setPreload(false));
    if (timeline) {
      dispatch(setTimeline(timeline[0]));
    }
  }, []);

  // when new post added, call API again to update new post to list
  useEffect(() => {
    if (isUpdatePost) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: 1,
        })
      );
      dispatch(isPostListChanged(false));
    }
  }, [isUpdatePost, dispatch, vacationID]);

  // handle Scroll increase currentPage
  const loadMorePosts = () => {
    if (page < pages && page === currentPage.current) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: page + 1,
        })
      );
      currentPage.current += 1;
    }
  };

  // add event onscroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  //check user is author or not
  const isAuthor = info?._id === authorInfo?._id;
  const handleImgClick = () => {
    isAuthor && imgRef.current.click();
  };
  const handleAfterClose = () => {
    window.location.reload();
  };
  return (
    <>
      {preload ? (
        <Preloader />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("sidebar")}>
            <div className={cx("bg-container")}>
              {isAuthor && (
                <UpLoad
                  imgRef={imgRef}
                  body={{ field: "cover", vacationId: vacationID }}
                  handleAfterClose={handleAfterClose}
                />
              )}
              <ImageField
                src={cover?.path}
                className={cx("img-BG")}
                preview={true}
              />
              {isAuthor && (
                <div
                  className={cx("bg-icon-container")}
                  onClick={handleImgClick}
                >
                  <span>Edit cover photo</span>
                  <FontAwesomeIcon icon={faCamera} className={cx("bg-icon")} />
                </div>
              )}
            </div>
            <div className={cx("sidebar-content")}>
              <div className={cx("user-info")}>
                <div className={cx("user-index")}>
                  <div className={cx("index")}>{authorInfo?.friends}</div>
                  <div className={cx("index-title")}>friends</div>
                </div>
                <div className={cx("user-avatar")}>
                  <Avatar
                    src={authorInfo?.avatar.path}
                    shape="square"
                    size={100}
                    className={cx("avatar")}
                  />

                  <div className={cx("fullname")}>
                    {authorInfo?.firstname} {authorInfo?.lastname}
                  </div>
                  <div className={cx("username")}>{authorInfo?.username}</div>
                </div>
                <div className={cx("user-index")}>
                  <div className={cx("index")}>{totalPost || 0}</div>
                  <div className={cx("index-title")}>Posts</div>
                </div>
              </div>
              <div className={cx("vacation-detail")}>
                <div className={cx("vacation-title")}>
                  Vacation Detail
                  {isAuthor && (
                    <FontAwesomeIcon
                      icon={faPen}
                      className={cx("title-icon")}
                      onClick={() => setOpen(true)}
                    />
                  )}
                  <HandleVacation
                    setOpen={setOpen}
                    showModal={open}
                    type="update"
                    vacationId={vacationID}
                  />
                </div>
                <div className={cx("vacation-info")}>
                  <div className={cx("vacation-name")}>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className={cx("icon")}
                    />
                    <Tooltip
                      title={title}
                      color="grey"
                      overlayInnerStyle={{
                        textAlign: "center",
                      }}
                    >
                      <span>{title}</span>
                    </Tooltip>
                  </div>

                  <div
                    className={cx("status")}
                    onClick={() => {
                      setOpenUserList(true);
                      setListType("shareList");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className={cx("icon")}
                    />
                    <span className={cx("memberList")}>{shareStatus}</span>
                  </div>

                  <div
                    onClick={() => {
                      setOpenUserList(true);
                      setListType("memberList");
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} className={cx("icon")} />
                    <span className={cx("memberList")}>
                      {members} people join in
                    </span>
                  </div>
                  <UserList
                    openUserList={openUserList}
                    setOpenUserList={setOpenUserList}
                    title={
                      listType === "memberList"
                        ? "Member List"
                        : "Friend Who Can See Your Vacation"
                    }
                    list={listType === "memberList" ? memberList : shareList}
                  />

                  <div className={cx("timeline")}>
                    <FontAwesomeIcon icon={faCalendar} className={cx("icon")} />
                    <Tooltip
                      title={`${startDate} - ${endDate}`}
                      color="grey"
                      overlayInnerStyle={{
                        textAlign: "center",
                      }}
                    >
                      <span>
                        {startDate} - {endDate}
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className={cx("route")}>
                <div
                  onClick={() => handleRoute("post")}
                  className={cx(urlType === "post" && "active")}
                >
                  See All Posts
                </div>
                <div
                  onClick={() => handleRoute("album")}
                  className={cx(urlType === "album" && "active")}
                >
                  See Album
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content")}>
            {urlType === null || urlType === "post" ? <Posts /> : <Album />}
          </div>
          {(isSuccess || isError) && (
            <Notification
              isError={isError}
              isSuccess={isSuccess}
              msg={msg}
              openNoti={openNoti}
              setOpenNoti={setOpenNoti}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Vacation;
