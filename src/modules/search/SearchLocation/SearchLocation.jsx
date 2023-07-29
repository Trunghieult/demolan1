import { useEffect } from "react";
import styles from "./SearchLocation.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { searchOneModel } from "~/store/slices/searchSlice";

import Loading from "~/components/Loading/Loading";
import EmptyRes from "../Empty/EmptyRes";

const cx = classNames.bind(styles);

const SearchLocation = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const { result } = useSelector((state) => state.search);
  const { locations } = result;
  const { isLoading } = locations;

  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "location", value: searchVal, page: 1 },
        type: "locations",
      })
    );
  }, [dispatch, searchVal]);

  return (
    <>
      <div className={cx("title")}>Location</div>
      <div id="result" className={cx("result")}>
        {locations.data?.map((item) => {
          return (
            <Link
              className={cx("item")}
              key={item._id}
              to={`/post/location?k=${item.title}&id=${item._id}`}
            >
              <span className={cx("detail")}> {item.title}</span>
              <div className={cx("des")}>
                {`${item.district} - ${item.city}`}
              </div>
            </Link>
          );
        })}
      </div>
      {isLoading && <Loading className="searching" />}
      {locations.data?.length === 0 && !isLoading && <EmptyRes />}
    </>
  );
};

export default SearchLocation;
