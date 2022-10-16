import  {Formik, Field, Form, ErrorMessage} from "formik";
import { useState } from "react";
import * as Yup from "yup";

import "./FormRegister.scss";

const FormRegister = ({openModal, closeModal, setIsSuccess, setUsers}) => {

    const handleSubmit = (values, {resetForm}) => {
        setIsSuccess(true)
        setUsers(users => [...users, values])
        closeModal(false)
        resetForm({values: ""})
        
    }

    return (
        <Formik
            initialValues = {{
                firstName: "",
                lastName: "",
                nickName: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            validationSchema = {Yup.object({
                firstName: Yup.string()
                    .min(2, "At least 2 symbols")
                    .required("This field is required"),
                lastName: Yup.string()
                    .min(2, "At least 2 symbols")
                    .required("This field is required"),
                nickName: Yup.string()
                    .required("This field is required"),
                email: Yup.string()
                    .email("Wrong format")
                    .required("This field is required"),
                password: Yup.string()
                    .required("This field is required")
                    .matches(
                        /^(?=.*[a-z])(?=.*[0-9])(?=.{6,})/,
                        "Must Contain 6 Characters, One Letter, One Number"
                    ),
                confirmPassword: Yup.string()
                    .required("This field is required")
                    .oneOf([Yup.ref('password')], 'Passwords does not match'),
            })}
            onSubmit = {handleSubmit}>
            <Form className="register">
                <h2 className="register__title">Create your account</h2>
                <div className="register__data">
                    <Field 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        placeholder="First Name"/>
                    <ErrorMessage component="div" className="error" name="firstName"/>
                    <Field 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Last Name"/>
                    <ErrorMessage component="div" className="error" name="lastName"/>
                    <Field 
                        type="text" 
                        id="nickName" 
                        name="nickName" 
                        placeholder="Nickname"/>
                    <ErrorMessage component="div" className="error" name="nickName"/>
                    <Field 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email"/>
                    <ErrorMessage component="div" className="error" name="email"/>
                    <Field 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Password"/>
                    <ErrorMessage component="div" className="error" name="password"/>
                    <Field 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Confirm Password"/>
                    <ErrorMessage component="div" className="error" name="confirmPassword"/>
                    <button 
                        className="register__submit" 
                        type="submit">
                            Create account
                    </button>
                </div>
                <div className="register__footer">
                    <p>Already have account?</p>
                    <button 
                        type="button"
                        className="register__btn" 
                        onClick={() => {openModal(true); closeModal(false)}}>
                            Sign In
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default FormRegister;