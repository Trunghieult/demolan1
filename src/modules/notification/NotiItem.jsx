import React from "react";
import moment from "moment";
import { Row, Col, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./Noti.module.scss";
import classNames from "classnames/bind";
import LikeComment from "./content/LikeComment";
import AddFriend from "./content/AddFriend";
import { updateOne } from "~/store/slices/notiSlice";
import { useDispatch } from "react-redux";
import vacationAPI from "~/api/vacationAPI";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const NotiItem = ({ item }) => {
  const { id, modelInfo, isSeen, lastUpdateAt, userInfo } = item;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSeenStatus = async () => {
    dispatch(updateOne(id));
    if (modelInfo.type === "friends") navigate(`/profile/friends`);
    else {
      try {
        const result = await vacationAPI.getOnePost(modelInfo._id);
        const { vacationId } = result.data.data;
        navigate(`/vacation?vacationID=${vacationId}`);
      } catch (error) {
        navigate("notfound");
      }
    }
  };

  return (
    <Row className={cx("noti-item")} onClick={handleSeenStatus}>
      <Col span={1} offset={1} style={{ margin: "0px 3px" }}>
        <Avatar src={userInfo?.avatar?.path} icon={<UserOutlined />} size="middle"></Avatar>
      </Col>

      <Col span={19} offset={1}>
        {modelInfo.type === "friends" ? <AddFriend item={item} /> : <LikeComment item={item} />}
        <Typography.Text className={cx("datetime")}>
          {moment(new Date(lastUpdateAt.seconds * 1000 + lastUpdateAt.nanoseconds / 100000)).fromNow()}
        </Typography.Text>
      </Col>

      <Col span={1} offset={1}>
        {!isSeen && <div className={cx("seen")}></div>}
      </Col>
    </Row>
  );
};

export default NotiItem;
