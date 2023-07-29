import React from "react";
import ReactModal from "react-modal";
import styles from "./Notification.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import {
  FORGOT,
  LOGIN,
  REGISTER,
  RESET,
  UPDATE_OVERVIEW,
  UPDATE_PERSONAL,
  UPDATE_SECURITY,
} from "~/utils/constants";

const cx = classNames.bind(styles);
const Notification = (props) => {
  const {
    openNoti,
    setOpenNoti,
    url,
    type,
    msg,
    isSuccess,
    isError,
    handleRoute,
  } = props;
  console.log(isSuccess);
  const navigate = useNavigate();
  function handleSucces() {
    switch (type) {
      case FORGOT:
        handleRoute();
        break;
      case RESET:
        window.location.reload();
        break;
      case LOGIN:
      case REGISTER:
        navigate(url);
        window.location.reload();
        break;
      case UPDATE_PERSONAL:
      case UPDATE_SECURITY:
      case UPDATE_OVERVIEW:
        window.location.reload();

      default:
        // window.location.reload();
        break;
    }
  }

  const handleClose = () => {
    isSuccess && handleSucces();
    setOpenNoti(false);
  };
  const Success = () => {
    return (
      <div className={cx("success-box")}>
        <div className={cx("face")}>
          <div className={cx("eye")}></div>
          <div className={cx("eye", "right")}></div>
          <div className={cx("mouth", "happy")}></div>
        </div>
        <div className={cx("shadow", "scale")}></div>
        <div className={cx("message")}>
          <h1 className={cx("alert")}>Success!</h1>
          <p>{msg}</p>
        </div>
        <button className={cx("button-box")} onClick={handleClose}>
          <h1 className={cx("green")}>OK</h1>
        </button>
      </div>
    );
  };
  const Error = () => {
    return (
      <div className={cx("error-box")}>
        <div className={cx("face2")}>
          <div className={cx("eye")}></div>
          <div className={cx("eye", "right")}></div>
          <div className={cx("mouth", "sad")}></div>
        </div>
        <div className={cx("shadow", "move")}></div>
        <div className={cx("message")}>
          <h1 className={cx("alert")}>Error!</h1>
          <p>{msg}</p>
        </div>
        <button className={cx("button-box")} onClick={handleClose}>
          <h1 className={cx("red")}>Close</h1>
        </button>
      </div>
    );
  };

  return (
    <ReactModal
      isOpen={openNoti}
      onRequestClose={() => setOpenNoti(false)}
      className={cx("modal")}
      overlayClassName={cx("overlay")}
    >
      {isSuccess && <Success />}
      {isError && <Error />}
    </ReactModal>
  );
};

export default Notification;
