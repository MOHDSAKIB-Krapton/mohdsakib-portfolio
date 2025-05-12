"use client";

import { useRef, useEffect } from "react";

export function NodeCounter() {
  const counterRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the count without state changes
      countRef.current = (countRef.current + 1) % 1000;

      // Directly update the DOM without re-rendering parent
      if (counterRef.current) {
        const newValue = countRef.current.toString().padStart(3, "0");
        counterRef.current.textContent = newValue;

        // Add animation effect manually
        counterRef.current.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.2)" },
            { transform: "scale(1)" },
          ],
          {
            duration: 200,
            easing: "ease-in-out",
          }
        );
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <span ref={counterRef} className="text-cyan-400">
      000
    </span>
  );
}
