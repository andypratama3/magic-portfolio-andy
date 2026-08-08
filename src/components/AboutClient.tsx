"use client";

import { useEffect, useRef } from "react";
import { staggeredReveal, animateImageScroll, cardStacking } from "@/utils/gsap";

interface AboutClientProps {
  children: React.ReactNode;
}

export function AboutClient({ children }: AboutClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Animate all sections
      const sections = containerRef.current.querySelectorAll('[class*="blockAlign"]');
      staggeredReveal(Array.from(sections) as HTMLElement[], 0.2);

      // Animate images
      const images = containerRef.current.querySelectorAll('img');
      animateImageScroll(Array.from(images) as HTMLElement[]);

      // Animate experience cards
      const cards = containerRef.current.querySelectorAll('[id^="experience-"]');
      cardStacking(Array.from(cards) as HTMLElement[]);
    }
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
