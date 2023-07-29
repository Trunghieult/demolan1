import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import "./Preloader.scss";
import Image from "./Image/Image";
import {
  createAlbumPage,
  getAlbumPage,
  updateAlbumPage,
  resetSelectedImages,
  getDetail,
} from "~/store/slices/albumSlice";
const cx = classNames.bind(styles);

const NewAlbum = () => {
  const albumId = useParams().id;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const navigate = useNavigate();
  const {
    selectedImages,
    selectedPageId,
    userInfo,
    selectedAlbum: { _id, title, vacationId, userId },
  } = useSelector((state) => state.album);
  const { info } = useSelector((state) => state.auth);
  const [containerSize, setContainerSize] = useState({
    outerWidth: 0,
    outerHeight: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setContainerSize({
      outerWidth: ref.current.offsetWidth,
      outerHeight: ref.current.offsetHeight,
    });
  }, [ref]);

  useEffect(() => {
    if (albumId) {
      dispatch(getDetail({ id: albumId }));
      dispatch(getAlbumPage({ page: 1, albumId: albumId }));
    }
    dispatch(resetSelectedImages());
  }, [dispatch, albumId]);

  const saveAlbum = () => {
    (albumId
      ? dispatch(
          updateAlbumPage({
            albumpageId: selectedPageId,
            albumId: _id,
            vacationId: vacationId,
            page: 1,
            resource: selectedImages.map((item) => ({
              style: item.style,
              resourceId: item._id,
            })),
          })
        )
      : dispatch(
          createAlbumPage({
            albumId: _id,
            vacationId: vacationId,
            page: 1,
            resource: selectedImages.map((item) => {
              return {
                style: item.style,
                resourceId: item._id,
              };
            }),
          })
        )
    ).then(() => navigate("/profile/album"));
  };

  const handleWrapClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className={`wrap ${isOpen ? "open" : ""}`}>
        <div className="overlay" onClick={handleWrapClick}>
          <div className="overlay-content animate slide-left delay-2">
            <h1 className="animate slide-left pop delay-4 line">{title}</h1>
            <p className="animate slide-left pop delay-5" style={{ color: "white", marginBottom: "2.5rem" }}>
              Sign: <em>{userInfo?.username}</em>
            </p>
          </div>
          <div className="image-content animate slide delay-5"></div>
          <div className="dots animate">
            <div className="dot animate slide-up delay-6"></div>
            <div className="dot animate slide-up delay-7"></div>
            <div className="dot animate slide-up delay-8"></div>
          </div>
        </div>
        <div className="text">
          <div className={cx(userId === info._id ? "mother" : "mother-banned-you")} ref={ref}>
            {selectedImages.map((item) => (
              <Image key={item._id} imgData={item} containerSize={containerSize} />
            ))}
          </div>
        </div>
      </div>
      <Slider />
      {userId === info._id && (
        <button
          disabled={selectedImages.length === 0}
          type="button"
          className={cx("save-btn")}
          onClick={saveAlbum}
        >
          Save
        </button>
      )}
    </>
  );
};

export default NewAlbum;
