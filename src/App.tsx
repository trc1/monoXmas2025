import Snowfall from "react-snowfall";
import "./style/app.scss";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import * as THREE from "three";

function App() {
    return (
        <>
            <Canvas
                shadows="variance" /* camera={{ position: [0, 3, 8], fov: 30, rotation: [10, 10, 20] }} */
                dpr={[1, 2]}
                gl={{
                    toneMappingExposure: 1.05,
                }}
            >
                <Scene />
            </Canvas>
            <Snowfall snowflakeCount={20} style={{ opacity: 0.8 }} />
        </>
    );
}

export default App;
