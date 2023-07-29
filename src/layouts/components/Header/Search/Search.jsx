import React, { useState, useEffect } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { List, Avatar, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import images from "~/images";
import { useDebounce } from "~/helpers/customHook";
const cx = classNames.bind(styles);

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const [value, setValue] = useState(searchVal || "");
  const navigate = useNavigate();
  const debouncedValue = useDebounce(value, 500);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const dispatch = useDispatch();
  const { page, pages, data } = useSelector((state) => state.search.result.suggestions);
  const currentUserId = useSelector((state) => state.auth.info?._id);
  const { size } = useSelector((state) => state.general);
  const isSmallSize = size.width <= 576;

  useEffect(() => {
    if (debouncedValue !== "") {
      dispatch(
        searchOneModel({
          body: { model: "user", value: debouncedValue, page: 1 },
          type: "suggestions",
        })
      );
    }
  }, [dispatch, debouncedValue]);

  const loadMoreData = () => {
    dispatch(
      searchOneModel({ body: { model: "user", value: debouncedValue, page: page + 1 }, type: "suggestions" })
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && value !== "") {
      setHideSuggestions(true);
      navigate(`/search/user?f=${value}`);
    }
  };

  return (
    <div className={cx("nav-search")}>
      <NavLink className={cx("nav-logo")} to="/">
        <img src={images.Vector} className={cx("nav-logo-img")} alt="" />
        {isSmallSize && <span className={cx("name")}>een</span>}
      </NavLink>
      {!isSmallSize && (
        <input
          className={cx("search-input")}
          type="text"
          placeholder="# Explore..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setHideSuggestions(false);
          }}
          onKeyDown={handleKeyPress}
          onBlur={() => setTimeout(() => setHideSuggestions(true), 400)}
          spellCheck={false}
        />
      )}
      <div id="suggestion" className={cx("suggestions")}>
        {!hideSuggestions && (
          <InfiniteScroll
            scrollThreshold="50%"
            dataLength={data.length || 0}
            next={loadMoreData}
            hasMore={page < pages}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="suggestion"
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => {
                const { _id, username, firstname, lastname, avatar } = item;
                return (
                  <NavLink
                    style={{ color: "white" }}
                    to={`/profile/${_id === currentUserId ? "vacation" : `${_id}/vacation`}`}

                  >
                    <List.Item className={cx("item")}>
                      <List.Item.Meta
                        avatar={<Avatar size="large" src={avatar} />}
                        title={
                          <span style={{ color: "white" }}>{username}</span>
                        }
                        description={
                          <div
                            style={{ color: "white" }}
                          >{`${firstname} ${lastname}`}</div>
                        }
                      />
                    </List.Item>
                  </NavLink>
                );
              }}
            />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Search;
