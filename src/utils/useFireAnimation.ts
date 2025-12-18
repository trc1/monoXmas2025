import { useFrame } from "@react-three/fiber";
import { Mesh, Color } from "three";
import { type RefObject } from "react";

export const useFireAnimation = (
    flameLrgRef: RefObject<Mesh | null>,
    flameSmlRef: RefObject<Mesh | null>,
    isActive: boolean,
    fireLightRef?: RefObject<any>
) => {
    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (isActive && flameLrgRef.current && flameSmlRef.current) {
            const lrgScale = [
                0.187 +
                    Math.sin(time * 2.3) * 0.006 +
                    Math.cos(time * 4.7) * 0.003,
                0.187 +
                    Math.sin(time * 1.8) * 0.012 +
                    Math.cos(time * 5.2) * 0.005,
                0.187 + Math.sin(time * 2.1) * 0.005,
            ];
            const lrgRotation = [
                Math.PI,
                -0.593,
                Math.PI +
                    Math.sin(time * 1.3) * 0.04 +
                    Math.cos(time * 2.7) * 0.02,
            ];
            const lrgPosition = [
                -0.131,
                -0.037 + Math.sin(time * 2.2) * 0.005,
                -0.075,
            ];
            flameLrgRef.current.scale.set(
                lrgScale[0],
                lrgScale[1],
                lrgScale[2]
            );
            flameLrgRef.current.rotation.set(
                lrgRotation[0],
                lrgRotation[1],
                lrgRotation[2]
            );
            flameLrgRef.current.position.set(
                lrgPosition[0],
                lrgPosition[1],
                lrgPosition[2]
            );

            if (flameLrgRef.current.material) {
                const lrgMaterial = flameLrgRef.current.material as any;
                const hue = 0.08 - Math.abs(Math.sin(time * 0.1)) * 0.06;
                const intensity = 0.85 + Math.sin(time * 2.5) * 0.15;
                let lightness = 0.5 * intensity;
                if (hue < 0.04) lightness -= 0.18;
                else if (hue < 0.07) lightness -= 0.09;
                lrgMaterial.color = new Color().setHSL(hue, 0.98, lightness);
                lrgMaterial.emissive = new Color().setHSL(
                    hue - 0.01,
                    0.95,
                    lightness * 0.1
                );
                lrgMaterial.emissiveIntensity =
                    1.2 + Math.sin(time * 3.1) * 0.3;
            }

            const smlScale = [
                0.111 +
                    Math.sin(time * 3.2) * 0.008 +
                    Math.cos(time * 6.1) * 0.004,
                0.111 +
                    Math.sin(time * 2.4) * 0.015 +
                    Math.cos(time * 5.8) * 0.007,
                0.111 + Math.sin(time * 3.5) * 0.006,
            ];
            const smlRotation = [
                0,
                -0.428,
                Math.cos(time * 2.8) * 0.06 + Math.sin(time * 4.3) * 0.03,
            ];
            const smlPosition = [
                -0.074,
                -0.168 + Math.sin(time * 3.1) * 0.008,
                -0.225,
            ];
            flameSmlRef.current.scale.set(
                smlScale[0],
                smlScale[1],
                smlScale[2]
            );
            flameSmlRef.current.rotation.set(
                smlRotation[0],
                smlRotation[1],
                smlRotation[2]
            );
            flameSmlRef.current.position.set(
                smlPosition[0],
                smlPosition[1],
                smlPosition[2]
            );

            if (flameSmlRef.current.material) {
                const smlMaterial = flameSmlRef.current.material as any;
                const hue = 0.08 - Math.abs(Math.sin(time * 0.1)) * 0.07;
                const intensity = 0.95 + Math.sin(time * 3.3) * 0.1;
                let lightness = 0.55 * intensity;
                if (hue < 0.01) lightness -= 0.19;
                else if (hue < 0.06) lightness -= 0.1;
                smlMaterial.color = new Color().setHSL(hue, 0.99, lightness);
                smlMaterial.emissive = new Color().setHSL(
                    hue - 0.01,
                    0.98,
                    lightness * 0.8
                );
                smlMaterial.emissiveIntensity =
                    1.4 + Math.sin(time * 4.2) * 0.4;
            }

            if (fireLightRef?.current) {
                const lightIntensity =
                    2.5 +
                    Math.sin(time * 2.5) * 0.8 +
                    Math.cos(time * 3.8) * 0.5;
                fireLightRef.current.intensity = lightIntensity;
            }
        }
    });
};
