import React from "react";
import {InputWrapper} from "./Form.parts";
import {useFormik} from "formik";
import * as Yup from "yup";
import "./Form.css";

const REGEX_ONLY_NUMBERS = "^[0-9]+$";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(REGEX_ONLY_NUMBERS, "Phone number is not valid")
    .min(12, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const initValues = {
  name: "",
  lastName: "",
  email: "",
};

function Form() {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: validation,
    onSubmit: (values, {resetForm}) => {
      console.log("Submited", values);
      resetForm();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name ? (
          <div className="error">{errors.name}</div>
        ) : null}
      </InputWrapper>

      <InputWrapper>
        <input
          type="phone"
          name="phone"
          placeholder="Phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.phone && errors.phone ? (
          <div className="error">{errors.phone}</div>
        ) : null}
      </InputWrapper>

      <InputWrapper>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? (
          <div className="error">{errors.email}</div>
        ) : null}
      </InputWrapper>

      <button type="submit" disabled={!(isValid && dirty)}>
        Submit
      </button>
    </form>
  );
}

export default Form;
