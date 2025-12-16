import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useDeviceType } from "../utils/useDeviceType";
import { Environment } from "@react-three/drei/core/Environment";
import Room from "./Room";
import { Stats } from "@react-three/drei/core/Stats";
import { OrthographicCamera } from "@react-three/drei/core/OrthographicCamera";
import { Group } from "three";

const Scene = () => {
    /* const controlsRef = useRef(null); */
    const groupRef = useRef<Group>(null);
    /* const { camera } = useThree(); */
    const mousePosition = useRef({ x: 0, y: 0 });
    const touchPosition = useRef({ x: 0, y: 0 });
    const { isMobile, isTablet } = useDeviceType();
    const deviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
    /* 
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "c") {
                console.log("Camera Position:", camera.position.toArray());
                console.log("Camera Rotation:", camera.rotation.toArray());
                console.log("Camera Zoom:", camera.zoom);
                if (controlsRef.current) {
                    console.log(
                        "Controls Target:",
                        controlsRef.current?.target?.toArray()
                    );
                }
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [camera]); */

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position to -1 to 1 range
            mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                touchPosition.current.x =
                    (touch.clientX / window.innerWidth) * 2 - 1;
                touchPosition.current.y =
                    -(touch.clientY / window.innerHeight) * 2 + 1;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, {
            passive: true,
        });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            // Smoothly rotate based on mouse or touch position
            const position =
                isMobile || isTablet
                    ? touchPosition.current
                    : mousePosition.current;
            groupRef.current.rotation.y = position.x * (isMobile ? 0.2 : 0.07);
            /* groupRef.current.rotation.x = position.y * 0.05; */
        }
    });
    const zoomLevel =
        deviceType === "mobile" ? 80 : deviceType === "tablet" ? 90 : 150;
    const scaleLevel =
        deviceType === "mobile" ? 0.5 : deviceType === "tablet" ? 0.7 : 1;
    return (
        <>
            <Environment
                backgroundIntensity={0.5}
                environmentIntensity={0.4}
                files="test.hdr"
            />
            <directionalLight
                castShadow
                intensity={0.4}
                position={[3, 5, -1]}
                shadow-bias={-0.00001}
                shadow-radius={10}
            />
            <OrthographicCamera
                rotation={[-0.6, 0.7, 0.4]}
                makeDefault
                position={deviceType === "tablet" ? [9, 7.3, 9] : [9, 8, 9]}
                zoom={zoomLevel}
            />
            <Stats />
            <group ref={groupRef} scale={scaleLevel}>
                <Room />
            </group>
        </>
    );
};

export default Scene;
