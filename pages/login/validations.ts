import * as Yup from "yup";

export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string().required("Name is required, Mr. X 🤪"),
  email: Yup.string()
    .required("Email is required 😅")
    .email("Email is invalid 🧐"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters long 😒")
    .required("Password is required 😅"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match 🧐 !!")
    .required("Confirm Password is required too. Don't forget 😊"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "Hey! you need to accept the terms to register 😁"
  ),
});

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .required("Email is required 😅")
    .email("Email is invalid 🧐"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters long 😒")
    .required("Password is required 😅"),
});
