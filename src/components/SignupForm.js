import {useState} from 'react';
import {signupFields} from "../constants/FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "../api/axios";
import {useFormik} from "formik";
import {signUpSchema} from "../validation/allValidationSchema";

const SIGNUP_URL = 'users/signup'


const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.name] = '');

const messageClass = "flex p-2 mb-2 text-sm rounded-lg font-small"
const errClass = " text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
const successClass = " text-green-800  bg-green-50 dark:bg-gray-800 dark:text-green-400"
const resultClass = messageClass + successClass
export default function Signup() {
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
                    SIGNUP_URL,
                    JSON.stringify(user)
                );
                console.log(response)
                setMsg("Successful Signup");
                resetForm({values: ''})
            } catch (err) {

                console.log(err.response.data.error)
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
            <FormAction text="Signup"/>
            {msg ? <div className={resultClass}>{msg}</div> : null}
        </form>
    )
}