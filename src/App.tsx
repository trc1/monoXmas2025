import Snowfall from "react-snowfall";
import "./style/app.scss";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

function App() {
    return (
        <>
            <Canvas
                shadows="variance" /* camera={{ position: [0, 3, 8], fov: 30, rotation: [10, 10, 20] }} */
            >
                <Scene />
            </Canvas>
            <Snowfall snowflakeCount={20} style={{ opacity: 0.8 }} />
        </>
    );
}

export default App;
