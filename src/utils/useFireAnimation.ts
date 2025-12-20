import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { type RefObject } from "react";

const noise = (t: number, freq: number, amp: number) => {
    return Math.sin(t * freq) * amp;
};

const turbulence = (t: number, f1: number, f2: number) => {
    return Math.sin(t * f1) * Math.cos(t * f2);
};

const getFireColor = (t: number, baseHue: number, variation: number) => {
    const wave = Math.sin(t) * 0.5 + 0.5;
    return baseHue + wave * variation;
};

export const useFireAnimation = (
    flameLrgRef: RefObject<Mesh | null>,
    flameSmlRef: RefObject<Mesh | null>,
    isActive: boolean,
    fireLightRef?: RefObject<any>
) => {
    // Base transforms
    const baseLrgScale = new Vector3(0.187, 0.187, 0.187);
    const baseLrgPos = new Vector3(-0.131, -0.037, -0.075);
    const baseLrgRot = new Vector3(Math.PI, -0.593, Math.PI);

    const baseSmlScale = new Vector3(0.111, 0.111, 0.111);
    const baseSmlPos = new Vector3(-0.074, -0.168, -0.225);
    const baseSmlRot = new Vector3(0, -0.428, 0);

    useFrame((state) => {
        if (!isActive || !flameLrgRef.current || !flameSmlRef.current) {
            return;
        }

        const t = state.clock.elapsedTime;

        const turb1 = turbulence(t, 2.1, 3.3);
        const turb2 = turbulence(t, 2.6, 3.7);
        const turb3 = turbulence(t, 2.9, 2.8);

        const lrgScale = baseLrgScale
            .clone()
            .add(
                new Vector3(
                    noise(t, 2.2, 0.008) + turb1 * 0.004,
                    noise(t, 1.9, 0.012) + turb2 * 0.006,
                    noise(t, 2.4, 0.006) + turb3 * 0.003
                )
            );

        const lrgPos = baseLrgPos
            .clone()
            .add(
                new Vector3(
                    turb1 * 0.002,
                    noise(t, 2.3, 0.006) + turb2 * 0.002,
                    turb3 * 0.001
                )
            );

        const lrgRot = baseLrgRot
            .clone()
            .add(
                new Vector3(
                    0,
                    noise(t, 0.7, 0.02),
                    noise(t, 1.4, 0.04) + turb1 * 0.025
                )
            );

        flameLrgRef.current.scale.copy(lrgScale);
        flameLrgRef.current.position.copy(lrgPos);
        flameLrgRef.current.rotation.set(lrgRot.x, lrgRot.y, lrgRot.z);

        if (flameLrgRef.current.material) {
            const mat = flameLrgRef.current.material as any;
            const hue = getFireColor(t * 1.1, 0.02, 0.025); // Orange to red-orange
            const intensity = 0.87 + noise(t, 2.6, 0.11) + turb1 * 0.04;
            const lightness = 0.48 * intensity - (hue < 0.03 ? 0.1 : 0.04);

            mat.color.setHSL(hue, 1.0, lightness);
            mat.emissive.setHSL(hue + 0.005, 0.98, lightness * 0.5);
            mat.emissiveIntensity = 1.4 + noise(t, 3.2, 0.3) + turb2 * 0.15;
        }

        const smlScale = baseSmlScale
            .clone()
            .add(
                new Vector3(
                    noise(t, 3.3, 0.009) + turb2 * 0.005,
                    noise(t, 2.9, 0.014) + turb3 * 0.007,
                    noise(t, 3.6, 0.007) + turb1 * 0.004
                )
            );

        const smlPos = baseSmlPos
            .clone()
            .add(
                new Vector3(
                    turb2 * 0.002,
                    noise(t, 3.2, 0.009) + turb1 * 0.003,
                    turb3 * 0.002
                )
            );

        const smlRot = baseSmlRot
            .clone()
            .add(
                new Vector3(
                    noise(t, 1.3, 0.02),
                    turb2 * 0.025,
                    noise(t, 2.9, 0.05) + turb3 * 0.03
                )
            );

        flameSmlRef.current.scale.copy(smlScale);
        flameSmlRef.current.position.copy(smlPos);
        flameSmlRef.current.rotation.set(smlRot.x, smlRot.y, smlRot.z);

        if (flameSmlRef.current.material) {
            const mat = flameSmlRef.current.material as any;
            const hue = getFireColor(t * 1.3, 0.028, 0.022); // Brighter orange
            const intensity = 0.91 + noise(t, 3.4, 0.09) + turb2 * 0.03;
            const lightness = 0.52 * intensity - (hue < 0.035 ? 0.12 : 0.06);

            mat.color.setHSL(hue, 1.0, lightness);
            mat.emissive.setHSL(hue + 0.008, 0.98, lightness * 0.6);
            mat.emissiveIntensity = 1.5 + noise(t, 4.3, 0.35) + turb1 * 0.2;
        }

        if (fireLightRef?.current) {
            const flicker = turb1 * turb2;
            const lightIntensity =
                2.7 + noise(t, 2.6, 0.7) + noise(t, 3.9, 0.4) + flicker * 0.25;

            fireLightRef.current.intensity = Math.max(1.9, lightIntensity);

            const lightHue = getFireColor(t * 0.65, 0.032, 0.013);
            fireLightRef.current.color.setHSL(lightHue, 0.96, 0.53);
        }
    });
};
