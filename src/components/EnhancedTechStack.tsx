"use client";

import { useEffect, useRef } from "react";
import { Flex, Text, Column, Heading } from "@once-ui-system/core";
import { gsap } from "gsap";
import { staggeredReveal } from "@/utils/gsap";

interface SkillCategory {
  title: string;
  level: string;
  description: string;
  technologies: Array<{
    name: string;
    icon: string;
    proficiency?: string;
  }>;
}

interface EnhancedTechStackProps {
  skills: SkillCategory[];
}

export function EnhancedTechStack({ skills }: EnhancedTechStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const title = containerRef.current.querySelector('.section-title');
      if (title) {
        gsap.fromTo(title,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' }
        );
      }
    }

    if (categoriesRef.current) {
      const categoryCards = Array.from(categoriesRef.current.children);
      staggeredReveal(categoryCards as HTMLElement[], 0.15);
    }
  }, []);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'core':
        return 'var(--brand-background-strong)';
      case 'strong':
        return 'var(--accent-background-strong)';
      case 'working':
        return 'var(--neutral-background-strong)';
      case 'exposure':
        return 'var(--neutral-alpha-strong)';
      default:
        return 'var(--neutral-alpha-medium)';
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level.toLowerCase()) {
      case 'core':
        return 'Core';
      case 'strong':
        return 'Strong';
      case 'working':
        return 'Working';
      case 'exposure':
        return 'Exposure';
      default:
        return level;
    }
  };

  return (
    <Column fillWidth ref={containerRef} style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <Column fillWidth gap="s" horizontal="center" marginBottom="xl" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Heading 
          className="section-title"
          variant="display-strong-m"
          style={{
            fontSize: 'clamp(1.625rem, 2.75vw, 2.25rem)',
            letterSpacing: '-0.015em',
            textAlign: 'center',
            lineHeight: '1.2',
          }}
        >
          Technical Skills
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{
            fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
            textAlign: 'center',
            maxWidth: '540px',
            lineHeight: '1.65',
          }}
        >
          Backend-focused full stack engineering with production experience across multiple domains
        </Text>
      </Column>
      
      <div ref={categoriesRef}>
        <Column fillWidth gap="l">
          {skills.map((category, categoryIndex) => (
            <Column
              key={categoryIndex}
              fillWidth
              gap="m"
              style={{
                padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                background: 'var(--surface)',
                borderRadius: '1.25rem',
                border: '1px solid var(--neutral-alpha-weak)',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
              className="hover:shadow-lg hover:border-brand-alpha-weak"
            >
              {/* Category Header */}
              <Flex
                fillWidth
                horizontal="space-between"
                vertical="center"
                mobileDirection="column"
                gap="s"
              >
                <Column gap="xs" style={{ flex: 1 }}>
                  <Heading variant="heading-strong-xl" style={{ fontSize: 'clamp(1.125rem, 1.75vw, 1.375rem)', lineHeight: '1.3' }}>
                    {category.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: '1.5' }}>
                    {category.description}
                  </Text>
                </Column>
                
                <Flex
                  gap="4"
                  vertical="center"
                  style={{
                    padding: '0.375rem 0.875rem',
                    background: getLevelColor(category.level),
                    borderRadius: '9999px',
                    color: 'white',
                  }}
                >
                  <Text variant="label-default-s" style={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                    {getLevelBadge(category.level)}
                  </Text>
                </Flex>
              </Flex>

              {/* Technologies Grid */}
              <Flex
                fillWidth
                gap="s"
                wrap
                style={{
                  paddingTop: 'm',
                  borderTop: '1px solid var(--neutral-alpha-weak)',
                }}
              >
                {category.technologies.map((tech, techIndex) => (
                  <Flex
                    key={techIndex}
                    gap="4"
                    vertical="center"
                    className="tech-technology-pill"
                    style={{
                      padding: '0.625rem 1rem',
                      background: 'var(--brand-alpha-weak)',
                      borderRadius: '9999px',
                      border: '1px solid var(--neutral-alpha-medium)',
                      transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
                    }}
                  >
                    <div className="tech-stack-badge" style={{ position: 'relative', zIndex: '1' }}>
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        style={{
                          width: '20px',
                          height: '20px',
                          objectFit: 'contain',
                          filter: 'brightness(0.9)',
                          display: 'block',
                        }}
                        onError={(e) => {
                          // Fallback for broken icons - show first letter
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `<span class="tech-badge-fallback">${tech.name.charAt(0)}</span>`;
                          }
                        }}
                      />
                    </div>
                    <Text variant="body-default-s" style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {tech.name}
                    </Text>
                    {tech.proficiency && (
                      <Text
                        variant="label-default-xs"
                        onBackground="neutral-weak"
                        style={{
                          padding: '2px 6px',
                          background: 'var(--neutral-alpha-medium)',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {tech.proficiency}
                      </Text>
                    )}
                  </Flex>
                ))}
              </Flex>
            </Column>
          ))}
        </Column>
      </div>
    </Column>
  );
}