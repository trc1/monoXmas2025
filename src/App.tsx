import Snowfall from "react-snowfall";
import "./style/app.scss";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import Splash from "./components/Splash";
import { roomStore } from "./store";
import { observer } from "mobx-react-lite";
import Objective from "./components/Objective";

function App() {
    return (
        <>
            <Objective />
            {!roomStore.isGameStarted ? (
                <Splash />
            ) : (
                <Canvas
                    shadows="variance" /* camera={{ position: [0, 3, 8], fov: 30, rotation: [10, 10, 20] }} */
                >
                    <Scene />
                </Canvas>
            )}
            <Snowfall snowflakeCount={20} style={{ opacity: 0.8 }} />
        </>
    );
}

export default observer(App);
