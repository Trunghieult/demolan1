import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
import { Image, Col, Row, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar, resetList } from "~/store/slices/resourceSlice";
const cx = classNames.bind(styles);

const UserInfo = ({ info }) => {
  const dispatch = useDispatch();
  const { avatar, firstname, lastname, username, description, friends, vacations, posts, likesPost } = info;
  const otherUserId = info?._id;
  const {
    list,
    meta: { page, total },
  } = useSelector((state) => state.resource);
  const loginUserId = useSelector((state) => state.auth.info?._id);
  const isLoginUser = otherUserId === loginUserId;

  useEffect(() => {
    dispatch(resetList());
    dispatch(getAvatar(Object.assign({ page: 1 }, isLoginUser ? {} : { userId: otherUserId })));
  }, [dispatch, isLoginUser, otherUserId]);

  return (
    <div className={cx("user-info")}>
      <div className={cx("user-info-header")}>
        <Image.PreviewGroup
          items={list.map((item) => item.path)}
          preview={{
            closeIcon: null,
            toolbarRender: () => null,
            countRender: (current) => `${current}/${total}`,
            onChange: (current) => {
              list.length - current < 2 &&
                dispatch(
                  getAvatar(Object.assign({ page: page + 1 }, isLoginUser ? {} : { userId: otherUserId }))
                );
            },
          }}
        >
          <Image
            className={cx("avatar")}
            height={140}
            width={140}
            preview={{ maskClassName: cx("avatar") }}
            src={avatar?.path}
          />
        </Image.PreviewGroup>

        <Typography.Title level={4} className={cx("user-info-fullname")}>
          {lastname} {firstname}
        </Typography.Title>

        <i>
          <Typography.Text>@</Typography.Text>
          <Typography.Text copyable={{ text: `${window.location.host}/profile/${otherUserId}/vacation` }}>
            {username}
          </Typography.Text>
        </i>

        <Typography.Paragraph ellipsis={{ expandable: false, rows: 2 }} className={cx("user-info-des")}>
          {description}
        </Typography.Paragraph>

        <div className={cx("user-info-grid")}>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("one")}>
              <NavLink to="friends">
                <Typography.Paragraph className={cx("para")}>{friends}</Typography.Paragraph>
                <Typography.Paragraph className={cx("para")}>Friends</Typography.Paragraph>
              </NavLink>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("two")}>
              <NavLink to="vacation">
                <Typography.Paragraph className={cx("para")}>{vacations}</Typography.Paragraph>
                <Typography.Paragraph className={cx("para")}>Vacations</Typography.Paragraph>
              </NavLink>
            </Col>
          </Row>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("three")}>
              <Typography.Paragraph className={cx("para")}>{posts}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Posts</Typography.Paragraph>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("four")}>
              <Typography.Paragraph className={cx("para")}>{likesPost}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Likes</Typography.Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
