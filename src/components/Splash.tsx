import Logo from "../assets/mono-logo.svg";
import buttonStart from "../assets/button-start.png";
import { roomStore } from "../store";

const Splash = () => {
    return (
        <div className="splash-wrapper">
            <img className="logo" src={Logo} alt="" />
            <div className="title-wrapper">
                <p className="splash-copy color-light">A very</p>
                <h1 className="title-splash color-light">Mono</h1>
                <h1 className="title-splash color-light">Christmas</h1>
            </div>
            <p className="splash-copy color-light">
                Santa Claus is on his way, and the air is filled with holiday
                magic.
                <br />
                Create the perfect atmosphere to welcome him.
            </p>
            <img
                onClick={() => roomStore.startGame()}
                className="button-start"
                src={buttonStart}
                alt=""
            />
        </div>
    );
};

export default Splash;
