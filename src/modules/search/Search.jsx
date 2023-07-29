import { Link, useSearchParams } from "react-router-dom";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faLocation,
  faUmbrellaBeach,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  SEARCH_ALBUM_ROUTE,
  SEARCH_LOCATION_ROUTE,
  SEARCH_USER_ROUTE,
  SEARCH_VACATION_ROUTE,
} from "~/utils/constants";
import { useEffect, useState } from "react";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import EmptyRes from "./Empty/EmptyRes";

const cx = classNames.bind(styles);

const filterFields = [
  { title: "People", url: SEARCH_USER_ROUTE, icon: faUsers },
  { title: "Location", url: SEARCH_LOCATION_ROUTE, icon: faLocation },
  { title: "Vacation", url: SEARCH_VACATION_ROUTE, icon: faUmbrellaBeach },
  { title: "Album", url: SEARCH_ALBUM_ROUTE, icon: faImages },
];

const Search = ({ children }) => {
  const [field, setField] = useState(window.location.pathname);
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  useEffect(() => {
    // Get the pathname of the current URL
    const pathname = window.location.pathname;

    // Set the pathname state
    setField(pathname);
    function GetPathURL() {
      setField(document.location.pathname);
    }
    window.addEventListener("popstate", GetPathURL);

    return () => window.removeEventListener("popstate", GetPathURL);
  }, [searchVal, window.location.pathname]);

  return (
    <DefaultLayout>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar-container")}>
          <div className={cx("title")}>Search results</div>
          <div className={cx("filter-container")}>
            <div className={cx("title")}>Filters</div>
            {filterFields.map((item, index) => {
              return (
                <Link
                  className={cx(
                    "fil-field",
                    item.url === field && "active-field"
                  )}
                  to={`${item.url}?f=${searchVal}`}
                  onClick={() => setField(item.url)}
                  key={index}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={cx("fil-icon")}
                  />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={cx("result-container")}>
          {searchVal === null ? (
            <EmptyRes
              description="Search anything ..."
              className={cx("empty")}
            />
          ) : (
            <div className={cx("result")}>{children}</div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Search;
