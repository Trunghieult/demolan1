import { Empty } from "antd";
import styles from "./EmptyRes.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const EmptyRes = ({ description }) => {
  return (
    <Empty
      description={description || "We didn't find any results"}
      className={cx("empty")}
    />
  );
};

export default EmptyRes;
