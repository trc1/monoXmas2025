import { useEffect, useState, useRef } from "react";

const DEFAULT_COLORS = [
    "#0aff02",
    "#fffb00",
    "#ff0059",
    "#00e1ff",
    "#ff9100",
    "#ffffff",
];

export function useRandomBulbStates(
    count: number,
    colors: string[] = DEFAULT_COLORS,
    fadeDuration = 500
) {
    const [bulbs, setBulbs] = useState<
        { on: boolean; color: string; intensity: number }[]
    >(
        Array(count)
            .fill(null)
            .map(() => ({ on: false, color: colors[0], intensity: 0 }))
    );
    const [isOn, setIsOn] = useState(false);

    const allLightsOn = bulbs.every((b) => b.on);

    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const toggleBulbs = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        const turnOn = !isOn;
        const startTime = performance.now();

        let startIntensities: number[] = [];
        setBulbs((prev) => {
            startIntensities = prev.map((b) => b.intensity);
            return prev;
        });

        const targetIntensity = turnOn ? 1 : 0;
        const targetColors = turnOn
            ? bulbs.map(() => colors[Math.floor(Math.random() * colors.length)])
            : bulbs.map((b) => b.color);

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / fadeDuration, 1);

            const eased =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            setBulbs((prev) => {
                return prev.map((_bulb, i) => ({
                    on: turnOn,
                    color: targetColors[i],
                    intensity:
                        startIntensities[i] +
                        (targetIntensity - startIntensities[i]) * eased,
                }));
            });

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setIsOn(turnOn);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    return [bulbs, toggleBulbs, allLightsOn] as const;
}
