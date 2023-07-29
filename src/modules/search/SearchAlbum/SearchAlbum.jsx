import styles from "./SearchAlbum.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Avatar, Card, List } from "antd";
import EmptyRes from "../Empty/EmptyRes";
import Loading from "~/components/Loading/Loading";
import ImageField from "~/components/ImageField/ImageField";

const cx = classNames.bind(styles);

const SearchAlbum = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.search);
  const { albums } = result;
  const { isLoading, page, pages, data } = albums;
  const currentPage = useRef(1);
  console.log(albums);

  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "album", value: searchVal, page: 1 },
        type: "albums",
      })
    );
  }, [dispatch, searchVal]);

  const loadMoreData = () => {
    if (page < pages && currentPage.current === page) {
      dispatch(
        searchOneModel({
          body: {
            model: "user",
            value: searchVal,
            page: page + 1,
          },
          type: "albums",
        })
      );

      currentPage.current += 1;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMoreData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, page]);
  return (
    <>
      <div className={cx("title")}>Album</div>
      <div id="result" className={cx("result")}>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card className={cx("item")}>
                <div className={cx("user-info")}>
                  <Avatar src={item.authorInfo?.avatar.path} />
                  <div>{item.authorInfo?.username}</div>
                </div>
                <ImageField
                  src={item.cover}
                  rootClassName={cx("cover")}
                  preview={false}
                />
                <div className={cx("item-name")}>
                  <span>{item.title}</span>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
      {isLoading && <Loading className="searching" />}
      {data?.length === 0 && !isLoading && <EmptyRes />}
    </>
  );
};

export default SearchAlbum;
