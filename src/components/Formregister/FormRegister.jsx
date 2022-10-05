import MyInput from "../MyInput/MyInput";
import "./FormRegister.scss";

const FormRegister = ({openModal, closeModal}) => {
    return (
        <form className="register">
            <h2 className="register__title">Create your account</h2>
            <div className="register__data">
                <MyInput type="email" id="email" text="Username or Email" />
                <MyInput type="password" id="pass" text="Password" />
                <MyInput type="phone" id="phone" text="Phone Number" />
                <button className="register__submit" type="submit">Create account</button>
            </div>
            <div className="register__footer">
                <p>Already have account?</p>
                <button className="register__btn" onClick={() => {openModal(true); closeModal(false)}}>Sign In</button>
            </div>
        </form>
    )
}

export default FormRegister;