import {useState} from 'react';
import {signupFields} from "../constants/FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "../api/axios";

const SIGNUP_URL = '/users/signup'
const USER_REGEX = /^\[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);
    const [errMsg, setErrMsg] = useState("");


    const handleChange = (e) => setSignupState({...signupState, [e.target.id]: e.target.value});

    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     console.log(signupState)
    //     createAccount()
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signupState)
        const username = signupState['username'];
        const password = signupState['password'];
        if(USER_REGEX.test(username)){
            setErrMsg("Invalid username format");
            return;
        }
        if(PWD_REGEX.test(password)){
            setErrMsg("Invalid password format");
            return;
        }

        try {
            const response = await axios.post(
                SIGNUP_URL,
                JSON.stringify({username, password}),
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true,
                }
            );
            // setSuccess(true);
            console.log("true");
            // setUser("");
            // setPwd("");
            // setMatchPwd("");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            // errRef.current.focus();
            console.log("error:", err)
        }
    };


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
                <p className="text-red-700">
                    {errMsg}
                </p>
                <FormAction handleSubmit={handleSubmit} text="Signup"/>

            </div>
        </form>
    )
}