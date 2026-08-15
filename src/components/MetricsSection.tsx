"use client";

import { useEffect, useRef } from "react";
import { Flex, Text, Column, Heading } from "@once-ui-system/core";
import { gsap } from "gsap";
import { staggeredReveal } from "@/utils/gsap";

const metrics = [
  { value: "3+", label: "Years Hands-on Experience" },
  { value: "52+", label: "Production Modules" },
  { value: "100+", label: "Controllers" },
  { value: "90+", label: "Lighthouse Score" },
];

export function MetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

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

    if (metricsRef.current) {
      const metricCards = Array.from(metricsRef.current.children);
      staggeredReveal(metricCards as HTMLElement[], 0.1);
    }
  }, []);

  return (
    <Column fillWidth ref={containerRef} style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <Column fillWidth gap="m" horizontal="center" marginBottom="l">
        <Heading 
          className="section-title"
          variant="display-strong-m"
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          Engineering Scale
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}
        >
          Quantified evidence of production system complexity and hands-on experience
        </Text>
      </Column>
      
      <div ref={metricsRef}>
        <Flex
          fillWidth
          gap="12"
          wrap
          horizontal="center"
          style={{ 
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)',
            borderTop: "1px solid var(--neutral-alpha-weak)", 
            borderBottom: "1px solid var(--neutral-alpha-weak)",
            background: 'var(--surface)',
            borderRadius: '1.5rem',
          }}
        >
          {metrics.map((m) => (
            <Flex 
              key={m.label} 
              direction="column" 
              horizontal="center" 
              flex={1} 
              padding="16" 
              gap="4" 
              style={{ minWidth: 'clamp(120px, 25vw, 180px)' }}
            >
              <Text 
                variant="display-strong-l" 
                onBackground="brand-strong"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
              >
                {m.value}
              </Text>
              <Flex horizontal="center">
                <Text 
                  variant="body-default-s" 
                  onBackground="neutral-weak"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  {m.label}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </div>
    </Column>
  );
}
