import Header from "~/layouts/components/Header/Header";
import Footer from "~/layouts/components/Footer/Footer";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getInfoUser } from "~/store/slices/authSlice";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.auth);
  const { size } = useSelector((state) => state.general);
  const isSmallSize = size.width <= 576;
  const [pre, setPre] = useState(true);
  useEffect(() => {
    if (isLogin) {
      dispatch(getInfoUser());
    } else {
      navigate("/login");
    }
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={cx("wrapper")}>
      <>
        <Header />
        <div className={cx("container")}>{children}</div>
        {isSmallSize && <Footer />}
      </>
    </div>
  );
};

export default DefaultLayout;
