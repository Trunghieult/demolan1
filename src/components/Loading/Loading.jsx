import styles from "./Loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const Loading = ({ className }) => {
  return (
    <span className={cx(className, "page")}>
      <div className={cx("container")}>
        <div className={cx("ring")}></div>
        <div className={cx("ring")}></div>
        <div className={cx("ring")}></div>
        <div className={cx("ring")}></div>
      </div>
    </span>
  );
};

export default Loading;
