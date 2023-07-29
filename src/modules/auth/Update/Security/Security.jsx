import styles from "./Security.module.scss";
import classNames from "classnames/bind";
import { UPDATE_SECURITY } from "~/utils/constants";
import InputForm from "../../components/InputForm/InputForm";
import { UpdateUserData } from "../../components/config/data";

const cx = classNames.bind(styles);

const Security = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Security Information</div>
      <InputForm
        list={UpdateUserData.security}
        type={UPDATE_SECURITY}
        className="user-secure"
      />
    </div>
  );
};

export default Security;
