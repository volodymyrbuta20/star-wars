import { useState } from "react";
import "./FormLogin.scss";

const FormLogin = ({openModal, closeModal, users, setLogged}) => {

    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const {name, password} = e.target;

        for (let user of users) {
            if ((name.value === user.nickName || name.value === user.email) && password.value === user.password) {
                setLogged({display: user.nickName, login: true})
                closeModal(false)
                name.value = "";
                password.value = "";
                return
            }
        }
        setError(true)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2 className="login__title">Log In</h2>
            <div className="login__data">
                <input
                    type="text" 
                    id="name" 
                    name="name"
                    placeholder="Username or Email" 
                />
                <input
                    type="password" 
                    id="password"
                    name="password"
                    placeholder="Password" 
                />
                <p className={error ? "login__error show" : "login__error"}>Wrong password or email</p>
                <button 
                    className="login__submit" 
                    type="submit">
                        Log In
                </button>
                <button 
                    className="login__btn" 
                    onClick={() => {openModal(true); closeModal(false)}}>
                        Create an account
                </button>
            </div>
        </form>
    )
}

export default FormLogin;