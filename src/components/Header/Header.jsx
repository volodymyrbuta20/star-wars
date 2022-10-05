import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import "./Header.scss"
import logo from "../../services/images/sw-logo.png"

const Header = ({openLoginModal, openRegisterModal}) => {

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
                <div className="header__login">
                    <button onClick={() => openLoginModal(true)}>Log in</button>
                    <p> &nbsp; / &nbsp; </p>
                    <button onClick={() => openRegisterModal(true)}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Header;