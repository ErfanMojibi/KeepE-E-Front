import {useState} from 'react';
import {loginFields} from "../constants/FormFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import {useFormik} from "formik";
import {signUpSchema} from "../validation/allValidationSchema";
import axios from "../api/axios";

const LOGIN_URL = 'users/login'

const fields = loginFields;

let fieldsState = {};
fields.forEach(field => fieldsState[field.name] = '');


const messageClass = "flex p-2 mb-2 text-sm rounded-lg font-small"
const errClass = " text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
const successClass = " text-green-800  bg-green-50 dark:bg-gray-800 dark:text-green-400"
const resultClass = messageClass + successClass

export default function Login() {
    const [msg, setMsg] = useState('')


    const formik = useFormik({
        initialValues: fieldsState,
        validationSchema: signUpSchema,

        onSubmit: async (values, {resetForm}) => {
            const user = {
                username: values['username'],
                password: values['password']
            }
            try {
                const response = await axios.post(
                    LOGIN_URL,
                    JSON.stringify(user)
                );
                console.log(response)
            } catch (err) {
                setMsg(err.response.data.error)
            }

        }
    });


    return (
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            {
                fields.map(field =>
                    <div>
                        <Input
                            key={field.id}
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
                                className={messageClass + errClass}
                                role="alert">

                                {formik.errors[field.name]}
                            </div>
                        ) : null}
                    </div>
                )
            }
            <FormAction text="Login"/>
            {msg ? <div className={messageClass + errClass}>{msg}</div> : null}
        </form>
    )
}