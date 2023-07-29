import { UPDATE_PERSONAL } from "~/utils/constants";
import InputForm from "../../components/InputForm/InputForm";
import { UpdateUserData } from "../../components/config/data";
import styles from "./Personal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Personal = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Personal Information</div>
      <InputForm
        list={UpdateUserData.personal}
        type={UPDATE_PERSONAL}
        className="user-personal"
      />
    </div>
  );
};

export default Personal;
