import { useRef, useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef(null);

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div 
                className=""
                ref={modalRef}
            >
                {title & 
                    <h1 className="">
                        {title}
                    </h1>
                }
                {children}
            </div>
        </div>
    );
};

export default Modal;