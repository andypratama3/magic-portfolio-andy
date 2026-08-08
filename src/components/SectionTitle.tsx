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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' }
      );
    }
  }, []);

  const textAlign = align === "center" ? "center" : align === "right" ? "right" : "left";

  return (
    <Column 
      ref={containerRef}
      fillWidth 
      gap="m" 
      marginBottom="xl"
      style={{ textAlign }}
    >
      <Heading 
        variant="display-strong-m"
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </Heading>
      {description && (
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}
        >
          {description}
        </Text>
      )}
    </Column>
  );
}
