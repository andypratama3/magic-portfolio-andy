"use client";

import { useEffect, useRef } from "react";
import { Heading, Text, Column } from "@once-ui-system/core";
import { gsap } from "gsap";

interface SectionTitleProps {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export function SectionTitle({ title, description, align = "left" }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' }
      );
    }
  }, []);

  const isCenter = align === "center";
  const isRight = align === "right";

  return (
    <Column 
      ref={containerRef}
      fillWidth 
      gap="s" 
      marginBottom="l"
      horizontal={isCenter ? "center" : isRight ? "end" : "start"}
      style={{ textAlign: isCenter ? "center" : isRight ? "right" : "left" }}
    >
      <Heading 
        variant="display-strong-m"
        style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          letterSpacing: '-0.02em',
          lineHeight: '1.2',
        }}
      >
        {title}
      </Heading>
      {description && (
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.125rem)',
            maxWidth: '580px',
            lineHeight: '1.6',
            margin: isCenter ? '0 auto' : undefined,
          }}
        >
          {description}
        </Text>
      )}
    </Column>
  );
}
