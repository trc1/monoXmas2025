import { createPortal } from "react-dom";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { roomStore } from "../store";
import buttonClose from "../assets/button-close.png";
import letterBg from "../assets/letter-bg.png";

const Objective = observer(() => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (roomStore.boardClicked) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [roomStore.boardClicked]);

    if (!roomStore.boardClicked) {
        return null;
    }

    const handleClose = () => {
        roomStore.toggleBoard();
    };

    const modalContent = (
        <div className="modal-wrapper" onClick={handleClose}>
            <div
                className={`modal-content ${isVisible ? 'modal-content-visible' : ''}`}
                style={{ backgroundImage: `url(${letterBg})` }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="title-wrapper margin-bottom">
                    <h1 className="title-modal color-dark">How to Welcome</h1>
                    <h1 className="title-modal color-dark">a Holiday Guest</h1>
                </div>
                <p className="help-copy color-dark">
                    Before Santa Claus will pay a call,
                    <br />
                    The room must feel like Christmas after all.</p>
                    <p className="help-copy color-dark">
                    First, hush the glow of{" "}
                    <span className="underline-a">lamps</span> nearby,
                    <br />
                    Let softer shadows fill the sky.</p>
                    <p className="help-copy color-dark">
                    Set the <span className="underline-b">gramophone</span>{" "}
                    spinning slow,
                    <br />
                    A tune that only winter knows.</p>
                    <p className="help-copy color-dark">
                    Wake <span className="underline-a">the fire</span>, let
                    flames ignite,
                    <br />
                    Warmth and cheer throughout the night.</p>
                    <p className="help-copy color-dark">
                    Dress <span className="underline-b">the tree</span> in
                    twinkling light
                    <br />
                    Then pause… and wait just out of sight.</p>
                    <p className="help-copy color-dark">
                    In silent seconds, listen close...
                    <br />A gentle knock… Santa's at the door.
                </p>
                <img
                    className="button-close"
                    src={buttonClose}
                    alt="Close"
                    onClick={handleClose}
                />
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
});

export default Objective;
