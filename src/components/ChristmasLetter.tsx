import { observer } from "mobx-react-lite";
import buttonMono from "../assets/button-mono.png";
import { roomStore } from "../store";

const ChristmasLetter = observer(() => {
    if (!roomStore.showLetter) {
        return;
    }

    return (
        <div
            className="modal-wrapper modal-wrapper-letter"
            onClick={() => roomStore.toggleShowLetter()}
        >
            <div className="letter-content">
                <div className="title-wrapper margin-bottom">
                    <h1 className="title-letter color-dark">A small</h1>
                    <h1 className="title-letter color-dark">
                        thank <span className="underline-title">You</span>
                    </h1>
                </div>
                <p className="help-copy color-dark">
                    This year reminded us that the best things are built
                    together
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
            </div>
            <img className="button-letter" src={buttonMono} alt="" />
        </div>
    );
});

export default ChristmasLetter;
