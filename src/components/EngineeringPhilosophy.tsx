"use client";

import { useEffect, useRef } from "react";
import { Flex, Text, Column, Heading } from "@once-ui-system/core";
import { gsap } from "gsap";
import { staggeredReveal } from "@/utils/gsap";

interface EngineeringPhilosophyProps {
  title: string;
  description: React.ReactNode;
}

export function EngineeringPhilosophy({ title, description }: EngineeringPhilosophyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Animate title
      const title = containerRef.current.querySelector('.section-title');
      if (title) {
        gsap.fromTo(title,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' }
        );
      }
    }

    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll('p, strong');
      staggeredReveal(Array.from(paragraphs) as HTMLElement[], 0.15);
    }
  }, []);

  return (
    <Column fillWidth ref={containerRef} style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <Column fillWidth gap="m" horizontal="center" marginBottom="xl">
        <Heading 
          className="section-title"
          variant="display-strong-m"
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          {title}
        </Heading>
      </Column>
      
      <div ref={contentRef}>
        <Column
          fillWidth
          gap="m"
          style={{
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)',
            borderTop: "1px solid var(--neutral-alpha-weak)", 
            borderBottom: "1px solid var(--neutral-alpha-weak)",
            background: 'var(--surface)',
            borderRadius: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              lineHeight: '1.8',
            }}
          >
            {description}
          </Text>
        </Column>
      </div>
    </Column>
  );
}