import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useDeviceType } from "../utils/useDeviceType";
import { Stats } from "@react-three/drei/core/Stats";
import { OrthographicCamera } from "@react-three/drei/core/OrthographicCamera";
import { Group, Vector3 } from "three";
import { observer } from "mobx-react-lite";
import { Admiral } from "./Admiral";

const Scene = () => {
    /* const controlsRef = useRef(null); */
    const groupRef = useRef<Group>(null);
    const inputPosition = useRef({ x: 0, y: 0 });
    const isUsingTouch = useRef(false);
    const { isMobile, isTablet } = useDeviceType();
    const orthographicCameraRef = useRef<any>(null);

    // Device-specific initial lookAt Y values (degrees are negative to look down)
    // Adjust these values as needed for mobile/tablet/desktop. 
    // Trc, ovde određuješ početnu poziciju kamere. ima on-click trigger koji je pomiče u finalnu poziciju. 
    const lookAtStartValues = {
        mobile: -50,
        tablet: -40,
        desktop: -30,
    };

    // Current lookAt Y and animation flag
    const lookAtY = useRef<number>(
        isMobile ? lookAtStartValues.mobile : isTablet ? lookAtStartValues.tablet : lookAtStartValues.desktop
    );
    const animateLookToZero = useRef(false);

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

    // Click to animate lookAt Y from start -> 0
    useEffect(() => {
        const onClick = () => {
            animateLookToZero.current = true;
        };
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
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

            // Keep camera looking at the center; animate Y from initial -> 0 on click
            if (animateLookToZero.current) {
                lookAtY.current += (0 - lookAtY.current) * 0.06;
                if (Math.abs(lookAtY.current) < 0.01) {
                    lookAtY.current = 0;
                    animateLookToZero.current = false;
                }
            }
            orthoCam.lookAt(0, lookAtY.current, 0);
        }
    });
    /* const shouldAddLighting = !roomStore.lamp1On && !roomStore.lamp2On; */
    return (
        <>
            {/* {shouldShowEnvironment && (
                <Environment
                    backgroundIntensity={0.5}
                    environmentIntensity={0.3}
                    files="environment/environment.hdr"
                />
            )} */}
            <directionalLight
                castShadow
                intensity={1}
                position={[9, 4, -5]}
                shadow-bias={-0.00001}
                color="#ffffff"
            />
            <ambientLight intensity={0.3} color="#d1cfcf" />
            <OrthographicCamera
                ref={orthographicCameraRef}
                makeDefault
                position={[9, 5, 9]}
                zoom={isMobile ? 70 : isTablet ? 100 : 170}
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

export default observer(Scene);
