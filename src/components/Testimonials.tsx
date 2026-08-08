"use client";

import React, { useEffect, useRef } from "react";
import { Column, Flex, Text, Heading, Media } from "@once-ui-system/core";
import { cardStacking, premiumEase } from "@/utils/gsap";

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  image?: string;
}

interface TestimonialsProps {
  title: string;
  description: string;
  items: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  description,
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = Array.from(containerRef.current.children);
      cardStacking(cards as HTMLElement[]);
    }
  }, [items]);

  return (
    <Column fillWidth gap="xl" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <Column fillWidth gap="m" horizontal="center" maxWidth="m">
        <Heading 
          variant="display-strong-m"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          {title}
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
          {description}
        </Text>
      </Column>

      <Flex
        ref={containerRef}
        fillWidth
        gap="l"
        wrap
        horizontal="center"
        style={{ padding: 'clamp(2rem, 4vw, 4rem) 0' }}
      >
        {items.map((testimonial, index) => (
          <Column
            key={index}
            flex={1}
            padding="l"
            gap="m"
            style={{ 
              minWidth: 'clamp(280px, 30vw, 380px)',
              maxWidth: 'clamp(320px, 35vw, 420px)',
              position: 'relative',
              borderRadius: '2rem',
              padding: '0.5rem',
              background: 'var(--neutral-alpha-weak)',
              border: '1px solid var(--neutral-alpha-medium)',
              transition: `all 0.7s ${premiumEase}`,
            }}
            className="group hover:scale-[1.03] hover:shadow-2xl"
          >
            {/* Inner Core - Double-Bezel */}
            <Column
              fillWidth
              padding="l"
              gap="m"
              style={{
                borderRadius: 'calc(2rem - 0.5rem)',
                background: 'var(--surface)',
                minHeight: '280px',
                justifyContent: 'space-between',
              }}
            >
              {/* Quote */}
              <Text
                variant="body-default-m"
                onBackground="neutral-strong"
                style={{ 
                  fontStyle: "italic",
                  fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
                  lineHeight: '1.7',
                }}
              >
                "{testimonial.content}"
              </Text>

              {/* Divider */}
              <Flex
                fillWidth
                style={{
                  height: "1px",
                  background: "var(--neutral-alpha-weak)",
                }}
              />

              {/* Author Info */}
              <Flex gap="m" vertical="center">
                {testimonial.image && (
                  <Flex
                    radius="m"
                    border="neutral-medium"
                    overflow="hidden"
                    style={{ 
                      minWidth: '56px', 
                      minHeight: '56px',
                      borderRadius: '1rem',
                    }}
                  >
                    <Media
                      src={testimonial.image}
                      alt={testimonial.name}
                      sizes="56"
                      style={{ borderRadius: '1rem' }}
                    />
                  </Flex>
                )}
                <Column gap="2">
                  <Text 
                    variant="heading-strong-s" 
                    onBackground="neutral-strong"
                    style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', letterSpacing: '-0.01em' }}
                  >
                    {testimonial.name}
                  </Text>
                  <Text 
                    variant="body-default-xs" 
                    onBackground="neutral-weak"
                    style={{ 
                      fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {testimonial.role}
                  </Text>
                </Column>
              </Flex>
            </Column>
          </Column>
        ))}
      </Flex>
    </Column>
  );
};
