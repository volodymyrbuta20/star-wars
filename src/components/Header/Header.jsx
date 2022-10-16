import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaRegUser} from "react-icons/fa";
import "./Header.scss"
import logo from "../../services/images/sw-logo.png"

const Header = ({openLoginModal, openRegisterModal, setLogged, logged}) => {

    return (
        <div className="header">
            <div className="header__wrapper">
                <div className="header__social">
                    <ul className="header__social--links">
                        <li>
                            <a href="#"><FaFacebook/></a>
                        </li>
                        <li>
                            <a href="#"><FaYoutube/></a>
                        </li>
                        <li>
                            <a href="#"><FaInstagram/></a>
                        </li>
                        <li>
                            <a href="#"><FaTwitter/></a>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="header__logo">
                    <img src={logo} alt="logo" />
                </Link>
                {logged.login
                    ?
                <div className="header__name">
                    <FaRegUser/>
                    <p>{logged.display}</p>
                    <button onClick={() => setLogged({display: "", login: false})}>Log Out</button>
                </div>
                    :
                <div className="header__login">
                    <button onClick={() => openLoginModal(true)}>Log in</button>
                    <button onClick={() => openRegisterModal(true)}>Sign Up</button>
                </div>}
            </div>
        </div>
    )
}

export default Header;