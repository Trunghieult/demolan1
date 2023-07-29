import styles from "./Retrieval.module.scss";
import classNames from "classnames/bind";
import images from "~/images";
import { FORGOT, RESET } from "~/utils/constants";
import InputForm from "../../components/InputForm/InputForm";

const cx = classNames.bind(styles);
const Retrieval = (props) => {
  const { list, handleRoute, length, handleBack } = props;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <img src={images.key} alt="This is icon" />
        <div className={cx("title")}>Forgot your password?</div>
        <div>Don’t worry we will send you reset code</div>
      </div>

      <InputForm
        list={list}
        type={length === 2 ? FORGOT : RESET}
        handleRoute={handleRoute}
      />

      <div className={cx("footer")}>
        <img src={images.back} alt="This is icon" />
        Back to <span onClick={handleBack}>login</span>
      </div>
    </div>
  );
};

export default Retrieval;
