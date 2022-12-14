
import logo from "../../services/images/logo-modal.png";


import "./Modal.scss";

const Modal = ({active, setActive, children}) => {

    return (
        <div className={active ? "modal modal__active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__container modal__container-visible" : "modal__container"} onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={() => setActive(false)}>&times;</button>
                <div className="modal__logo">
                    <img src={logo} alt="logo"/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;