import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

import "./Footer.scss"

import vader from "../../services/images/vader-footer.jpg"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__img">
                <img src={vader} alt="darth"/>
            </div>
            <p className="footer__author">Created and designed by Vova Buta</p>
            <Link to="https://github.com/volodymyrbuta20">Follow my GitHub <FaGithub/></Link>
            <p className="footer__quote">All names and images are copyright from SWAPI and Wookiepedia</p>
        </div>
    )
}

export default Footer;