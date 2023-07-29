import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./NewFeed.module.scss";
import { getListVacation, resetList } from "~/store/slices/vacationSlice";
import { getTrendingPlace } from "~/store/slices/locationSlice";
import Preloader from "~/components/Preloader/Preloader";
import { getInfoUser } from "~/store/slices/authSlice";
import UserInfo from "./userInfo/UserInfo";
import Trending from "./trending/Trending";
import List from "./list/List";
import Create from "./create/Create";

const cx = classNames.bind(styles);
const NewFeed = () => {
  const dispatch = useDispatch();
  const { size } = useSelector((state) => state.general);
  const isMediumSize = size.width <= 992;
  const isSmallSize = size.width <= 576;
  const [preLoader, setPreLoader] = useState(true);

  // Get list of trending place
  useEffect(() => {
    setPreLoader(true);
    dispatch(resetList());
    Promise.all([
      dispatch(getTrendingPlace({ type: "trending", number: 7 })),
      dispatch(getListVacation({ page: 1, type: "newFeed" })),
      dispatch(getInfoUser()),
    ]).then(() => setPreLoader(false));
  }, [dispatch]);

  return preLoader ? (
    <Preloader />
  ) : (
    <div className={cx("container")}>
      {!isMediumSize && <UserInfo />}
      <div className={cx("feed")}>
        {isSmallSize ? <Trending /> : <Create />}
        <List />
      </div>
      {!isSmallSize && <Trending />}
    </div>
  );
};

export default NewFeed;
