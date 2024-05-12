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
  const formik = useFormik({
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
    <form onSubmit={formik.handleSubmit}>
      <InputWrapper>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </InputWrapper>

      <InputWrapper>
        <input
          type="phone"
          name="phone"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="error">{formik.errors.phone}</div>
        ) : null}
      </InputWrapper>

      <InputWrapper>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </InputWrapper>

      <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
        Submit
      </button>
    </form>
  );
}

export default Form;
