import { useGLTF } from "@react-three/drei";

export function Room(props: any) {
    const { nodes, materials } = useGLTF("./models/room.glb") as any;
    return (
        <group {...props} dispose={null}>
            {/* <mesh
                geometry={nodes["bottom-plane"].geometry}
                material={materials.glass}
                position={[3.348, -0.285, 3.699]}
                scale={16.924}
            /> */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.rug.geometry}
                material={materials.rug}
                position={[-0.084, 0.622, 0.357]}
                rotation={[0, -0.25, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["mono-logo"].geometry}
                material={materials.brass}
                position={[-1.583, 3.215, -1.567]}
                rotation={[Math.PI / 2, 0, -0.768]}
                scale={0.116}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.table.geometry}
                material={materials.wood2}
                position={[0.782, 1.287, 1.726]}
            />
            <group
                position={[-2.176, 1.847, 0.624]}
                rotation={[-0.222, 0, 0]}
                scale={0.003}
                castShadow
                receiveShadow
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["Candy_Cane-Mesh"].geometry}
                    material={materials.Red}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["Candy_Cane-Mesh_1"].geometry}
                    material={materials.White}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
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
                position={[-1.581, 1.001, -1.558]}
                rotation={[0, 0.454, 0]}
                scale={0.67}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.trunk.geometry}
                material={materials.shelves}
                position={[-1.595, 1.247, -1.563]}
                scale={0.199}
            />
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
                geometry={nodes["wire-small"].geometry}
                material={materials.concrete2}
                position={[-1.586, 2.576, -1.557]}
                rotation={[0.136, 0.019, 0.136]}
                scale={0.268}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb001"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.652, 2.512, -1.302]}
                rotation={[2.456, 0.438, 0.056]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base001"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb002"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.839, 2.512, -1.489]}
                rotation={[2.194, 0.708, 0.888]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base002"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb003"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.349, 2.586, -1.572]}
                rotation={[-3.012, 0.024, -0.444]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base003"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb004"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.536, 2.59, -1.784]}
                rotation={[-2.502, -0.313, -0.234]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base004"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.42, 2.553, -1.359]}
                rotation={[2.793, 0.23, -0.559]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb005"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.939, 1.932, -1.396]}
                rotation={[2.394, 0.941, 0.819]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base005"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb006"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.796, 1.932, -1.224]}
                rotation={[2.648, 0.049, 0.279]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base006"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb007"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.522, 1.911, -1.147]}
                rotation={[2.531, 0.173, -0.031]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base007"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb008"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.25, 1.866, -1.265]}
                rotation={[2.778, 0.235, -0.383]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base008"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb009"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.121, 1.836, -1.54]}
                rotation={[-3.081, 0.185, -0.668]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base009"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb010"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.28, 1.862, -1.892]}
                rotation={[-2.278, -0.233, -0.438]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base010"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb011"].geometry}
                material={materials["tree-bulb"]}
                position={[-2.087, 1.108, -1.177]}
                rotation={[3.089, -0.641, 0.581]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base011"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb012"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.776, 1.115, -0.957]}
                rotation={[2.398, 0.215, 0.192]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base012"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb013"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.449, 1.104, -0.93]}
                rotation={[2.615, 0.265, -0.22]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base013"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb014"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.181, 1.143, -1.064]}
                rotation={[2.87, 0.183, -0.542]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base014"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb015"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.029, 1.185, -1.32]}
                rotation={[3.017, 0.037, -0.542]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base015"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb016"].geometry}
                material={materials["tree-bulb"]}
                position={[-0.997, 1.202, -1.655]}
                rotation={[-3.078, -0.04, -0.66]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base016"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["light-bulb017"].geometry}
                material={materials["tree-bulb"]}
                position={[-1.163, 1.168, -2.011]}
                rotation={[-2.778, -0.352, -0.818]}
                scale={0.02}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["light-base017"].geometry}
                    material={materials.concrete}
                    position={[0, -1.093, 0]}
                    scale={0.365}
                />
            </mesh>
            <mesh
                geometry={nodes["wire-medium"].geometry}
                material={materials.concrete2}
                position={[-1.585, 1.907, -1.553]}
                rotation={[0, 0, -0.125]}
                scale={0.406}
            />
            <mesh
                geometry={nodes["wire-large"].geometry}
                material={materials.metal}
                position={[-1.6, 1.167, -1.579]}
                rotation={[0, 0, 0.084]}
                scale={0.645}
            />
            <mesh
                geometry={nodes["fireplace-arch"].geometry}
                material={materials.concrete}
                position={[-1.23, 1.287, 1.732]}
            />
            <mesh
                geometry={nodes["fireplace-cover"].geometry}
                material={materials.concrete}
                position={[-2.059, 1.792, -0.001]}
            />
            <mesh
                geometry={nodes["fireplace-wall"].geometry}
                material={materials.concrete2}
                position={[-2.252, 1.753, -0.015]}
                scale={0.286}
            />
            <mesh
                geometry={nodes.firewood.geometry}
                material={materials.ceiling}
                position={[-2.162, 0.905, -0.106]}
                rotation={[-2.302, 0.07, 2.395]}
                scale={0.062}
            />
            <mesh
                geometry={nodes["flame-lrg"].geometry}
                material={materials.fire}
                position={[-2.125, 1.189, -0.076]}
                rotation={[Math.PI, -0.593, Math.PI]}
                scale={0.187}
            >
                <mesh
                    geometry={nodes["flame-sml"].geometry}
                    material={materials.fire}
                    position={[-0.701, -0.701, 0.498]}
                    rotation={[-Math.PI, 1.021, -Math.PI]}
                    scale={0.594}
                />
            </mesh>
            <mesh
                geometry={nodes["door-frame"].geometry}
                material={materials.wood2}
                position={[-0.031, 1.503, -2.358]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.579}
            />
            <mesh
                geometry={nodes["door-wing"].geometry}
                material={materials.wood2}
                position={[-0.031, 1.369, -2.516]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.487}
            />
            <mesh
                geometry={nodes["door-window"].geometry}
                material={materials.glass}
                position={[-0.031, 1.933, -2.398]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.487}
            />
            <mesh
                geometry={nodes["door-knob"].geometry}
                material={materials.concrete}
                position={[0.362, 1.487, -2.397]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.062}
            />
            <mesh
                geometry={nodes.chair.geometry}
                material={materials.armchair}
                position={[1.457, 0.611, 0.408]}
                rotation={[0, -0.227, 0]}
                scale={0.556}
            >
                <mesh
                    geometry={nodes["chair-legs"].geometry}
                    material={materials.wood2}
                />
            </mesh>
            <mesh
                geometry={nodes["chair-blanket"].geometry}
                material={materials.blanket}
                position={[0.663, 1.287, 2]}
                rotation={[0, -0.106, 0]}
                scale={0.453}
            />
            <mesh
                geometry={nodes["gramophone-base"].geometry}
                material={materials.gramophone}
                position={[0.816, 1.572, 1.735]}
                scale={0.255}
            />
            <mesh
                geometry={nodes.vinyl.geometry}
                material={materials.vinyl}
                position={[0.856, 1.402, 1.713]}
                scale={1.228}
            >
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
            <group
                position={[0.545, 1.427, 1.884]}
                rotation={[0, -0.545, 0]}
                scale={0.011}
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
                geometry={nodes["grampohone-speaker"].geometry}
                material={materials.brass}
                position={[0.78, 1.746, 1.743]}
                rotation={[1.955, -1.571, 0]}
                scale={0.279}
            >
                <mesh
                    geometry={nodes["speaker-in"].geometry}
                    material={materials.brass2}
                    position={[1.032, 1.177, 0.003]}
                    rotation={[0.001, 0, 0.384]}
                    scale={0.186}
                />
            </mesh>
            <mesh
                geometry={nodes["boot-black-a"].geometry}
                material={materials.metal}
                position={[1.54, 0.616, -1.362]}
                rotation={[0, -0.585, 0]}
            >
                <mesh
                    geometry={nodes["boot-bottom"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    geometry={nodes["boot-fur"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                geometry={nodes["boot-black-b"].geometry}
                material={materials.metal}
                position={[2.004, 0.721, -1.444]}
                rotation={[0.012, 0.626, -1.552]}
            >
                <mesh
                    geometry={nodes["boot-bottom002"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    geometry={nodes["boot-fur002"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                geometry={nodes["boot-brown-a"].geometry}
                material={materials.wood2}
                position={[0.941, 0.616, -1.957]}
                rotation={[0, -0.17, 0]}
                scale={0.828}
            >
                <mesh
                    geometry={nodes["boot-bottom006"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    geometry={nodes["boot-fur006"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                geometry={nodes["boot-brown-b"].geometry}
                material={materials.wood2}
                position={[1.152, 0.616, -1.943]}
                rotation={[0, -0.17, 0]}
                scale={0.828}
            >
                <mesh
                    geometry={nodes["boot-bottom001"].geometry}
                    material={materials.vinyl}
                    position={[0, 0.025, 0.003]}
                    scale={1.016}
                />
                <mesh
                    geometry={nodes["boot-fur001"].geometry}
                    material={materials.lamp}
                    position={[0.01, 0.161, 0.014]}
                    scale={0.126}
                />
            </mesh>
            <mesh
                geometry={nodes["sock-main"].geometry}
                material={materials.blanket}
                position={[-1.726, 1.597, 0.528]}
                rotation={[1.232, -0.016, -1.353]}
                scale={0.188}
            >
                <mesh
                    geometry={nodes["sock-top"].geometry}
                    material={nodes["sock-top"].material}
                    position={[-0.561, -0.055, -0.984]}
                    scale={0.542}
                />
            </mesh>
            <mesh
                geometry={nodes["sock-main002"].geometry}
                material={materials.blanket}
                position={[-1.711, 1.589, -0.456]}
                rotation={[1.122, 0.185, -1.747]}
                scale={0.188}
            >
                <mesh
                    geometry={nodes["sock-top002"].geometry}
                    material={nodes["sock-top002"].material}
                    position={[-0.561, -0.055, -0.984]}
                    scale={0.542}
                />
            </mesh>
            <mesh
                geometry={nodes.candle.geometry}
                material={materials.candle}
                position={[-1.923, 1.911, 0.673]}
                scale={0.07}
            >
                <mesh
                    geometry={nodes["candle-wick"].geometry}
                    material={materials.metal}
                    position={[-0.034, 1.182, 0.027]}
                    scale={0.078}
                />
            </mesh>
            <mesh
                geometry={nodes.candle001.geometry}
                material={materials.candle}
                position={[-1.878, 1.894, 0.546]}
                scale={0.049}
            >
                <mesh
                    geometry={nodes["candle-wick001"].geometry}
                    material={materials.metal}
                    position={[-0.034, 1.182, 0.027]}
                    scale={0.078}
                />
            </mesh>
            <mesh
                geometry={nodes["book-cover"].geometry}
                material={materials.White}
                position={[-1.907, 1.535, 1.891]}
                scale={0.034}
            >
                <mesh
                    geometry={nodes["book-pages"].geometry}
                    material={materials.ceiling}
                    position={[3.458, -3.675, 1.602]}
                    scale={4.968}
                />
            </mesh>
            <mesh
                geometry={nodes["book-cover001"].geometry}
                material={materials.White}
                position={[-1.796, 1.535, 1.891]}
                scale={0.034}
            >
                <mesh
                    geometry={nodes["book-pages001"].geometry}
                    material={materials.armchair}
                    position={[3.458, -3.675, 1.602]}
                    scale={4.968}
                />
            </mesh>
            <mesh
                geometry={nodes["book-cover002"].geometry}
                material={materials.White}
                position={[-1.685, 1.535, 1.891]}
                scale={0.034}
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
                position={[-1.574, 1.535, 1.891]}
                scale={0.034}
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
                position={[-1.453, 1.527, 1.891]}
                rotation={[0, 0, 0.408]}
                scale={0.034}
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
                position={[-1.021, 1.145, 1.891]}
                scale={0.034}
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
                position={[-0.91, 1.145, 1.891]}
                scale={0.034}
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
                position={[-0.799, 1.145, 1.891]}
                scale={0.034}
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
                position={[-1.384, 0.907, 1.988]}
                rotation={[0, -0.603, -Math.PI / 2]}
                scale={0.034}
            >
                <mesh
                    geometry={nodes["book-pages009"].geometry}
                    material={materials.brass2}
                    position={[3.458, -3.675, 1.602]}
                    scale={4.968}
                />
            </mesh>
            <mesh
                geometry={nodes.shelf.geometry}
                material={materials.shelves}
                position={[-0.706, 1.075, 1.984]}
                rotation={[0, 1.567, 0]}
                scale={0.218}
            />
            <mesh
                geometry={nodes["nutcracker-hat"].geometry}
                material={materials.metal}
                position={[-1.854, 2.142, -0.65]}
                rotation={[0, 1.046, 0]}
                scale={0.024}
            >
                <mesh
                    geometry={nodes["nutcracker-arm-left"].geometry}
                    material={materials.blanket}
                    position={[-1.348, -5.917, -0.025]}
                />
                <mesh
                    geometry={nodes["nutcracker-arm-right"].geometry}
                    material={materials.blanket}
                    position={[1.36, -5.917, -0.025]}
                />
                <mesh
                    geometry={nodes["nutcracker-boot-left"].geometry}
                    material={materials.metal}
                    position={[-0.524, -11.453, -0.025]}
                    rotation={[0, -0.449, 0]}
                />
                <mesh
                    geometry={nodes["nutcracker-boot-right"].geometry}
                    material={materials.metal}
                    position={[0.507, -11.453, -0.025]}
                    rotation={[0, 0.597, 0]}
                />
                <mesh
                    geometry={nodes["nutcracker-head"].geometry}
                    material={materials.candle}
                    position={[0, -1.624, 0]}
                />
                <mesh
                    geometry={nodes["nutcracker-leg-left"].geometry}
                    material={materials.candle}
                    position={[-0.524, -9.983, -0.025]}
                />
                <mesh
                    geometry={nodes["nutcracker-leg-right"].geometry}
                    material={materials.candle}
                    position={[0.507, -9.983, -0.025]}
                />
                <mesh
                    geometry={nodes["nutcracker-torso"].geometry}
                    material={materials.blanket}
                    position={[0, -4.925, 0]}
                />
            </mesh>
            <mesh
                geometry={nodes["wreath-fireplace"].geometry}
                material={materials.tree}
                position={[-1.865, 2.339, -0.01]}
                rotation={[2.852, 0, -Math.PI / 2]}
                scale={0.242}
            >
                <mesh
                    geometry={nodes.berries.geometry}
                    material={materials.blanket}
                    position={[-0.582, 0.279, 0.825]}
                    rotation={[Math.PI, -0.29, -Math.PI / 2]}
                    scale={0.046}
                />
            </mesh>
            <mesh
                geometry={nodes["wreath-door"].geometry}
                material={materials.tree}
                position={[0.326, 2.484, -2.25]}
                rotation={[-1.585, 0, 0]}
                scale={0.474}
            >
                <mesh
                    geometry={nodes.berries001.geometry}
                    material={materials.blanket}
                    position={[-2.21, -0.126, 0.044]}
                    rotation={[1.585, 0, 0]}
                    scale={0.03}
                />
            </mesh>
            <mesh
                geometry={nodes["clock-body"].geometry}
                material={materials.ceiling}
                position={[-1.636, 1.995, 0.052]}
                rotation={[Math.PI / 2, Math.PI / 9, -Math.PI / 2]}
                scale={0.12}
            >
                <mesh
                    geometry={nodes["clock-big"].geometry}
                    material={materials.metal}
                    position={[0, -0.727, 0]}
                    rotation={[0, 0.271, 0]}
                    scale={0.049}
                />
                <mesh
                    geometry={nodes["clock-face"].geometry}
                    material={nodes["clock-face"].material}
                    position={[0, -0.083, 0]}
                    scale={0.805}
                />
                <mesh
                    geometry={nodes["clock-rotate"].geometry}
                    material={nodes["clock-rotate"].material}
                    position={[0, -0.668, 0]}
                    scale={0.016}
                />
                <mesh
                    geometry={nodes["clock-small"].geometry}
                    material={materials.metal}
                    position={[0, -0.703, 0]}
                    scale={0.049}
                />
            </mesh>
            <mesh
                geometry={nodes["bow-fire"].geometry}
                material={materials.gramophone}
                position={[-1.768, 2.584, 0.051]}
                rotation={[Math.PI, -0.023, Math.PI]}
                scale={1.559}
            />
            <mesh
                geometry={nodes["bow-ddor"].geometry}
                material={materials.gramophone}
                position={[0.162, 2.554, -2.138]}
                rotation={[-Math.PI, 1.564, -Math.PI]}
                scale={1.559}
            />
            <mesh
                geometry={nodes.board.geometry}
                material={materials.candle}
                position={[-1.29, 1.853, -2.277]}
                rotation={[0, 1.57, 1.571]}
                scale={1.158}
            >
                <mesh
                    geometry={nodes["board-frame"].geometry}
                    material={materials.ceiling}
                    scale={1.263}
                />
                <mesh
                    geometry={nodes["board-paper"].geometry}
                    material={nodes["board-paper"].material}
                    position={[0.017, 0.032, 0.09]}
                    rotation={[-2.283, -1.391, -2.292]}
                    scale={0.121}
                />
                <mesh
                    geometry={nodes["board-pin"].geometry}
                    material={materials.blanket}
                    position={[0.103, 0.025, 0.101]}
                    rotation={[-2.283, -1.391, -2.292]}
                    scale={0.004}
                />
                <mesh
                    geometry={nodes["board-postit-1"].geometry}
                    material={materials.pink}
                    position={[0.088, 0.032, -0.125]}
                    rotation={[-2.283, -1.391, -2.292]}
                    scale={0.037}
                />
                <mesh
                    geometry={nodes["board-postit-2"].geometry}
                    material={materials.brass}
                    position={[-0.052, 0.032, -0.128]}
                    rotation={[-2.283, -1.391, -2.292]}
                    scale={0.037}
                />
            </mesh>
            <mesh
                geometry={nodes["cookie-plate"].geometry}
                material={materials.White}
                position={[1.486, 1.532, -1.954]}
                scale={0.169}
            >
                <mesh
                    geometry={nodes.cookie.geometry}
                    material={materials.wood2}
                    position={[-0.229, 0.058, -0.39]}
                    rotation={[0.16, 0, 0]}
                    scale={0.378}
                >
                    <mesh
                        geometry={nodes.choco.geometry}
                        material={materials.ceiling}
                        position={[-0.472, -0.055, -0.442]}
                        scale={0.183}
                    />
                </mesh>
                <mesh
                    geometry={nodes.cookie001.geometry}
                    material={materials.wood2}
                    position={[-0.169, 0.037, 0.382]}
                    rotation={[2.942, 0.642, -3.021]}
                    scale={0.384}
                >
                    <mesh
                        geometry={nodes.choco005.geometry}
                        material={materials.ceiling}
                        position={[-0.472, -0.055, -0.442]}
                        scale={0.183}
                    />
                </mesh>
                <mesh
                    geometry={nodes.cookie002.geometry}
                    material={materials.wood2}
                    position={[0.599, 0.04, -0.105]}
                    rotation={[0.034, 0.042, 0.256]}
                    scale={0.292}
                >
                    <mesh
                        geometry={nodes.choco010.geometry}
                        material={materials.ceiling}
                        position={[-0.472, -0.055, -0.442]}
                        scale={0.183}
                    />
                </mesh>
            </mesh>
            <mesh
                geometry={nodes.cupboard.geometry}
                material={materials.shelves}
                position={[1.66, 1.465, -1.979]}
                scale={0.401}
            >
                <mesh
                    geometry={nodes["drawer-cover"].geometry}
                    material={materials.shelves}
                    position={[0, -0.284, 0.963]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.892}
                >
                    <mesh
                        geometry={nodes["drawer-box"].geometry}
                        material={materials.shelves}
                        position={[0, -0.526, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={1.082}
                    />
                    <mesh
                        geometry={nodes["drawer-handle"].geometry}
                        material={materials.brass2}
                        position={[0, 0.174, -0.056]}
                        rotation={[0, 0, Math.PI]}
                        scale={-0.111}
                    />
                </mesh>
            </mesh>
            <mesh
                geometry={nodes.glass.geometry}
                material={nodes.glass.material}
                position={[1.891, 1.607, -1.967]}
                scale={0.068}
            />
            <mesh
                geometry={nodes["gift-square"].geometry}
                material={materials.candle}
                position={[-0.811, 0.745, -1.966]}
                rotation={[0, 1.235, 0]}
                scale={0.134}
            >
                <mesh
                    geometry={nodes["gift-square-bottom-bow"].geometry}
                    material={materials.wood2}
                    position={[0, -0.731, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={6.318}
                />
                <mesh
                    geometry={nodes["gift-square-bow"].geometry}
                    material={materials.wood2}
                    position={[0.029, 1.24, 0.005]}
                    rotation={[0, -1.41, 0]}
                    scale={1.385}
                />
                <mesh
                    geometry={nodes["gift-square-top"].geometry}
                    material={materials.candle}
                    position={[0, 0.054, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.063}
                />
                <mesh
                    geometry={nodes["gift-square-top-bow"].geometry}
                    material={materials.wood2}
                    position={[0, 0.858, 0]}
                    scale={6.459}
                />
            </mesh>
            <mesh
                geometry={nodes["gift-rec"].geometry}
                material={materials.gramophone}
                position={[-0.903, 0.709, -1.476]}
                rotation={[0, 0.455, 0]}
                scale={0.096}
            >
                <mesh
                    geometry={nodes["gift-rec-bottom-bow"].geometry}
                    material={materials.candle}
                    scale={1.008}
                />
                <mesh
                    geometry={nodes["gift-rec-bow"].geometry}
                    material={materials.candle}
                    position={[0.051, 0.808, -0.28]}
                    rotation={[Math.PI, -0.151, Math.PI]}
                    scale={1.93}
                />
                <mesh
                    geometry={nodes["gift-rec-top"].geometry}
                    material={materials.gramophone}
                    position={[0, -0.415, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.091}
                />
                <mesh
                    geometry={nodes["gift-rec-top-bow"].geometry}
                    material={materials.candle}
                    position={[0, -0.415, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.091}
                />
            </mesh>
            <mesh
                geometry={nodes["gift-round"].geometry}
                material={materials.wood2}
                position={[-1.288, 0.614, -0.979]}
                scale={0.19}
            >
                <mesh
                    geometry={nodes["gift-round-bottom-bow"].geometry}
                    material={materials.blanket}
                    rotation={[-Math.PI, -Math.PI / 10, 0]}
                    scale={1.011}
                />
                <mesh
                    geometry={nodes["gift-round-bow"].geometry}
                    material={materials.blanket}
                    position={[0.007, 1.203, -0.001]}
                    rotation={[0, -1.31, 0]}
                    scale={1.291}
                />
                <mesh
                    geometry={nodes["gift-round-top"].geometry}
                    material={materials.wood2}
                    position={[0, 1.106, 0]}
                    rotation={[0, 0, Math.PI]}
                    scale={1.056}
                />
                <mesh
                    geometry={nodes["gift-round-top-bow"].geometry}
                    material={materials.blanket}
                    position={[0, 1.106, 0]}
                    scale={1.056}
                />
            </mesh>
            <mesh
                geometry={nodes["santas-letter"].geometry}
                material={materials.White}
                position={[0.056, 0.615, -3.269]}
                rotation={[0, 1.415, 0]}
                scale={0.137}
            >
                <mesh
                    geometry={nodes.seal.geometry}
                    material={materials.blanket}
                    position={[0.029, 0.063, 0.071]}
                    rotation={[0.048, 0.001, 3.136]}
                    scale={0.317}
                />
            </mesh>
            <mesh
                geometry={nodes["lamp-leg"].geometry}
                material={materials.metal}
                position={[-1.973, 2.302, 1.599]}
                rotation={[0, 0, Math.PI]}
                scale={0.058}
            />
            <mesh
                geometry={nodes["lamp-shade"].geometry}
                material={materials.lamp}
                position={[-1.928, 2.239, 1.601]}
                scale={0.197}
            />
            <mesh
                geometry={nodes["lamp-leg001"].geometry}
                material={materials.metal}
                position={[1.723, 2.302, -1.923]}
                rotation={[-Math.PI, -Math.PI / 2, 0]}
                scale={0.058}
            />
            <mesh
                geometry={nodes["lamp-shade001"].geometry}
                material={materials.lamp}
                position={[1.722, 2.239, -1.877]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.197}
            />
        </group>
    );
}

useGLTF.preload("./models/room.glb");
export default Room;
