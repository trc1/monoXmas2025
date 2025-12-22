import Logo from "../assets/mono-logo.svg";
import buttonStart from "../assets/button-start.png";
import { roomStore } from "../store";

const Splash = () => {
    return (
        <main>
            <div className="splash-wrapper">
                <img className="logo" src={Logo} alt="" />
                <div className="title-wrapper">
                    <p className="splash-copy color-light">A very</p>
                    <h1 className="title-splash color-light">Mono</h1>
                    <h1 className="title-splash color-light">Christmas</h1>
                </div>
                <p className="splash-copy color-light">
                    Santa Claus is on his way, and the air is filled with holiday
                    magic.&nbsp;
                    <br className="hide-mobile"/>
                    Create the perfect atmosphere to welcome him.
                    <br />
                    <span className="sound-reminder">Best experienced with sound.</span>
                </p>
                <img
                    onClick={() => roomStore.startGame()}
                    className="button-start"
                    src={buttonStart}
                    alt=""
                />
            </div>
        </main>
    );
};

export default Splash;
