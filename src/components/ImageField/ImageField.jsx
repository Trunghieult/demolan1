import { useState, forwardRef } from "react";
import images from "~/images";
import classNames from "classnames/bind";
import { Image } from "antd";
import styles from "./ImageField.module.scss";

const cx = classNames.bind(styles);
const ImageField = ({
  alt,
  src,
  className,
  fallback: customFallback = images.noImage,
  preview,
  rootClassName,
}) => {
  const [fallback, setFallback] = useState("");
  const emptyImage = images.noImage;
  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <Image
      className={cx(className)}
      rootClassName={cx(rootClassName)}
      src={src ? src : emptyImage}
      preview={preview}
      fallback={fallback}
      onError={handleError}
    />
  );
};

export default ImageField;
