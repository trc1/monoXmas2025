import { observer } from "mobx-react-lite";
import buttonMono from "../assets/button-mono.png";
import { roomStore } from "../store";
import { Modal } from "./Modal";

const ChristmasLetter = observer(() => {
    if (!roomStore.showLetter) {
        return;
    }

    return (
        <Modal
            isOpen={roomStore.showLetter}
            onClose={() => roomStore.toggleShowLetter()}
            wrapperClassName={
                "modal-wrapper-letter " +
                (roomStore.showLetter ? "is-open" : "")
            }
            className="letter-content"
            isLetter
        >
            <div className="title-wrapper margin-bottom">
                <h1 className="title-letter color-dark">A small</h1>
                <h1 className="title-letter color-dark">
                    thank <span className="underline-title">You</span>
                </h1>
            </div>
            <p className="help-copy color-dark">
                This year reminded us that the best things are built together
                <br />
                with trust, care, and a shared belief in doing things right.
                <br />
                <br />
                Thank you for letting us be part of your journey,
                <br />
                and for the work we create side by side.
                <br />
                <br />
                Merry Christmas and Happy New Year from <br />
                your friends at
            </p>
            <div className="title-wrapper margin-bottom">
                <h1 className="leter-singature color-dark">Mono</h1>
            </div>
            <img
                className="button-letter"
                src={buttonMono}
                alt=""
                onClick={() => roomStore.toggleShowLetter()}
            />
        </Modal>
    );
});

export default ChristmasLetter;
