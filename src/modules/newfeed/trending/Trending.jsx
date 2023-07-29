import React from "react";
import classNames from "classnames/bind";
import styles from "./Trending.module.scss";
import { useSelector } from "react-redux";
import GlowingButton from "../glowing/GlowingButton";
const cx = classNames.bind(styles);

const Trending = () => {
  const { trendingList, isVisible } = useSelector((state) => state.location);
  const { size } = useSelector((state) => state.general);
  const isSmallSize = size.width <= 576;

  return (
    (!isSmallSize || isVisible) && (
      <div className={cx("trending")}>
        <h2 className={cx("trending-title")}>
          <GlowingButton />
        </h2>
        <ul>
          {trendingList?.map((location) => (
            <li key={location._id} className={cx("underline")}>
              # {location.title}
            </li>
          ))}
          <div className={cx("trending-more")}>...</div>
        </ul>
      </div>
    )
  );
};

export default Trending;
