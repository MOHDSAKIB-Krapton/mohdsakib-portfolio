"use client";

import React, { useMemo, useRef } from "react";
import { AnimatedBeam } from "../magicui/animated-beam";

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={`z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] ${className}`}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

type NodeData = {
  id: string;
  icon: React.ReactNode;
  column: number; // Used for layout: 0 = left, 1 = center, 2 = right
};

type ConnectionData = {
  from: string;
  to: string;
  curvature?: number;
  endYOffset?: number;
  reverse?: boolean;
};

export function DynamicBeamLayout({
  nodes,
  connections,
  className,
}: {
  nodes: NodeData[];
  connections: ConnectionData[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const nodeRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {};
    nodes.forEach((n) => {
      refs[n.id] = React.createRef() as React.RefObject<HTMLDivElement>;
    });
    return refs;
  }, [nodes]);

  const columns = [0, 1, 2];

  return (
    <div
      className={`relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10 ${className}`}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        {columns.map((col) => (
          <div key={col} className="flex flex-col justify-center gap-2">
            {nodes
              .filter((n) => n.column === col)
              .map((n) => (
                <Circle
                  key={n.id}
                  ref={nodeRefs[n.id]}
                  className={col === 1 ? "size-16" : ""}
                >
                  {n.icon}
                </Circle>
              ))}
          </div>
        ))}
      </div>

      {connections.map((c, i) => {
        const fromRef = nodeRefs[c.from];
        const toRef = nodeRefs[c.to];
        if (!fromRef || !toRef) return null;
        return (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            curvature={c.curvature ?? 0}
            endYOffset={c.endYOffset ?? 0}
            reverse={c.reverse}
          />
        );
      })}
    </div>
  );
}
