"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface InteractiveGridPatternProps {
  squareSize?: number;
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGrid({
  squareSize = 40,
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const viewportCells = Math.ceil(2560 / squareSize);
  const totalCells = viewportCells * viewportCells;

  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      preserveAspectRatio="none"
      {...props}
    >
      <defs>
        {/* Optimized grid background pattern */}
        <pattern
          id="base-grid"
          width={squareSize}
          height={squareSize}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={squareSize}
            height={squareSize}
            fill="transparent"
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
      </defs>

      {/* Single background element - most efficient */}
      <rect width="100%" height="100%" fill="url(#base-grid)" />

      {/* Optimized interactive grid - only render what's needed */}
      <g className="interactive-cells">
        {Array.from({ length: totalCells }, (_, i) => {
          const col = i % viewportCells;
          const row = Math.floor(i / viewportCells);
          const x = col * squareSize;
          const y = row * squareSize;

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={squareSize}
              height={squareSize}
              fill="transparent"
              stroke="transparent"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className={cn(
                // Snake trail effect with CSS transitions
                "transition-all duration-300 ease-out",
                "hover:fill-white/20 hover:stroke-white/40",
                "[&:not(:hover)]:duration-[2000ms] [&:not(:hover)]:ease-out",
                // Optimized rendering
                "will-change-auto",
                squaresClassName
              )}
            />
          );
        })}
      </g>
    </svg>
  );
}
