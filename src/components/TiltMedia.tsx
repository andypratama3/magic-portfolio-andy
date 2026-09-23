"use client";

import { useRef } from "react";

export function TiltMedia({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      className="tilt-media"
      onMouseLeave={reset}
      onMouseMove={(event) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const node = ref.current;
        if (!node) return;
        const box = node.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        node.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      }}
    >
      {children}
    </div>
  );
}
