import MyInput from "../MyInput/MyInput";
import "./FormLogin.scss";

const FormLogin = ({openModal, closeModal}) => {
    return (
        <form className="login">
            <h2 className="login__title">Log In</h2>
            <div className="login__data">
                <MyInput type="email" id="name" text="Username or Email" />
                <MyInput type="password" id="password" text="Password" />
                <button className="login__submit" type="submit">Log In</button>
                <button className="login__btn" onClick={() => {openModal(true); closeModal(false)}}>Create an account</button>
            </div>
        </form>
    )
}

export default FormLogin;