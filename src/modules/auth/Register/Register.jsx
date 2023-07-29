import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import InputForm from "../components/InputForm/InputForm";
import { RegisterData } from "../components/config/data";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "~/utils/constants";

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();

  // Handle Route
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Register</div>
      <InputForm list={RegisterData} type={REGISTER} url="/login" />
      <div className={cx("direct")}>
        If you have an account, please change to{" "}
        <span onClick={handleNavigate}>login</span>
      </div>
    </div>
  );
};

export default Register;
