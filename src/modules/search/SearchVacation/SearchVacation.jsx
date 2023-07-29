import styles from "./SearchVacation.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Avatar, Card, List } from "antd";
import Loading from "~/components/Loading/Loading";
import EmptyRes from "../Empty/EmptyRes";
import ImageField from "~/components/ImageField/ImageField";

const cx = classNames.bind(styles);
const SearchVacation = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.search);
  const { vacations } = result;
  const { isLoading } = vacations;
  const currentPage = useRef(1);
  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "vacation", value: searchVal, page: 1 },
        type: "vacations",
      })
    );
  }, [dispatch, searchVal]);

  const loadMoreData = () => {
    if (
      vacations.page < vacations.pages &&
      currentPage.current === vacations.page
    ) {
      dispatch(
        searchOneModel({
          body: {
            model: "vacation",
            value: searchVal,
            page: vacations.page + 1,
          },
          type: "vacations",
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
  }, [dispatch, vacations.page]);

  return (
    <>
      <div className={cx("title")}>Vacation</div>
      <div id="result" className={cx("result")}>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          dataSource={vacations.data}
          renderItem={(item) => (
            <Link to={`/vacation?vacationID=${item._id}`}>
              <List.Item>
                <Card className={cx("item")}>
                  <div className={cx("user-info")}>
                    <Avatar src={item.authorInfo?.avatar.path} />
                    <div>{item.authorInfo?.username}</div>
                  </div>
                  <ImageField
                    rootClassName={cx("cover")}
                    src={item.cover?.path}
                    preview={false}
                  />
                  <div className={cx("item-name")}>
                    <span>{item.title}</span>
                  </div>
                </Card>
              </List.Item>
            </Link>
          )}
        />
      </div>
      {isLoading && <Loading className="searching" />}
      {vacations.data?.length === 0 && !isLoading && <EmptyRes />}
    </>
  );
};

export default SearchVacation;
