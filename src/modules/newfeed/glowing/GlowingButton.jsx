import React from "react";
import classNames from "classnames/bind";
import styles from "./GlowingButton.module.scss";

const cx = classNames.bind(styles);

const GlowingButton = () => {
  return (
    <button className={cx("glowingBtn")}>
      <span className={cx("glowingTxt")}>
        T<span className={cx("faultyLetter")}>R</span>END
        <span className={cx("faultyLetter")}>IN</span>G<span></span>
      </span>
    </button>
  );
};

export default GlowingButton;
