import styles from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const Button = (props) => {
  const { className, type, children } = props;
  return (
    <button className={cx(className)} type={type}>
      {children}
    </button>
  );
};

export default Button;
