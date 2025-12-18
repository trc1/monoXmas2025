import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useDeviceType } from "../utils/useDeviceType";
import { Environment } from "@react-three/drei/core/Environment";
import { Room } from "./Room";
import { Stats } from "@react-three/drei/core/Stats";
import { OrthographicCamera } from "@react-three/drei/core/OrthographicCamera";
import { Group, Vector3 } from "three";
import { roomStore } from "../store";
import { Admiral } from "./Admiral";

const Scene = () => {
    /* const controlsRef = useRef(null); */
    const groupRef = useRef<Group>(null);
    const inputPosition = useRef({ x: 0, y: 0 });
    const isUsingTouch = useRef(false);
    const { isMobile, isTablet } = useDeviceType();
    const orthographicCameraRef = useRef<any>(null);

    // Store the initial camera position
    const initialCameraPosition = useRef(new Vector3(9, 6, 9));
    const targetPosition = useRef(new Vector3(9, 3, 9));
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
        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            let clientX: number, clientY: number;

            if (e instanceof TouchEvent) {
                isUsingTouch.current = true;
                if (e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    return;
                }
            } else {
                isUsingTouch.current = false;
                clientX = e.clientX;
                clientY = e.clientY;
            }

            // Normalize position to -1 to 1 range
            inputPosition.current.x = (clientX / window.innerWidth) * 2 - 1;
            inputPosition.current.y = -(clientY / window.innerHeight) * 2 + 1;
        };

        const handleTouchStart = () => {
            isUsingTouch.current = true;
        };

        window.addEventListener(
            "mousemove",
            handlePointerMove as EventListener
        );
        window.addEventListener("touchstart", handleTouchStart, {
            passive: true,
        });
        window.addEventListener(
            "touchmove",
            handlePointerMove as EventListener,
            {
                passive: true,
            }
        );
        return () => {
            window.removeEventListener(
                "mousemove",
                handlePointerMove as EventListener
            );
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener(
                "touchmove",
                handlePointerMove as EventListener
            );
        };
    }, []);

    useFrame(() => {
        const orthoCam = orthographicCameraRef.current;
        if (orthoCam) {
            // Smoothly move camera based on input position
            const angle =
                inputPosition.current.x * (isUsingTouch.current ? 0.2 : 0.15);

            targetPosition.current.x =
                initialCameraPosition.current.x * Math.cos(angle) -
                initialCameraPosition.current.z * Math.sin(angle);
            targetPosition.current.z =
                initialCameraPosition.current.x * Math.sin(angle) +
                initialCameraPosition.current.z * Math.cos(angle);
            targetPosition.current.y = initialCameraPosition.current.y;

            // Smoothly interpolate camera position
            orthoCam.position.lerp(targetPosition.current, 0.05);

            // Keep camera looking at the center
            orthoCam.lookAt(0, 0, 0);
        }
    });

    console.log("Room Store State:", roomStore);
    return (
        <>
            <Environment
                backgroundIntensity={0.5}
                environmentIntensity={0.3}
                files="environment/environment.hdr"
            />
            <directionalLight
                castShadow
                intensity={1.5}
                position={[9, 4, -5]}
                shadow-bias={-0.00001}
            />
            <OrthographicCamera
                ref={orthographicCameraRef}
                makeDefault
                position={[9, 5, 9]}
                zoom={isMobile ? 70 : isTablet ? 100 : 140}
            />
            {/* <CameraControls /> */}
            {/* <OrbitControls /> */}
            <Stats />
            <group
                ref={groupRef}
                scale={isMobile ? 0.8 : isTablet ? 1 : 1}
                position={[0, -1.5, 0]}
            >
                <Admiral />
            </group>
        </>
    );
};

export default Scene;
