import { useGLTF, Instances, Instance } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useFireAnimation } from "../utils/useFireAnimation";
import { useRef, useMemo } from "react";
import { roomStore, audioStore } from "../store";
import { Mesh, Color } from "three";
import { useHoverScale } from "../utils/useHoverScale";
import { useRandomBulbStates } from "../utils/useRandomBulbStates";
import { observer } from "mobx-react-lite";

useGLTF.preload("./models/admiral.glb");
const BULB_COUNT = 18;

export const Admiral = observer(() => {
    const { nodes, materials } = useGLTF("./models/admiral.glb") as any;

    const flameLrgRef = useRef<Mesh>(null);
    const flameSmlRef = useRef<Mesh>(null);
    const fireLightRef = useRef<any>(null);
    const vinylRef = useRef<any>(null);
    const vinylLightRef = useRef<any>(null);
    const doorWingRef = useRef<Mesh>(null);
    const boardRef = useRef<Mesh>(null);
    const letterRef = useRef<Mesh>(null);
    const [bulbs, toggleBulbs, allLightsOn] = useRandomBulbStates(BULB_COUNT);

    // Bulb positions and rotations as constants
    const bulbPositions = useMemo(
        () =>
            [
                [0.076, 1.104, 0.377],
                [-0.272, 1.043, 0.301],
                [-0.401, 1.042, -0.072],
                [0.311, 1.154, 0.137],
                [0.198, 1.158, -0.269],
                [-0.597, 0.177, -0.012],
                [-0.517, 0.177, 0.312],
                [-0.2, 0.145, 0.595],
                [0.242, 0.078, 0.615],
                [0.597, 0.033, 0.329],
                [0.612, 0.072, -0.247],
                [-0.939, -1.054, 0.185],
                [-0.665, -1.044, 0.684],
                [-0.244, -1.06, 0.934],
                [0.204, -1.001, 0.929],
                [0.576, -0.939, 0.685],
                [0.837, -0.913, 0.257],
                [0.848, -0.964, -0.33],
            ] as [number, number, number][],
        []
    );

    const bulbRotations = useMemo(
        () =>
            [
                [2.71, 0.651, -0.37],
                [2.23, 0.76, 0.449],
                [1.752, 0.893, 1.491],
                [-2.996, 0.473, -0.508],
                [-2.536, 0.058, -0.499],
                [1.656, 1.157, 1.654],
                [2.59, 0.444, 0.511],
                [2.426, 0.533, 0.266],
                [2.69, 0.654, -0.185],
                [-3.068, 0.637, -0.701],
                [-2.306, 0.07, -0.779],
                [3.099, -0.188, 0.604],
                [2.267, 0.532, 0.544],
                [2.49, 0.645, 0.059],
                [2.813, 0.617, -0.398],
                [3, 0.487, -0.48],
                [-3.072, 0.413, -0.69],
                [-2.8, 0.075, -0.975],
            ] as [number, number, number][],
        []
    );

    const activeLights = useMemo(() => {
        return bulbs
            .map((bulb, i) => ({ ...bulb, index: i }))
            .filter((bulb) => bulb.intensity > 0);
    }, [bulbs]);

    const instanceColors = useMemo(() => {
        return bulbs.map((bulb) => {
            if (bulb.intensity > 0) {
                const color = new Color(bulb.color);
                const intensityBoost = bulb.intensity * 1.5;
                return color.multiplyScalar(intensityBoost);
            }
            return new Color("#f3f3f3");
        });
    }, [bulbs]);

    const handleBulbsClick = () => {
        if (roomStore.checkList.board === false) {
            return;
        }
        toggleBulbs();
        roomStore.toggleLights();
    };

    useFireAnimation(
        flameLrgRef,
        flameSmlRef,
        roomStore.fireplaceOn,
        fireLightRef
    );

    useFrame((state) => {
        // Vinyl animation
        if (roomStore.gramophone && vinylRef.current) {
            vinylRef.current.rotation.y += 0.2;
            vinylRef.current.position.y =
                -0.665 + Math.sin(state.clock.getElapsedTime() * 1) * 0.01;
            vinylRef.current.rotation.x =
                Math.sin(state.clock.getElapsedTime() * 1) * 0.04;
            vinylRef.current.rotation.z =
                Math.cos(state.clock.getElapsedTime() * 1) * 0.03;
            if (vinylLightRef.current) {
                vinylLightRef.current.intensity = 0.02;
            }
        } else if (vinylRef.current) {
            vinylRef.current.position.y = -0.665;
            vinylRef.current.rotation.x = 0;
            vinylRef.current.rotation.z = 0;
            if (vinylLightRef.current) {
                vinylLightRef.current.intensity = 0.0;
            }
        }
        // Door animation
        if (doorWingRef.current) {
            const target = roomStore.doorOpen ? -Math.PI / 2 : 0;
            doorWingRef.current.rotation.z +=
                (target - doorWingRef.current.rotation.z) * 0.15;
        }

        // Letter animation
        if (letterRef.current) {
            const targetX = roomStore.doorOpen ? -0.2 : 0.056;
            const targetZ = roomStore.doorOpen ? -2.001 : -3.269;
            letterRef.current.position.x +=
                (targetX - letterRef.current.position.x) * 0.08;
            letterRef.current.position.z +=
                (targetZ - letterRef.current.position.z) * 0.08;
        }

        // Board shake animation
        if (boardRef.current) {
            if (roomStore.boardAnimationPlaying) {
                const time = state.clock.getElapsedTime();
                boardRef.current.rotation.y = Math.sin(time * 8) * 0.05;
                boardRef.current.rotation.x = Math.sin(time * 8) * 0.01;
            } else {
                boardRef.current.rotation.x = 0;
                boardRef.current.rotation.y = 0;
            }
        }
    });

    return (
        <group dispose={null}>
            <mesh
                /* receiveShadow */
                geometry={nodes["bottom-plane"].geometry}
                material={materials.glass}
                position={[3.348, -0.285, 3.699]}
                scale={151.121}
            />
            <mesh
                receiveShadow
                castShadow
                geometry={nodes.rug.geometry}
                material={materials.carpet}
                position={[-0.084, 0.622, 0.357]}
                rotation={[0, -0.25, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["mono-logo"].geometry}
                position={[-1.583, 3.215, -1.567]}
                rotation={[Math.PI / 2, 0, -0.768]}
                scale={0.116}
            >
                <meshStandardMaterial
                    color="#d1bf21"
                    emissive={allLightsOn ? "#d1bf21" : "#000000"}
                    emissiveIntensity={allLightsOn ? 1 : 0}
                />
                {allLightsOn && (
                    <pointLight
                        intensity={2}
                        color="#d1bf21"
                        distance={2}
                        decay={1}
                    />
                )}
            </mesh>
            <group
                castShadow
                receiveShadow
                position={[-2.176, 1.847, 0.624]}
                rotation={[-0.222, 0, 0]}
                scale={0.003}
            >
                <mesh
                    geometry={nodes["Candy_Cane-Mesh"].geometry}
                    material={materials.Red}
                />
                <mesh
                    geometry={nodes["Candy_Cane-Mesh_1"].geometry}
                    material={materials.White}
                />
            </group>
            <mesh
                geometry={nodes["floor-boards"].geometry}
                material={materials.ceiling}
                position={[0, 2.8, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.walls.geometry}
                material={materials.wall}
                position={[0, 2.8, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.ceiling.geometry}
                material={materials.ceiling}
                position={[0, 2.8, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["floor-bottom"].geometry}
                material={materials.concrete2}
                position={[0, 2.8, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree.geometry}
                material={materials.tree}
                position={[-1.577, 1.814, -1.564]}
                rotation={[0, 0.454, 0]}
                onClick={handleBulbsClick}
                {...useHoverScale({ hoverScale: 0.67, normalScale: 0.67 })}
            >
                <mesh
                    geometry={nodes["light-base"].geometry}
                    material={materials.concrete}
                    position={[0.067, 1.129, 0.358]}
                    rotation={[2.71, 0.651, -0.37]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base001"].geometry}
                    material={materials.concrete}
                    position={[-0.262, 1.068, 0.284]}
                    rotation={[2.23, 0.76, 0.449]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base002"].geometry}
                    material={materials.concrete}
                    position={[-0.38, 1.068, -0.07]}
                    rotation={[1.752, 0.893, 1.491]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base003"].geometry}
                    material={materials.concrete}
                    position={[0.296, 1.183, 0.134]}
                    rotation={[-2.996, 0.473, -0.508]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base004"].geometry}
                    material={materials.concrete}
                    position={[0.183, 1.183, -0.253]}
                    rotation={[-2.536, 0.058, -0.499]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base005"].geometry}
                    material={materials.concrete}
                    position={[-0.583, 0.206, -0.007]}
                    rotation={[1.656, 1.157, 1.654]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base006"].geometry}
                    material={materials.concrete}
                    position={[-0.503, 0.205, 0.303]}
                    rotation={[2.59, 0.444, 0.511]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base007"].geometry}
                    material={materials.concrete}
                    position={[-0.192, 0.172, 0.577]}
                    rotation={[2.426, 0.533, 0.266]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base008"].geometry}
                    material={materials.concrete}
                    position={[0.237, 0.105, 0.597]}
                    rotation={[2.69, 0.654, -0.185]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base009"].geometry}
                    material={materials.concrete}
                    position={[0.58, 0.059, 0.319]}
                    rotation={[-3.068, 0.637, -0.701]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base010"].geometry}
                    material={materials.concrete}
                    position={[0.589, 0.089, -0.231]}
                    rotation={[-2.306, 0.07, -0.779]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base011"].geometry}
                    material={materials.concrete}
                    position={[-0.92, -1.027, 0.18]}
                    rotation={[3.099, -0.188, 0.604]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base012"].geometry}
                    material={materials.concrete}
                    position={[-0.65, -1.019, 0.668]}
                    rotation={[2.267, 0.532, 0.544]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base013"].geometry}
                    material={materials.concrete}
                    position={[-0.242, -1.033, 0.915]}
                    rotation={[2.49, 0.645, 0.059]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base014"].geometry}
                    material={materials.concrete}
                    position={[0.193, -0.975, 0.912]}
                    rotation={[2.813, 0.617, -0.398]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base015"].geometry}
                    material={materials.concrete}
                    position={[0.563, -0.911, 0.674]}
                    rotation={[3, 0.487, -0.48]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base016"].geometry}
                    material={materials.concrete}
                    position={[0.818, -0.887, 0.25]}
                    rotation={[-3.072, 0.413, -0.69]}
                    scale={0.011}
                />
                <mesh
                    geometry={nodes["light-base017"].geometry}
                    material={materials.concrete}
                    position={[0.821, -0.946, -0.326]}
                    rotation={[-2.8, 0.075, -0.975]}
                    scale={0.011}
                />
                <Instances
                    limit={BULB_COUNT}
                    geometry={nodes["light-bulb"].geometry}
                >
                    <meshStandardMaterial toneMapped={false} />
                    {bulbPositions.map((pos, i) => (
                        <Instance
                            key={i}
                            position={pos}
                            rotation={bulbRotations[i]}
                            scale={0.03}
                            color={instanceColors[i]}
                        />
                    ))}
                </Instances>

                {activeLights.map(({ index, color }) => (
                    <pointLight
                        key={index}
                        position={bulbPositions[index]}
                        intensity={0.3 * bulbs[index].intensity}
                        color={color}
                        distance={0.8}
                        decay={1}
                    />
                ))}
                <mesh
                    geometry={nodes.trunk.geometry}
                    material={materials.shelves}
                    position={[-0.026, -0.846, -0.011]}
                    rotation={[0, -0.454, 0]}
                    scale={0.298}
                />
                <mesh
                    geometry={nodes["wire-large"].geometry}
                    material={materials.concrete2}
                    position={[-0.022, -0.965, -0.036]}
                    rotation={[0, -0.454, 0.084]}
                    scale={0.962}
                />
                <mesh
                    geometry={nodes["wire-medium"].geometry}
                    material={materials.concrete2}
                    position={[-0.019, 0.139, 0.009]}
                    rotation={[0, -0.454, -0.125]}
                    scale={0.607}
                />
                <mesh
                    geometry={nodes["wire-small"].geometry}
                    material={materials.concrete2}
                    position={[-0.017, 1.137, 0.003]}
                    rotation={[0.15, -0.43, 0.202]}
                    scale={0.401}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["fireplace-cover"].geometry}
                material={materials.concrete}
                position={[-1.994, 1.226, -0.001]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.candle.geometry}
                    material={materials.candle}
                    position={[0.071, 0.685, 0.673]}
                    scale={0.07}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.candle001.geometry}
                    material={materials.candle}
                    position={[0.116, 0.668, 0.547]}
                    scale={0.049}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["candle-wick"].geometry}
                    material={materials.metal}
                    position={[0.068, 0.767, 0.675]}
                    scale={0.005}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["candle-wick001"].geometry}
                    material={materials.metal}
                    position={[0.114, 0.726, 0.548]}
                    scale={0.004}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["clock-big"].geometry}
                    material={materials.metal}
                    position={[0.276, 0.74, 0.053]}
                    rotation={[1.858, 0.336, -1.668]}
                    scale={0.006}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["clock-body"].geometry}
                    material={materials.ceiling}
                    position={[0.358, 0.769, 0.053]}
                    rotation={[Math.PI / 2, Math.PI / 9, -Math.PI / 2]}
                    scale={0.12}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["clock-face"].geometry}
                    material={nodes["clock-face"].material}
                    position={[0.349, 0.766, 0.053]}
                    rotation={[Math.PI / 2, Math.PI / 9, -Math.PI / 2]}
                    scale={0.097}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["clock-rotate"].geometry}
                    material={nodes["clock-rotate"].material}
                    position={[0.282, 0.742, 0.053]}
                    rotation={[Math.PI / 2, Math.PI / 9, -Math.PI / 2]}
                    scale={0.002}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["clock-small"].geometry}
                    material={materials.metal}
                    position={[0.278, 0.741, 0.053]}
                    rotation={[Math.PI / 2, Math.PI / 9, -Math.PI / 2]}
                    scale={0.006}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["fireplace-arch"].geometry}
                    material={materials.concrete}
                    position={[0.764, 0.062, 1.733]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["fireplace-wall"].geometry}
                    material={materials.concrete2}
                    position={[-0.258, 0.527, -0.015]}
                    scale={0.286}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (roomStore.checkList.board === false) {
                            return;
                        }
                        roomStore.toggleFireplace();
                        if (roomStore.fireplaceOn) {
                            audioStore.playFireplaceCrackling();
                        } else {
                            audioStore.stopFireplaceCrackling();
                        }
                    }}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.firewood.geometry}
                    material={materials.ceiling}
                    position={[-0.168, -0.32, -0.105]}
                    rotation={[-2.302, 0.07, 2.395]}
                    {...useHoverScale({
                        hoverScale: 0.069,
                        normalScale: 0.062,
                    })}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (roomStore.checkList.board === false) {
                            return;
                        }
                        roomStore.toggleFireplace();
                        if (roomStore.fireplaceOn) {
                            audioStore.playFireplaceCrackling();
                        } else {
                            audioStore.stopFireplaceCrackling();
                        }
                    }}
                />
                {roomStore.fireplaceOn && (
                    <>
                        <pointLight
                            ref={fireLightRef}
                            position={[-0.131, -0.037, -0.075]}
                            intensity={3}
                            distance={5}
                            decay={2}
                            color="#ff6600"
                        />
                        <mesh
                            ref={flameLrgRef}
                            castShadow
                            receiveShadow
                            geometry={nodes["flame-lrg"].geometry}
                            material={materials.fire}
                            position={[-0.131, -0.037, -0.075]}
                            rotation={[Math.PI, -0.593, Math.PI]}
                            scale={0.187}
                        />
                        <mesh
                            ref={flameSmlRef}
                            castShadow
                            receiveShadow
                            geometry={nodes["flame-sml"].geometry}
                            material={materials.fire}
                            position={[-0.074, -0.168, -0.225]}
                            rotation={[0, -0.428, 0]}
                            scale={0.111}
                        />
                    </>
                )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-arm-left"].geometry}
                    material={materials.blanket}
                    position={[0.123, 0.773, -0.621]}
                    rotation={[0, 1.046, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-arm-right"].geometry}
                    material={materials.blanket}
                    position={[0.156, 0.773, -0.678]}
                    rotation={[0, 1.046, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-boot-left"].geometry}
                    material={materials.metal}
                    position={[0.133, 0.639, -0.639]}
                    rotation={[0, 0.597, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-boot-right"].geometry}
                    material={materials.metal}
                    position={[0.146, 0.639, -0.66]}
                    rotation={[-Math.PI, 1.499, -Math.PI]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-hat"].geometry}
                    material={materials.metal}
                    position={[0.14, 0.916, -0.649]}
                    rotation={[0, 1.046, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-head"].geometry}
                    material={materials.candle}
                    position={[0.14, 0.877, -0.649]}
                    rotation={[0, 1.046, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-leg-left"].geometry}
                    material={materials.candle}
                    position={[0.133, 0.675, -0.639]}
                    rotation={[0, 1.046, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-leg-right"].geometry}
                    material={materials.candle}
                    position={[0.146, 0.675, -0.66]}
                    rotation={[0, 1.046, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["nutcracker-torso"].geometry}
                    material={materials.blanket}
                    position={[0.14, 0.797, -0.649]}
                    rotation={[0, 1.046, 0]}
                    scale={0.024}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["sock-main"].geometry}
                    material={materials.blanket}
                    position={[0.268, 0.371, 0.529]}
                    rotation={[1.232, -0.016, -1.353]}
                    scale={0.188}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["sock-main002"].geometry}
                    material={materials.blanket}
                    position={[0.283, 0.363, -0.455]}
                    rotation={[1.122, 0.185, -1.747]}
                    scale={0.188}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["sock-top"].geometry}
                    material={nodes["sock-top"].material}
                    position={[0.238, 0.58, 0.563]}
                    rotation={[1.232, -0.016, -1.353]}
                    scale={0.102}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["sock-top002"].geometry}
                    material={nodes["sock-top002"].material}
                    position={[0.257, 0.575, -0.439]}
                    rotation={[1.122, 0.185, -1.747]}
                    scale={0.102}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["door-frame"].geometry}
                material={materials.wood2}
                position={[-0.031, 1.503, -2.358]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.579}
            />
            <mesh
                ref={doorWingRef}
                castShadow
                receiveShadow
                geometry={nodes["door-wing"].geometry}
                material={materials.wood2}
                position={[-0.516, 1.683, -2.401]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.487}
                onClick={(e) => {
                    e.stopPropagation();
                    audioStore.playDoorOpen();
                    roomStore.toggleDoor();
                }}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["door-knob"].geometry}
                    material={materials.concrete}
                    position={[1.803, 0.008, 0.402]}
                    scale={0.128}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["door-window"].geometry}
                    material={materials.glass}
                    position={[0.995, 0.006, -0.514]}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["door-floor"].geometry}
                material={materials.concrete2}
                position={[-0.025, 0.52, -2.307]}
                scale={0.57}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.chair.geometry}
                material={materials.armchair}
                position={[1.502, 1.303, 0.418]}
                rotation={[0, -0.227, 0]}
                scale={0.556}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["chair-blanket"].geometry}
                    material={materials.blanket}
                    position={[-0.831, -0.028, 3.113]}
                    rotation={[0, 0.121, 0]}
                    scale={0.814}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["chair-legs"].geometry}
                    material={materials.wood2}
                    position={[-0.083, -1.244, 0]}
                />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes["gramophone-base"].geometry}
                material={materials.gramophone}
                position={[0.816, 1.572, 1.735]}
                onClick={(e) => {
                    e.stopPropagation();
                    if (roomStore.checkList.board === false) {
                        return;
                    }
                    roomStore.toggleGramophone();
                    if (roomStore.gramophone) {
                        audioStore.playVinylNeedleSkipAndNext();
                    } else {
                        audioStore.stopMusic();
                    }
                }}
                {...useHoverScale({
                    normalScale: 0.255,
                    hoverScale: 0.265,
                })}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["grampohone-speaker"].geometry}
                    material={materials.brass}
                    position={[-0.144, 0.682, 0.029]}
                    rotation={[1.955, -Math.PI / 2, 0]}
                    scale={1.093}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes["speaker-in"].geometry}
                        material={materials.brass2}
                        position={[1.032, 1.177, 0.003]}
                        rotation={[0.001, 0, 0.384]}
                        scale={0.186}
                    />
                </mesh>
                <group
                    position={[-1.064, -0.569, 0.584]}
                    rotation={[0, -0.545, 0]}
                    scale={0.044}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes.Cylinder004.geometry}
                        material={materials.metal}
                    />
                    <mesh
                        geometry={nodes.Cylinder004_1.geometry}
                        material={materials.concrete2}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.table.geometry}
                    material={materials.wood2}
                    position={[-0.137, -1.116, -0.037]}
                    scale={3.92}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.vinyl.geometry}
                    material={materials.vinyl}
                    position={[0.154, -0.665, -0.086]}
                    scale={4.812}
                    ref={vinylRef}
                >
                    {roomStore.gramophone && (
                        <pointLight
                            ref={vinylLightRef}
                            position={[0, 0.1, 0]}
                            intensity={0}
                            distance={0.4}
                            color={"#fffbe6"}
                            decay={2}
                            castShadow={false}
                        />
                    )}
                    <mesh
                        geometry={nodes["vinyl-cylinder"].geometry}
                        material={nodes["vinyl-cylinder"].material}
                        position={[0, 0.027, 0]}
                        scale={0.008}
                    />
                    <mesh
                        geometry={nodes["vinyl-inner"].geometry}
                        material={materials.pink}
                    />
                    <mesh
                        geometry={nodes["vinyl-turntable"].geometry}
                        material={nodes["vinyl-turntable"].material}
                        position={[0, 0.008, 0]}
                        scale={0.156}
                    />
                </mesh>
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["boot-black-a"].geometry}
                material={materials.metal}
                position={[1.54, 0.616, -1.362]}
                rotation={[0, -0.585, 0]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-bottom"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-fur"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["boot-black-b"].geometry}
                material={materials.metal}
                position={[2.004, 0.721, -1.444]}
                rotation={[0.012, 0.626, -1.552]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-bottom002"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-fur002"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["boot-brown-a"].geometry}
                material={materials.wood2}
                position={[0.941, 0.616, -1.957]}
                rotation={[0, -0.17, 0]}
                scale={0.828}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-bottom006"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-fur006"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["boot-brown-b"].geometry}
                material={materials.wood2}
                position={[1.152, 0.616, -1.943]}
                rotation={[0, -0.17, 0]}
                scale={0.828}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-bottom001"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["boot-fur001"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shelf.geometry}
                material={materials.shelves}
                position={[-1.361, 1.047, 1.983]}
                rotation={[0, 1.567, 0]}
                scale={0.218}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["book-cover"].geometry}
                    material={materials.White}
                    position={[0.412, 2.235, -2.506]}
                    rotation={[0, -1.567, 0]}
                    scale={0.157}
                >
                    <mesh
                        geometry={nodes["book-pages"].geometry}
                        material={materials.ceiling}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["book-cover001"].geometry}
                    material={materials.White}
                    position={[0.414, 2.235, -1.998]}
                    rotation={[0, -1.567, 0]}
                    scale={0.157}
                >
                    <mesh
                        geometry={nodes["book-pages001"].geometry}
                        material={materials.armchair}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["book-cover002"].geometry}
                    material={materials.White}
                    position={[0.416, 2.235, -1.49]}
                    rotation={[0, -1.567, 0]}
                    scale={0.157}
                >
                    <mesh
                        geometry={nodes["book-pages002"].geometry}
                        material={materials.gramophone}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    geometry={nodes["book-cover003"].geometry}
                    material={materials.White}
                    position={[0.418, 2.235, -0.981]}
                    rotation={[0, -1.567, 0]}
                    scale={0.157}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes["book-pages003"].geometry}
                        material={materials.ceiling}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    geometry={nodes["book-cover004"].geometry}
                    material={materials.White}
                    position={[0.423, 2.201, -0.427]}
                    rotation={[0, -1.567, 0.408]}
                    scale={0.157}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes["book-pages004"].geometry}
                        material={materials.tree}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    geometry={nodes["book-cover006"].geometry}
                    material={materials.White}
                    position={[0.428, 0.448, 1.556]}
                    rotation={[0, -1.567, 0]}
                    scale={0.157}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes["book-pages006"].geometry}
                        material={materials.armchair}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    geometry={nodes["book-cover007"].geometry}
                    material={materials.White}
                    position={[0.43, 0.448, 2.064]}
                    rotation={[0, -1.567, 0]}
                    scale={0.157}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes["book-pages007"].geometry}
                        material={materials.tree}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    geometry={nodes["book-cover008"].geometry}
                    material={materials.White}
                    position={[0.432, 0.448, 2.572]}
                    rotation={[0, -1.567, 0]}
                    scale={0.157}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes["book-pages008"].geometry}
                        material={materials.armchair}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
                <mesh
                    geometry={nodes["book-cover009"].geometry}
                    material={materials.White}
                    position={[-0.024, -0.644, -0.106]}
                    rotation={[Math.PI, -0.972, Math.PI / 2]}
                    scale={0.157}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes["book-pages009"].geometry}
                        material={materials.brass2}
                        position={[3.458, -3.675, 1.602]}
                        scale={4.968}
                    />
                </mesh>
            </mesh>
            <mesh
                geometry={nodes["wreath-fireplace"].geometry}
                material={materials.tree}
                position={[-1.865, 2.339, -0.01]}
                rotation={[2.852, 0, -Math.PI / 2]}
                scale={0.242}
                castShadow
                receiveShadow
            >
                <mesh
                    geometry={nodes.berries.geometry}
                    material={materials.blanket}
                    position={[-0.582, 0.279, 0.825]}
                    rotation={[Math.PI, -0.29, -Math.PI / 2]}
                    scale={0.046}
                    castShadow
                    receiveShadow
                />
            </mesh>
            <mesh
                geometry={nodes["wreath-door"].geometry}
                material={materials.tree}
                position={[0.326, 2.484, -2.25]}
                rotation={[-1.585, 0, 0]}
                scale={0.474}
                castShadow
                receiveShadow
            >
                <mesh
                    geometry={nodes.berries001.geometry}
                    material={materials.blanket}
                    position={[-2.21, -0.126, 0.044]}
                    rotation={[1.585, 0, 0]}
                    scale={0.03}
                    castShadow
                    receiveShadow
                />
            </mesh>
            <mesh
                geometry={nodes["bow-fire"].geometry}
                material={materials.gramophone}
                position={[-1.768, 2.584, 0.051]}
                rotation={[Math.PI, -0.023, Math.PI]}
                scale={1.559}
                castShadow
                receiveShadow
            />
            <mesh
                geometry={nodes["bow-ddor"].geometry}
                material={materials.gramophone}
                position={[0.162, 2.554, -2.138]}
                rotation={[-Math.PI, 1.564, -Math.PI]}
                scale={1.559}
                castShadow
                receiveShadow
            />

            <group
                castShadow
                receiveShadow
                onClick={(e) => {
                    e.stopPropagation();
                    roomStore.toggleBoard();
                }}
                {...useHoverScale({
                    normalScale: 1.158,
                    hoverScale: 1.17,
                })}
                position={[-1.29, 1.853, -2.277]}
                scale={1.158}
            >
                <group rotation={[0, 1.57, 0]}>
                    <group rotation={[0, 0, 1.571]}>
                        <group ref={boardRef} rotation={[0, 0, 0]}>
                            <mesh
                                geometry={nodes.board.geometry}
                                material={materials.candle}
                                castShadow
                                receiveShadow
                            >
                                <mesh
                                    geometry={nodes["board-frame"].geometry}
                                    material={materials.ceiling}
                                    scale={1.263}
                                    castShadow
                                    receiveShadow
                                />
                                <mesh
                                    geometry={nodes["board-paper"].geometry}
                                    material={materials["info-paper"]}
                                    position={[0.017, 0.032, 0.09]}
                                    rotation={[-2.283, -1.391, -2.292]}
                                    scale={0.121}
                                    castShadow
                                    receiveShadow
                                />
                                <mesh
                                    geometry={nodes["board-pin"].geometry}
                                    material={materials.blanket}
                                    position={[0.11, 0.025, 0.102]}
                                    rotation={[-2.283, -1.391, -2.292]}
                                    scale={0.004}
                                    castShadow
                                    receiveShadow
                                />
                                <mesh
                                    geometry={nodes["board-postit-1"].geometry}
                                    material={materials.pink}
                                    position={[0.088, 0.032, -0.125]}
                                    rotation={[-2.283, -1.391, -2.292]}
                                    scale={0.037}
                                    castShadow
                                    receiveShadow
                                />
                                <mesh
                                    geometry={nodes["board-postit-2"].geometry}
                                    material={materials.brass}
                                    position={[-0.052, 0.032, -0.128]}
                                    rotation={[-2.283, -1.391, -2.292]}
                                    scale={0.037}
                                    castShadow
                                    receiveShadow
                                />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
            <mesh
                geometry={nodes.cupboard.geometry}
                material={materials.shelves}
                position={[1.66, 1.194, -1.977]}
                scale={0.401}
                castShadow
                receiveShadow
            >
                <mesh
                    geometry={nodes["cookie-plate"].geometry}
                    material={materials.White}
                    position={[-0.436, 0.845, 0.059]}
                    scale={0.423}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes.cookie.geometry}
                        material={materials.wood2}
                        position={[-0.229, 0.058, -0.39]}
                        rotation={[0.16, 0, 0]}
                        scale={0.378}
                        castShadow
                        receiveShadow
                    >
                        <mesh
                            geometry={nodes.choco.geometry}
                            material={materials.ceiling}
                            position={[-0.472, -0.055, -0.442]}
                            scale={0.183}
                            castShadow
                            receiveShadow
                        />
                    </mesh>
                    <mesh
                        geometry={nodes.cookie001.geometry}
                        material={materials.wood2}
                        position={[-0.169, 0.037, 0.382]}
                        rotation={[2.942, 0.642, -3.021]}
                        scale={0.384}
                        castShadow
                        receiveShadow
                    >
                        <mesh
                            geometry={nodes.choco005.geometry}
                            material={materials.ceiling}
                            position={[-0.472, -0.055, -0.442]}
                            scale={0.183}
                            castShadow
                            receiveShadow
                        />
                    </mesh>
                    <mesh
                        geometry={nodes.cookie002.geometry}
                        material={materials.wood2}
                        position={[0.599, 0.04, -0.105]}
                        rotation={[0.034, 0.042, 0.256]}
                        scale={0.292}
                        castShadow
                        receiveShadow
                    >
                        <mesh
                            geometry={nodes.choco010.geometry}
                            material={materials.ceiling}
                            position={[-0.472, -0.055, -0.442]}
                            scale={0.183}
                            castShadow
                            receiveShadow
                        />
                    </mesh>
                </mesh>
                <mesh
                    geometry={nodes["drawer-cover"].geometry}
                    material={materials.shelves}
                    position={[0, 0.392, 0.958]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.892}
                    castShadow
                    receiveShadow
                >
                    <mesh
                        geometry={nodes["drawer-box"].geometry}
                        material={materials.shelves}
                        position={[0, -0.526, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={1.082}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        geometry={nodes["drawer-handle"].geometry}
                        material={materials.brass2}
                        position={[0, 0.174, -0.056]}
                        rotation={[0, 0, Math.PI]}
                        scale={-0.111}
                        castShadow
                        receiveShadow
                    />
                </mesh>
                <mesh
                    geometry={nodes.glass.geometry}
                    material={nodes.glass.material}
                    position={[0.576, 1.033, 0.025]}
                    scale={0.171}
                    castShadow
                    receiveShadow
                />
            </mesh>
            <mesh
                geometry={nodes["gift-square"].geometry}
                material={materials.candle}
                position={[-0.811, 0.745, -1.966]}
                rotation={[0, 1.235, 0]}
                scale={0.134}
                castShadow
                receiveShadow
            >
                <mesh
                    geometry={nodes["gift-square-bottom-bow"].geometry}
                    material={materials.wood2}
                    position={[0, -0.731, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={6.318}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-square-bow"].geometry}
                    material={materials.wood2}
                    position={[0.029, 1.24, 0.005]}
                    rotation={[0, -1.41, 0]}
                    scale={1.385}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-square-top"].geometry}
                    material={materials.candle}
                    position={[0, 0.054, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.063}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-square-top-bow"].geometry}
                    material={materials.wood2}
                    position={[0, 0.858, 0]}
                    scale={6.459}
                    castShadow
                    receiveShadow
                />
            </mesh>
            <mesh
                geometry={nodes["gift-rec"].geometry}
                material={materials.gramophone}
                position={[-0.903, 0.709, -1.476]}
                rotation={[0, 0.455, 0]}
                scale={0.096}
                castShadow
                receiveShadow
            >
                <mesh
                    geometry={nodes["gift-rec-bottom-bow"].geometry}
                    material={materials.candle}
                    scale={1.008}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-rec-bow"].geometry}
                    material={materials.candle}
                    position={[0.051, 0.808, -0.28]}
                    rotation={[Math.PI, -0.151, Math.PI]}
                    scale={1.93}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-rec-top"].geometry}
                    material={materials.gramophone}
                    position={[0, -0.415, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.091}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-rec-top-bow"].geometry}
                    material={materials.candle}
                    position={[0, -0.415, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.091}
                    castShadow
                    receiveShadow
                />
            </mesh>
            <mesh
                geometry={nodes["gift-round"].geometry}
                material={materials.wood2}
                position={[-1.288, 0.614, -0.979]}
                scale={0.19}
                castShadow
                receiveShadow
            >
                <mesh
                    geometry={nodes["gift-round-bottom-bow"].geometry}
                    material={materials.blanket}
                    rotation={[-Math.PI, -Math.PI / 10, 0]}
                    scale={1.011}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-round-bow"].geometry}
                    material={materials.blanket}
                    position={[0.007, 1.203, -0.001]}
                    rotation={[0, -1.31, 0]}
                    scale={1.291}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-round-top"].geometry}
                    material={materials.wood2}
                    position={[0, 1.106, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.056}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes["gift-round-top-bow"].geometry}
                    material={materials.blanket}
                    position={[0, 1.106, 0]}
                    scale={1.056}
                    castShadow
                    receiveShadow
                />
            </mesh>
            <mesh
                ref={letterRef}
                geometry={nodes["santas-letter"].geometry}
                material={materials.White}
                position={[0.056, 0.615, -3.269]}
                rotation={[0, 1.415, 0]}
                castShadow
                receiveShadow
                onClick={(e) => {
                    e.stopPropagation();
                    roomStore.setGameCompleted();
                }}
                {...useHoverScale({
                    normalScale: 0.137,
                    hoverScale: 0.152,
                })}
            >
                <pointLight
                    color="#ecbbbf"
                    intensity={roomStore.doorOpen ? 2 : 0}
                />
                <mesh
                    geometry={nodes.seal.geometry}
                    material={materials.blanket}
                    position={[0.029, 0.063, 0.071]}
                    rotation={[0.048, 0.001, 3.136]}
                    scale={0.317}
                    castShadow
                    receiveShadow
                />
            </mesh>
            <mesh
                geometry={nodes["lamp-leg"].geometry}
                material={materials.metal}
                position={[-1.973, 2.302, 1.599]}
                rotation={[0, 0, Math.PI]}
                scale={0.058}
                castShadow
                receiveShadow
            />
            <mesh
                geometry={nodes["lamp-shade"].geometry}
                material={materials.lamp}
                position={[-1.928, 2.239, 1.601]}
                castShadow
                receiveShadow
                onClick={(e) => {
                    e.stopPropagation();
                    if (roomStore.checkList.board === false) {
                        return;
                    }
                    roomStore.toggleLamp2();
                    audioStore.playSwitchClick();
                }}
                {...useHoverScale({
                    normalScale: 0.197,
                    hoverScale: 0.205,
                })}
            >
                <pointLight
                    intensity={roomStore.lamp2On ? 1.5 : 0.5}
                    color="#dddddd"
                    distance={5}
                    decay={0.5}
                />
            </mesh>
            <mesh
                geometry={nodes["lamp-leg001"].geometry}
                material={materials.metal}
                position={[1.673, 2.302, -1.973]}
                rotation={[-Math.PI, -Math.PI / 2, 0]}
                scale={0.058}
                castShadow
                receiveShadow
            />

            <mesh
                geometry={nodes["lamp-shade001"].geometry}
                material={materials.lamp}
                position={[1.672, 2.239, -1.927]}
                rotation={[0, -Math.PI / 2, 0]}
                castShadow
                receiveShadow
                onClick={(e) => {
                    e.stopPropagation();
                    if (roomStore.checkList.board === false) {
                        return;
                    }
                    roomStore.toggleLamp1();
                    audioStore.playSwitchClick();
                }}
                {...useHoverScale({
                    normalScale: 0.197,
                    hoverScale: 0.205,
                })}
            >
                <pointLight
                    intensity={roomStore.lamp1On ? 1.5 : 0.5}
                    color="#dddddd"
                    distance={5}
                    decay={0.5}
                />
            </mesh>
        </group>
    );
});
