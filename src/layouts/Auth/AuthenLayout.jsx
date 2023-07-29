import styles from "./AuthenLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const AuthenLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>{children}</div>
    </div>
  );
};

export default AuthenLayout;
