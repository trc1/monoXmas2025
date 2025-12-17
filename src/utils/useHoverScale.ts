import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface UseHoverScaleOptions {
    hoverScale?: number;
    normalScale?: number;
    speed?: number;
}

export const useHoverScale = (options: UseHoverScaleOptions = {}) => {
    const {
        hoverScale = 1.1,
        normalScale = 1,
        speed = 0.15,
    } = options;

    const [hovered, setHovered] = useState(false);
    const [scale, setScale] = useState(normalScale);
    const currentScale = useRef(normalScale);

    useFrame(() => {
        const targetScale = hovered ? hoverScale : normalScale;
        currentScale.current +=
            (targetScale - currentScale.current) * speed;
        setScale(currentScale.current);
    });

    const onPointerOver = () => {
        document.body.style.cursor = "pointer";
        setHovered(true);
    };

    const onPointerOut = () => {
        document.body.style.cursor = "auto";
        setHovered(false);
    };

    return {
        scale,
        onPointerOver,
        onPointerOut,
        hovered,
    };
};
