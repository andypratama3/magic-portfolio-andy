"use client";

import React, { useEffect, useRef } from "react";
import { Column, Flex, Text, Heading, Button } from "@once-ui-system/core";
import { magneticButton, premiumEase } from "@/utils/gsap";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}) => {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const secondaryButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (primaryButtonRef.current) {
      magneticButton(primaryButtonRef.current);
    }
    if (secondaryButtonRef.current) {
      magneticButton(secondaryButtonRef.current);
    }
  }, []);

  return (
    <Column
      ref={containerRef}
      fillWidth
      gap="l"
      horizontal="center"
      style={{
        position: 'relative',
        borderRadius: '2.5rem',
        padding: '0.75rem',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
        paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
        background: 'var(--brand-alpha-weak)',
        border: '1px solid var(--brand-alpha-medium)',
        maxWidth: 'clamp(600px, 80vw, 900px)',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Background Effect */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at 30% 30%, var(--brand-alpha-weak) 0%, transparent 50%)',
          opacity: 0.5,
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />

      {/* Inner Core - Double-Bezel */}
      <Column
        fillWidth
        gap="l"
        horizontal="center"
        style={{
          borderRadius: 'calc(2.5rem - 0.75rem)',
          background: 'var(--surface)',
          position: 'relative',
          zIndex: 1,
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          paddingLeft: 'clamp(1.5rem, 3vw, 2.5rem)',
          paddingRight: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        <Column gap="m" horizontal="center" style={{ textAlign: 'center' }}>
          <Heading 
            variant="display-strong-m"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
            }}
          >
            {title}
          </Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              lineHeight: '1.6',
              maxWidth: '600px',
            }}
          >
            {description}
          </Text>
        </Column>

        <Flex gap="m" wrap horizontal="center" style={{ paddingTop: '1rem' }}>
          <div ref={primaryButtonRef as any}>
            <Button
              href={primaryButtonHref}
              variant="primary"
              size="l"
              weight="default"
              arrowIcon
              style={{
                borderRadius: '9999px',
                padding: '1rem 2rem',
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                transition: `all 0.7s ${premiumEase}`,
              }}
              className="group hover:scale-105 active:scale-[0.98]"
            >
              {primaryButtonText}
            </Button>
          </div>
          {secondaryButtonText && secondaryButtonHref && (
            <div ref={secondaryButtonRef as any}>
              <Button
                href={secondaryButtonHref}
                variant="secondary"
                size="l"
                weight="default"
                arrowIcon
                style={{
                  borderRadius: '9999px',
                  padding: '1rem 2rem',
                  fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                  transition: `all 0.7s ${premiumEase}`,
                }}
                className="group hover:scale-105 active:scale-[0.98]"
              >
                {secondaryButtonText}
              </Button>
            </div>
          )}
        </Flex>
      </Column>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </Column>
  );
};
