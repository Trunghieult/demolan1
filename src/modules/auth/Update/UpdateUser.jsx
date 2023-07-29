import { useEffect, useState } from "react";
import styles from "./UpdateUser.module.scss";
import classNames from "classnames/bind";
import { Outlet, useNavigate } from "react-router-dom";
import { OVERVIEW_ROUTE, PERSONAL_ROUTE, SECURITY_ROUTE } from "~/utils/constants";

const cx = classNames.bind(styles);
const UpdateUser = () => {
  const navigate = useNavigate();
  // Get Url path name
  const [activeTag, setActiveTags] = useState(window.location.pathname);

  // When component mounts, set init state of pathname
  useEffect(() => {
    function GetPathURL() {
      setActiveTags(document.location.pathname);
    }
    window.addEventListener("popstate", GetPathURL);

    return () => window.removeEventListener("popstate", GetPathURL);
  }, []);

  // Handle Route
  const handleRoute = (url) => {
    navigate(url);
    setActiveTags(url);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Account Setting</div>
      <div className={cx("content")}>
        <div className={cx("sidebar")}>
          <div
            onClick={() => handleRoute(OVERVIEW_ROUTE)}
            className={cx((activeTag === OVERVIEW_ROUTE || activeTag === "/setting") && "active")}
          >
            Overview
          </div>
          <div
            onClick={() => handleRoute(PERSONAL_ROUTE)}
            className={cx(activeTag === PERSONAL_ROUTE && "active")}
          >
            Personal
          </div>
          <div
            onClick={() => handleRoute(SECURITY_ROUTE)}
            className={cx(activeTag === SECURITY_ROUTE && "active")}
          >
            Security
          </div>
        </div>
        <div className={cx("info")}>
          <Outlet />{" "}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
