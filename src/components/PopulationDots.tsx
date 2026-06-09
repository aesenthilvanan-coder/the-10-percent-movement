"use client";
import { useEffect, useState } from "react";

// 10x10 grid of people. The highlighted 10 represent the 10% overlooked.
const HIGHLIGHTED = new Set([3, 15, 22, 37, 48, 56, 63, 74, 88, 95]);

export default function PopulationDots() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      aria-label="Population visualization: 90% majority and 10% highlighted minority"
    >
      {Array.from({ length: 100 }, (_, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const isHighlighted = HIGHLIGHTED.has(i);
        const cx = 10 + col * 18;
        const cy = 10 + row * 18;

        // Phase 2: highlighted dots pull away to the right
        const offsetX = isHighlighted && phase >= 2 ? 14 : 0;
        const offsetY = isHighlighted && phase >= 2 ? -6 : 0;

        return (
          <g key={i}>
            {/* Person body */}
            <circle
              cx={cx + offsetX}
              cy={cy + offsetY - 3}
              r={isHighlighted && phase >= 1 ? 3.5 : 2.5}
              fill={
                isHighlighted
                  ? phase >= 1
                    ? "#ffffff"
                    : "#333"
                  : "#222"
              }
              style={{
                transition: `all ${0.5 + (i % 7) * 0.06}s cubic-bezier(0.34, 1.4, 0.64, 1) ${
                  isHighlighted ? 0.05 * ([...HIGHLIGHTED].indexOf(i) + 1) : 0
                }s`,
                filter:
                  isHighlighted && phase >= 1
                    ? "drop-shadow(0 0 3px rgba(255,255,255,0.6))"
                    : "none",
              }}
            />
            {/* Person body stub */}
            <rect
              x={cx + offsetX - 2}
              y={cy + offsetY}
              width={4}
              height={5}
              rx={1}
              fill={
                isHighlighted
                  ? phase >= 1
                    ? "#ffffff"
                    : "#333"
                  : "#222"
              }
              style={{
                transition: `all ${0.5 + (i % 7) * 0.06}s cubic-bezier(0.34, 1.4, 0.64, 1) ${
                  isHighlighted ? 0.05 * ([...HIGHLIGHTED].indexOf(i) + 1) : 0
                }s`,
              }}
            />
          </g>
        );
      })}

      {/* Label: 10% */}
      {phase >= 2 && (
        <text
          x="178"
          y="60"
          fontSize="7"
          fill="white"
          fontFamily="monospace"
          opacity={phase >= 2 ? 0.6 : 0}
          style={{ transition: "opacity 0.6s ease 0.8s" }}
        >
          10%
        </text>
      )}
    </svg>
  );
}
