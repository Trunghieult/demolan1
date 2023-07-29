import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";
import classNames from "classnames/bind";
import styles from "./Overview.module.scss";

import { handleAuth } from "~/store/slices/authSlice";
import Loading from "~/components/Loading/Loading";
import Notification from "~/components/Notification/Notification";
import UpLoad from "~/components/UpLoad/UpLoad";
import { resetResources } from "~/store/slices/resourceSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { UPDATE_OVERVIEW } from "~/utils/constants";

const cx = classNames.bind(styles);

const Overview = () => {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const { isLoading, info, isSuccess, isError, msg } = useSelector(
    (state) => state.auth
  );
  const { isLoading: uploadLoading } = useSelector((state) => state.resource);
  const { avatar, username, firstname, lastname, description } = info;
  const [inputValue, setInputValue] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);

  useEffect(() => {
    if (!uploadLoading) {
      dispatch(resetResources());
    }
  }, [uploadLoading, dispatch]);
  // Set Input Value when component mounted
  useEffect(() => {
    setInputValue(description);
  }, [description]);

  // Handle Input Change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      handleAuth({
        type: "updateUser",
        data: {
          description: inputValue,
        },
      })
    );
    setOpenNoti(true);
  };

  const handleClear = () => {
    window.location.reload();
  };

  const handleFocus = () => {
    setIsChanged(true);
  };

  const handleImgClick = () => {
    imgRef.current.click();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("userName-container")}>
        <div className={cx("avatar")} onClick={handleImgClick}>
          <UpLoad imgRef={imgRef} body={{ field: "avatar" }} />
          <Avatar src={avatar?.path} size={70} />
          <FontAwesomeIcon icon={faCamera} className={cx("ava-icon")} />
        </div>

        <div className={cx("userName")}>
          <div className={cx("sub-name")}>{username}</div>
          <div className={cx("name")}>{`${firstname} ${lastname}`}</div>
        </div>
      </div>
      <div className={cx("des-container")}>
        <div className={cx("title")}>Description</div>
        <div className={cx("des-detail")}>
          <textarea
            value={inputValue}
            onChange={handleChange}
            spellCheck={false}
            onFocus={handleFocus}
          />
        </div>
      </div>
      {isChanged && (
        <div className={cx("btn-container")}>
          <button className={cx("btn-save")} onClick={handleSubmit}>
            <span>Save change</span>
            {isLoading && <Loading />}
          </button>
          <button className={cx("btn-cancel")} onClick={handleClear}>
            <span>Cancel</span>
          </button>
        </div>
      )}
      {(isError || isSuccess) && (
        <Notification
          isSuccess={isSuccess}
          isError={isError}
          msg={msg}
          openNoti={openNoti}
          setOpenNoti={setOpenNoti}
          type={UPDATE_OVERVIEW}
        />
      )}
    </div>
  );
};

export default Overview;
