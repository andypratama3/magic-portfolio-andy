"use client";

import { useEffect, useRef } from "react";
import { Flex, Text, Column, Heading, Avatar, Tag, Button } from "@once-ui-system/core";
import { gsap } from "gsap";
import { premiumEase } from "@/utils/gsap";

interface EnhancedProfileSectionProps {
  person: {
    name: string;
    role: string;
    positioning?: string;
    avatar: string;
    location: string;
    languages: string[];
  };
  social: Array<{
    name: string;
    icon: string;
    link: string;
  }>;
  calendar?: {
    display: boolean;
    link: string;
  };
}

export function EnhancedProfileSection({ person, social, calendar }: EnhancedProfileSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: premiumEase }
      );
    }

    if (avatarRef.current) {
      gsap.fromTo(avatarRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: premiumEase, delay: 0.2 }
      );
    }

    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: premiumEase, delay: 0.4 }
      );
    }

    if (socialRef.current) {
      const buttons = socialRef.current.querySelectorAll('button, a');
      gsap.fromTo(buttons,
        { y: 15, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: premiumEase,
          delay: 0.6
        }
      );
    }
  }, []);

  return (
    <Column
      ref={containerRef}
      fillWidth
      gap="xl"
      style={{
        padding: 'clamp(2.5rem, 5vw, 5rem)',
        background: 'var(--surface)',
        borderRadius: '1.25rem',
        border: '1px solid var(--neutral-alpha-weak)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
      }}
    >
      <Flex
        fillWidth
        gap="xl"
        mobileDirection="column"
        horizontal="center"
        vertical="center"
      >
        {/* Avatar Section */}
        <div ref={avatarRef}>
          <Flex
            style={{
              position: 'relative',
            }}
          >
            <Avatar
              src={person.avatar}
              size="xl"
              style={{
                borderRadius: '1.25rem',
                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
                border: '2px solid var(--brand-alpha-weak)',
                width: '180px',
                height: '180px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '6px',
                right: '6px',
                width: '14px',
                height: '14px',
                background: '#22c55e',
                borderRadius: '50%',
                border: '2px solid var(--surface)',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)',
                zIndex: 10,
              }}
            />
          </Flex>
        </div>

        {/* Text Content */}
        <Column ref={textRef} gap="s" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <Heading
            variant="display-strong-xl"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              letterSpacing: '-0.015em',
              lineHeight: '1.1',
            }}
          >
            {person.name}
          </Heading>
          
          <Text
            variant="heading-default-l"
            onBackground="brand-strong"
            style={{
              fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
              fontWeight: 600,
              lineHeight: '1.4',
            }}
          >
            {person.role}
          </Text>

          {person.positioning && (
            <Text
              variant="body-default-l"
              onBackground="neutral-weak"
              style={{
                maxWidth: '480px',
                lineHeight: '1.65',
                marginTop: '0.5rem',
              }}
            >
              {person.positioning}
            </Text>
          )}

          {/* Location and Languages */}
          <Flex
            gap="s"
            horizontal="center"
            wrap
            style={{ paddingTop: '1.25rem' }}
          >
            <Flex
              gap="4"
              vertical="center"
              style={{
                padding: '0.4375rem 0.875rem',
                background: 'var(--brand-alpha-weak)',
                borderRadius: '9999px',
              }}
            >
              <Text variant="body-default-s">📍</Text>
              <Text variant="body-default-s">{person.location}</Text>
            </Flex>

            {person.languages.map((language) => (
              <Tag
                key={language}
                size="m"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4375rem 0.875rem',
                }}
              >
                {language}
              </Tag>
            ))}
          </Flex>
        </Column>
      </Flex>

      {/* Social Links */}
      <div ref={socialRef}>
        <Flex
          gap="s"
          horizontal="center"
          wrap
          style={{ paddingTop: '1.25rem' }}
        >
          {social.map((item) => (
            <Button
              key={item.name}
              href={item.link}
              prefixIcon={item.icon}
              label={item.name}
              variant="secondary"
              size="l"
              style={{
                borderRadius: '9999px',
                padding: '0.625rem 1.25rem',
                transition: `all 0.25s ${premiumEase}`,
              }}
              className="hover:scale-105 hover:shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            />
          ))}
        </Flex>
      </div>

      {/* Calendar CTA */}
      {calendar?.display && (
        <Flex horizontal="center" style={{ paddingTop: '1.25rem' }}>
          <Button
            href={calendar.link}
            variant="primary"
            size="l"
            arrowIcon
            style={{
              borderRadius: '9999px',
              padding: '0.875rem 1.75rem',
              transition: `all 0.25s ${premiumEase}`,
            }}
            className="hover:scale-105 hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule a Consultation
          </Button>
        </Flex>
      )}
    </Column>
  );
}