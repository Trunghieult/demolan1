import { useEffect, useState } from "react";
import axiosClient from "~/api/axiosClient";
import styles from "./SelectField.module.scss";
import classNames from "classnames/bind";
import { ErrorMessage } from "formik";
const cx = classNames.bind(styles);

const SelectField = (props) => {
  const { field, label, options, onFocus, required } = props;
  const [selectList, setSelectList] = useState(options || []);
  // Get name & value of Input
  const { name, value } = field;

  //   console.log(value);
  useEffect(() => {
    if (name === "nationality") {
      const fetchAPi = async () => {
        const url = "https://vacation-social-network.onrender.com/location?type=level&number=4";
        const res = await axiosClient.get(url);
        setSelectList(res.data.data);
      };
      fetchAPi();
    }
  }, []);

  const handleSelectOption = (e) => {
    console.log(e.target.value);
    const selectedValue = e.target.value;

    const changeEvent = {
      target: {
        name,
        value: selectedValue,
      },
    };

    field.onChange(changeEvent);
  };

  //label Classes
  const labelClasses = cx("label", {
    ["active"]: value !== "" && "active",
    ["required"]: required && "required",
  });

  return (
    <div className={cx("wrapper")}>
      <select
        {...field}
        onChange={handleSelectOption}
        className={cx("select")}
        value={value === undefined ? "default" : value}
        onFocus={onFocus}
      >
        <option value="default" disabled hidden>
          Select your {name}
        </option>
        {selectList.map((item, index) => (
          <option key={index} name={item.title} value={item.title}>
            {item.title}
          </option>
        ))}
      </select>
      <label className={labelClasses}>{label}</label>
      <ErrorMessage name={name} render={(msg) => <p className={cx("error")}>{msg}</p>} />
    </div>
  );
};

export default SelectField;
