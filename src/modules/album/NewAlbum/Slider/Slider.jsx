import React, { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import "./Slider.css";
import { useDispatch, useSelector } from "react-redux";
import { addSelected } from "~/store/slices/albumSlice";
import styles from "./Slider.module.scss";
import classNames from "classnames/bind";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import albumAPI from "~/api/albumAPI";

const cx = classNames.bind(styles);

const Slider = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const [img, setImg] = useState([]);
  const cardCount = img.length;
  const {
    selectedImages,
    selectedAlbum: { vacationId, userId },
  } = useSelector((state) => state.album);
  const info = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (vacationId) {
        try {
          const fetchImg = await albumAPI.getAllImage({ id: vacationId });
          setImg(fetchImg.data.data || []);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [vacationId]);

  const prevSlide = () => {
    setActive((active - 1 + cardCount) % cardCount);
  };

  const nextSlide = () => {
    setActive((active + 1) % cardCount);
  };

  const handleAdd = (item) => {
    selectedImages.every((image) => image._id !== item._id) && dispatch(addSelected(item));
  };

  useEffect(() => {
    const cardContainers = document.querySelectorAll(`.${cx("card-container")}`);

    cardContainers.forEach((container, i) => {
      const offset = ((active - i) % cardCount) / 3;
      const direction = Math.sign(active - i);
      const absOffset = Math.abs(active - i) / 3;
      const isActive = i === active ? 1 : 0;
      const opacity = Math.abs(active - i) <= 1 ? 1 : 0;

      container.style.setProperty("--offset", offset);
      container.style.setProperty("--direction", direction);
      container.style.setProperty("--abs-offset", absOffset);
      container.style.setProperty("--active", isActive);
      container.style.setProperty("--opacity", opacity);
    });
  }, [active, cardCount]);

  return (
    <div className={cx("carousel-container")}>
      {cardCount !== 0 && userId === info.info._id ? (
        <div className={cx("carousel")}>
          {img.map((item, index) => {
            const isSelected = selectedImages.some((image) => image._id === item._id);
            return (
              <div className={cx("card-container")} key={index}>
                <div className={cx("card")}>
                  <img src={item?.path} alt="?" />
                  <button onClick={() => handleAdd(item)} disabled={isSelected} className={cx("btn")}>
                    {isSelected ? "Selected" : "Select this image"}
                  </button>
                </div>
              </div>
            );
          })}
          <button className={cx("nav-left")} onClick={prevSlide}>
            <LeftCircleFilled />
          </button>
          <button className={cx("nav-right")} onClick={nextSlide}>
            <RightCircleFilled />
          </button>
        </div>
      ) : (
        <div className={cx("no-picture")}>No pictures available.</div>
      )}
    </div>
  );
};

export default Slider;
