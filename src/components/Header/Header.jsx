import "./Header.scss"
import logo from "../../services/images/sw-logo.png"

const Header = () => {
    return (
        <div className="header">
            <div className="header__logo">
                <img src={logo} alt="logo" />
            </div>
        </div>
    )
}

export default Header;