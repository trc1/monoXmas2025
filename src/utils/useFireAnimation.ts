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
            // Large flame - realistic flickering with vertical stretch
            const lrgScaleX =
                0.187 +
                Math.sin(time * 2.3) * 0.006 +
                Math.cos(time * 4.7) * 0.003;
            const lrgScaleY =
                0.187 +
                Math.sin(time * 1.8) * 0.012 +
                Math.cos(time * 5.2) * 0.005; // More vertical movement
            const lrgScaleZ = 0.187 + Math.sin(time * 2.1) * 0.005;
            flameLrgRef.current.scale.set(lrgScaleX, lrgScaleY, lrgScaleZ);

            // Gentle swaying and upward movement
            flameLrgRef.current.rotation.z =
                Math.PI +
                Math.sin(time * 1.3) * 0.04 +
                Math.cos(time * 2.7) * 0.02;
            flameLrgRef.current.position.y =
                1.189 + Math.sin(time * 2.2) * 0.005; // Subtle bounce

            // Color animation - realistic fire gradient (yellow core to orange tips)
            if (flameLrgRef.current.material) {
                const lrgMaterial = flameLrgRef.current.material as any;
                const intensity = 0.85 + Math.sin(time * 2.5) * 0.15; // Brightness flicker
                const hue = 0.09 + Math.sin(time * 1.9) * 0.015; // Yellow-orange
                lrgMaterial.color = new Color().setHSL(
                    hue,
                    0.95,
                    0.55 * intensity
                );
                lrgMaterial.emissive = new Color().setHSL(
                    hue - 0.01,
                    0.85,
                    0.35 * intensity
                );
                lrgMaterial.emissiveIntensity =
                    1.2 + Math.sin(time * 3.1) * 0.3;
            }

            // Small flame - more chaotic, represents hot core
            const smlScaleX =
                0.594 +
                Math.sin(time * 3.2) * 0.008 +
                Math.cos(time * 6.1) * 0.004;
            const smlScaleY =
                0.594 +
                Math.sin(time * 2.4) * 0.015 +
                Math.cos(time * 5.8) * 0.007;
            const smlScaleZ = 0.594 + Math.sin(time * 3.5) * 0.006;
            flameSmlRef.current.scale.set(smlScaleX, smlScaleY, smlScaleZ);

            // More energetic movement for inner flame
            flameSmlRef.current.rotation.z =
                -Math.PI +
                Math.cos(time * 2.8) * 0.06 +
                Math.sin(time * 4.3) * 0.03;
            flameSmlRef.current.position.y =
                -0.701 + Math.sin(time * 3.1) * 0.008;

            // Hotter color for inner flame (orange to red-orange)
            if (flameSmlRef.current.material) {
                const smlMaterial = flameSmlRef.current.material as any;
                const intensity = 0.9 + Math.sin(time * 3.3) * 0.1;
                const hue = 0.06 + Math.sin(time * 2.6) * 0.02; // Orange-red
                smlMaterial.color = new Color().setHSL(
                    hue,
                    0.98,
                    0.5 * intensity
                );
                smlMaterial.emissive = new Color().setHSL(
                    hue - 0.01,
                    0.95,
                    0.4 * intensity
                );
                smlMaterial.emissiveIntensity =
                    1.4 + Math.sin(time * 4.2) * 0.4;
            }
            
            // Animate fire light intensity
            if (fireLightRef?.current) {
                const lightIntensity = 2.5 + Math.sin(time * 2.5) * 0.8 + Math.cos(time * 3.8) * 0.5;
                fireLightRef.current.intensity = lightIntensity;
            }
        }
    });
};
