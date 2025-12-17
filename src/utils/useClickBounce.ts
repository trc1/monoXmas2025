import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

interface UseClickBounceOptions {
    distance?: number;
    duration?: number;
    direction?: "horizontal" | "vertical";
}

export const useClickBounce = (options: UseClickBounceOptions = {}) => {
    const {
        distance = 0.03,
        duration = 0.6,
        direction = "vertical",
    } = options;

    const [isAnimating, setIsAnimating] = useState(false);
    const [offset, setOffset] = useState(new Vector3(0, 0, 0));
    const animationProgress = useRef(0);

    useFrame((_, delta) => {
        if (isAnimating) {
            animationProgress.current += delta / duration;

            if (animationProgress.current >= 1) {
                setIsAnimating(false);
                setOffset(new Vector3(0, 0, 0));
                animationProgress.current = 0;
            } else {
                // Smooth back and forth motion
                const t = animationProgress.current;
                const movement = Math.sin(t * Math.PI * 2) * distance;
                
                if (direction === "horizontal") {
                    setOffset(new Vector3(movement, 0, 0));
                } else {
                    setOffset(new Vector3(0, movement, 0));
                }
            }
        }
    });

    const onClick = () => {
        setIsAnimating(true);
        animationProgress.current = 0;
    };

    return {
        offset,
        onClick,
        isAnimating,
    };
};
