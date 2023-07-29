import React from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
ReactModal.setAppElement("#root");
const Modal = ({
  children,
  open,
  setOpen,
  title,
  className,
  handleAfterClose,
}) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={() => {
        setOpen(false);
        handleAfterClose && handleAfterClose();
      }}
      className={cx("modal", className)}
      overlayClassName={cx("overlay")}
    >
      <h2 className={cx("title")}>{title}</h2>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className={cx("close-icon")}
        onClick={() => {
          setOpen(false);
          handleAfterClose && handleAfterClose();
        }}
      />
      <div className={cx("wrapper")}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
