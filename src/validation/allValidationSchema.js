import * as yup from "yup";

export const signUpSchema = yup.object({
    username: yup
        .string('Enter Username')
        .max(20, 'Username can\'t be more than 20 characters')
        .required('required')
    ,
    password: yup
        .string('Enter Password')
        .min(6, 'Password must be at least 6 characters')
        .required('required')
    ,
    confirmPassword: yup
        .string('Enter Confirm Password').required('required')
        .oneOf([yup.ref('password'), null], 'Password and Confirmation must be equal')
    ,
})