import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutside, useDebounce } from "~/helpers/customHook";
import { Avatar } from "antd";
import styles from "./SelectFriend.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { resetResult, searchOneModel } from "~/store/slices/searchSlice";
import { getFriendList } from "~/store/slices/friendSlice";
import Loading from "~/components/Loading/Loading";
import Modal from "~/components/Modal/Modal";

const cx = classNames.bind(styles);
const SelectFriend = ({
  open,
  setOpen,
  userList,
  setUserList,
  type,
  title,
}) => {
  const dispatch = useDispatch();
  const isFirstReq = useRef(true);
  const resultRef = useRef();
  const { list } = useSelector((state) => state.friend);
  const { result } = useSelector((state) => state.search);
  const { suggestions } = result;
  const { isLoading, page, pages, data } = suggestions;
  const [inputValue, setInputValue] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const debouncedValue = useDebounce(inputValue, 500);
  console.log(list);
  //  call API get friendList and search user
  useEffect(() => {
    if (isFirstReq.current) {
      dispatch(getFriendList());
      isFirstReq.current = false;
    }
    dispatch(resetResult({ type: "suggestions" }));
    if (debouncedValue !== "") {
      dispatch(
        searchOneModel({
          body: {
            model: "user",
            value: debouncedValue,
            page: 1,
          },
          type: "suggestions",
        })
      );
    }
  }, [debouncedValue]);

  useClickOutside(resultRef, () => {
    setOpenResult(false);
  });

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && page < pages) {
      if (debouncedValue !== "") {
        dispatch(
          searchOneModel({
            body: {
              model: "user",
              value: debouncedValue,
              page: page + 1,
            },
            type: "suggestions",
          })
        );
        setOpenResult(true);
      }
    }
  };

  // handle friend selected
  const handleSelectedUser = (friend) => {
    setUserList((prev) => [...prev, friend]);
  };

  const handleClear = (id) => {
    setUserList((prev) => prev.filter((item) => item._id !== id));
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Select Your Friend">
      <div className={cx("wrapper")}>
        <div className={cx("select-result")}>
          <span>{title}</span>
          <div className={cx("result-list")}>
            {userList?.map((friend) => {
              return (
                <span key={friend._id}>
                  {friend.username}
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className={cx("close")}
                    onClick={() => handleClear(friend._id)}
                  />
                </span>
              );
            })}
          </div>
        </div>
        <div className={cx("search-user")}>
          <input
            type="text"
            className={cx("search")}
            value={inputValue}
            placeholder="find username"
            onChange={(e) => setInputValue(e.target.value)}
            spellCheck={false}
            onClick={() => setOpenResult((prev) => !prev)}
          />
          {openResult && (
            <div
              ref={resultRef}
              className={cx("search-result")}
              onScroll={handleScroll}
            >
              {data?.length === 0 && !isLoading ? (
                <div className={cx("result-empty")}>Not Found</div>
              ) : (
                data?.map((item) => {
                  if (userList?.some((friend) => friend._id === item._id)) {
                    return;
                  }
                  return (
                    <div
                      className={cx("result-item")}
                      key={item._id}
                      onClick={() => handleSelectedUser(item)}
                    >
                      <Avatar src={item.avatar} />
                      <span>
                        <div className={cx("username")}>{item.username}</div>
                        <div
                          className={cx("fullname")}
                        >{`${item.firstname} ${item.lastname}`}</div>
                      </span>
                    </div>
                  );
                })
              )}
              {isLoading && <Loading className={cx("loading")} />}
            </div>
          )}
        </div>
        <div className={cx("friendlist")}>
          {" "}
          {list?.length === 0 ? (
            <div className={cx("empty")}>You have 0 Friend</div>
          ) : (
            list?.map((item) => {
              return (
                <div
                  className={cx("result-item")}
                  key={item._id}
                  onClick={() => handleSelectedUser(item)}
                >
                  <Avatar src={item.userInfo?.avatar.path} size={36} />
                  <span>
                    <div className={cx("username")}>
                      {item.userInfo?.username}
                    </div>
                    <div
                      className={cx("fullname")}
                    >{`${item.userInfo?.firstname} ${item.userInfo?.lastname}`}</div>
                  </span>
                </div>
              );
            })
          )}
        </div>

        <button onClick={handleSubmit} className={cx("submit")}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SelectFriend;
