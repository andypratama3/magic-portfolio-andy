"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const container = containerRef.current;
    if (!container) return;

    // Create floating orbs
    const orbs = Array.from({ length: 5 }, (_, i) => {
      const orb = document.createElement('div');
      orb.style.cssText = `
        position: absolute;
        width: ${100 + Math.random() * 200}px;
        height: ${100 + Math.random() * 200}px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--brand-alpha-weak) 0%, transparent 70%);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.3;
        pointer-events: none;
      `;
      container.appendChild(orb);
      return orb;
    });

    // Animate orbs
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200,
        duration: 10 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb, {
        scale: 1 + Math.random() * 0.5,
        duration: 8 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Parallax on scroll
    gsap.to(container, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      orbs.forEach((orb) => orb.remove());
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
    />
  );
};
