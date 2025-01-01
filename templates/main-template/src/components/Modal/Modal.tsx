import { ReactNode } from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button.tsx";
import { FaXmark } from "react-icons/fa6";
import "./Modal.css"

type ModalProps = {
    children: ReactNode;
    show: boolean;
    onClose: () => void;
    title?: string;
    footerButton?: ReactNode;
    noCloseButton?: boolean;
};

const Modal = ({ children, show, onClose, title, footerButton, noCloseButton }: ModalProps) => {
    if (!show) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal-wrapper backdrop-blur-md">
            <div className="modal">
                <div className="w-full">
                    {!noCloseButton && (<Button className="top-2 right-2 absolute" type="icon" onClick={onClose}><FaXmark size={20} /></Button>)}
                    <div className="modal-header">
                        <h2 className="modal-title">{title}</h2>
                    </div>
                    <div className="modal-content">{children}</div>
                </div>
                {footerButton ? (
                    <div className="modal-footer">
                        {footerButton}
                    </div>
                ) : null}
            </div>
        </div>
        , document.body
    );
};

export default Modal;