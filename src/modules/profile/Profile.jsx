import { Image } from "antd";
import React, { useEffect } from "react";
import Navbar from "~/modules/profile/nav/Navbar";
import UserInfo from "./userInfo/UserInfo";
import classNames from "classnames/bind";
import styles from "./ProfileLayout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "~/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info, otherUserInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    info._id === id && navigate("/profile/vacation");
  }, [info, id, navigate]);

  useEffect(() => {
    dispatch(getInfoUser(id));
  }, [dispatch, id]);

  return (
    <>
      <Image
        preview={false}
        rootClassName={cx("user-info-bgimg")}
        src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
      />
      <div className={cx("info")}>
        <UserInfo info={id ? otherUserInfo : info} />
        <div className={cx("container")}>
          <Navbar userId={id} />
          <Outlet context={{ userId: id }} />
        </div>
      </div>
    </>
  );
};

export default Profile;
