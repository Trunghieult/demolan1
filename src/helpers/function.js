import * as Yup from "yup";

export function validateSpace(value, ctx) {
  if (!!value && (value.startsWith(" ") || value.endsWith(" "))) {
    return ctx.createError({ message: "Please don't start or end with space" });
  }

  return true;
}

export function getDate(str) {
  if (str) {
    const result = str.slice(0, str.indexOf("T"));
    return result;
  }
}
