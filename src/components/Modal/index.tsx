import React, { useRef, useEffect, FC } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css'

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
}

const Modal: FC<ModalProps> = ({ children, isOpen }) => {
    const elRef = useRef<HTMLDivElement | null>(null);

    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        if (modalRoot && isOpen) {
            modalRoot.appendChild(elRef.current!);
            document.body.style.overflow = "hidden";
        }

        return () => {
            if (modalRoot) {
                modalRoot.removeChild(elRef.current!);
                document.body.style.overflow = "";
            }
        };
    }, [isOpen]);

    return isOpen ? createPortal(<div className={styles.modal}>{children}</div>, elRef.current) : null;
};

export default Modal;