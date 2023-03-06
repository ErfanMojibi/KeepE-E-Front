import { useState } from "react";
import { loginFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useFormik } from "formik";
import { loginSchema } from "../validation/allValidationSchema";
import axios from "../api/axios";
import { successToast, errToast } from "../toast/customToast";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "users/login";

const fields = loginFields;

let fieldsState = {};
fields.forEach((field) => (fieldsState[field.name] = ""));

const messageClass = "flex p-2 mb-2 text-sm rounded-lg font-small";
const errClass = " text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400";
const successClass =
  " text-green-800  bg-green-50 dark:bg-gray-800 dark:text-green-400";
const resultClass = messageClass + successClass;

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: fieldsState,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("marg");
      const user = {
        username: values["username"],
        password: values["password"],
      };
      try {
        const response = await axios.post(LOGIN_URL, JSON.stringify(user));
        console.log(response);
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("username", user.username);
        successToast("Successful Login");
        navigate("/notes");
      } catch (err) {
        errToast(err.response.data.error);
      }
    },
  });

  return (
    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <div key={field.id}>
          <Input
            key={field.name}
            handleChange={formik.handleChange}
            value={formik.values[field.name]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
          {formik.errors[field.name] && formik.touched[field.name] ? (
            <div
              key={field.name + "error"}
              className={messageClass + errClass}
              role="alert"
            >
              {formik.errors[field.name]}
            </div>
          ) : null}
        </div>
      ))}
      <FormAction text="Login" />
    </form>
  );
}
