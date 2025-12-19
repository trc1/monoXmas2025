import { useEffect, useState, useRef } from "react";

/**
 * useRandomBulbStates
 * @param count Number of bulbs
 * @param intervalMs How often to randomize (ms)
 * @param onProbability Probability (0-1) that a bulb is ON at each interval
 * @param colors Optional array of color strings to pick from randomly
 * @returns Array of objects: { on: boolean, color: string }
 */
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
    staggerMs = 100
) {
    const [bulbs, setBulbs] = useState<{ on: boolean; color: string }[]>(
        Array(count)
            .fill(null)
            .map(() => ({ on: false, color: colors[0] }))
    );
    const [isOn, setIsOn] = useState(false);

    const allLightsOn = bulbs.every((b) => b.on);

    const timeoutsRef = useRef<number[]>([]);

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((t) => clearTimeout(t));
        };
    }, []);

    const toggleBulbs = () => {
        timeoutsRef.current.forEach((t) => clearTimeout(t));
        timeoutsRef.current = [];
        const turnOn = !isOn;

        for (let i = 0; i < count; i++) {
            const timeout = window.setTimeout(() => {
                setBulbs((prev) => {
                    const newBulbs = [...prev];
                    newBulbs[i] = {
                        on: turnOn,
                        color: colors[
                            Math.floor(Math.random() * colors.length)
                        ],
                    };
                    return newBulbs;
                });
                if (i === count - 1) setIsOn(turnOn);
            }, i * staggerMs);
            timeoutsRef.current.push(timeout);
        }
    };

    return [bulbs, toggleBulbs, allLightsOn] as const;
}
