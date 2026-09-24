"use client";

import { useEffect, useRef } from "react";
import { animateHeadingReveal } from "@/lib/gsap/animations";

/**
 * SectionReveal
 * Wraps any section header block and scroll-reveals its children when
 * the container enters the viewport.
 *
 * Usage:
 *   <SectionReveal>
 *     <span className="kicker reveal-body">...</span>
 *     <h2 className="reveal-heading">...</h2>
 *     <p className="reveal-body">...</p>
 *   </SectionReveal>
 *
 * Children tagged .reveal-heading animate first, .reveal-body stagger after.
 * Elements without either class are not animated.
 */
export function SectionReveal({
  children,
  className,
  style,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return animateHeadingReveal(ref.current, {
      headingSelector: ".reveal-heading",
      bodySelector: ".reveal-body",
      stagger: 0.1,
    });
  }, []);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

export default SectionReveal;
