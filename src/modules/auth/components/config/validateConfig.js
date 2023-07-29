import * as Yup from "yup";
import { validateSpace } from "~/helpers/function";
import { STRONG_PASSWORD } from "~/utils/constants";

export const Validate = {
  login: {
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  },

  register: {
    firstname: Yup.string()
      .test((value, ctx) => validateSpace(value, ctx))
      .required("This field is required"),
    lastname: Yup.string()
      .test((value, ctx) => validateSpace(value, ctx))
      .required("This field is required"),
    username: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Please enter the correct email")
      .required("This field is required"),
    password: Yup.string()
      .matches(
        STRONG_PASSWORD,
        "Please must be 8 - 16 characters, includes uppercase letter, lowercase letter, number and special character"
      )
      .required("This field is required"),
  },
  forgotPassword: {
    email: Yup.string()
      .email("Please enter the correct email")
      .required("This field is required"),
  },

  resetPassword: {
    passwordToken: Yup.string().required("This field is required"),
    newPassword: Yup.string()
      .matches(
        STRONG_PASSWORD,
        "Password must be 8 - 16 characters, includes uppercase letter, lowercase letter, number and special character"
      )
      .required("This field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Password not match")
      .required("This field is required"),
  },

  updatePersonal: {
    firstname: Yup.string().required("This field is required"),
    lastname: Yup.string().required("This field is required"),
    dateOfBirth: Yup.string(),
    phoneNumber: Yup.string().matches(
      /^[+0-9-]{10,11}$/,
      "Please enter the correct phone number"
    ),
    gender: Yup.string(),
    nationality: Yup.string(),
  },
  updateSecurity: {
    password: Yup.string()
      .matches(STRONG_PASSWORD, "Uncorrect Password Form")
      .required("This field is required"),

    newPassword: Yup.string()
      .matches(
        STRONG_PASSWORD,
        "Password must be 8 - 16 characters, includes uppercase letter, lowercase letter, number and special character"
      )
      .required("This field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Password not match")
      .required("This field is required"),
  },
};

export const initValues = {
  login: {
    username: "",
    password: "",
  },
  register: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  },

  forgotPassword: {
    email: "",
  },

  resetPassword: {
    passwordToken: "",
    newPassword: "",
    confirmPassword: "",
  },

  updateSecurity: {
    password: "",
    newPassword: "",
    confirmPassword: "",
  },
};
