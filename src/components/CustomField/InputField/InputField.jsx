import { ErrorMessage } from "formik";
import styles from "./InputField.module.scss";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const InputField = (props) => {
  const { field, form, type, label, className, onFocus, required } = props;
  const [show, setShow] = useState(false);
  const inputRef = useRef();
  // Get name & value of Input
  const { name, value } = field;
  const { errors, touched } = form;
  // Check error
  const showError = errors[name] && touched[name];
  // Check name field when register
  const isName = name === "firstname" || name === "lastname";

  // wrapper's classes
  const classes = cx("wrapper", {
    [className]: className,
    userName: isName && "userName",
  });

  // input's classes
  const inputClasses = cx("input", {
    "userName-input": isName && "userName-input",
    empty: value === "" && "empty",
  });

  const labelClasses = cx("label", {
    active: value !== "" && "active",
    required: required && "required",
  });

  const handleHide = () => {
    setShow(false);
    inputRef.current.type = show ? "password" : "text";
  };

  const handleShow = () => {
    setShow(true);
    console.log(show);
    inputRef.current.type = show ? "password" : "text";
  };
  // console.log(inputRef.current.type);
  return (
    <div className={classes}>
      <input
        {...field}
        type={type}
        style={showError && { border: "1px solid blue" }}
        autoComplete="off"
        className={inputClasses}
        value={value ? (isName ? value : value.trim()) : ""}
        spellCheck={false}
        onFocus={onFocus}
        ref={inputRef}
      />
      {type === "password" ? (
        show ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className={cx("icon")}
            onClick={handleHide}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            className={cx("icon")}
            onClick={handleShow}
          />
        )
      ) : (
        ""
      )}
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <ErrorMessage
        name={name}
        render={(msg) => <p className={cx("error")}>{msg}</p>}
      />
    </div>
  );
};

export default InputField;
