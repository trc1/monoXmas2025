import { useEffect, useState } from "react";

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
  intervalMs = 500,
  onProbability = 0.5,
  colors: string[] = DEFAULT_COLORS
) {
  const [bulbs, setBulbs] = useState<{ on: boolean; color: string }[]>(
    Array(count)
      .fill(null)
      .map(() => ({ on: false, color: colors[0] }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBulbs(
        Array(count)
          .fill(null)
          .map(() => {
            const on = Math.random() < onProbability;
            const color = colors[Math.floor(Math.random() * colors.length)];
            return { on, color };
          })
      );
    }, intervalMs);
    return () => clearInterval(interval);
  }, [count, intervalMs, onProbability, colors]);

  return bulbs;
}
