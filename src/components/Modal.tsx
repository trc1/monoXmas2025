import { useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    isLetter?: boolean;
};

export const Modal = ({
    isOpen,
    onClose,
    children,
    className,
    wrapperClassName,
    isLetter,
}: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div
            className={"modal-wrapper " + (wrapperClassName || "")}
            onClick={onClose}
        >
            <div
                className={
                    isLetter ? "letter-content" : "modal-content " + className
                }
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};
