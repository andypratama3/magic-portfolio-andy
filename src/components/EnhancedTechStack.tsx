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
  showHeader?: boolean;
}

export function EnhancedTechStack({ skills, showHeader = true }: EnhancedTechStackProps) {
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

  const getLevelStyle = (level: string) => {
    switch (level.toLowerCase()) {
      case 'core':
        return {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%)',
          boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)',
          border: '1px solid rgba(168, 85, 247, 0.5)',
          color: '#ffffff',
        };
      case 'strong':
        return {
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)',
          boxShadow: '0 0 16px rgba(14, 165, 233, 0.4)',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          color: '#ffffff',
        };
      case 'working':
        return {
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)',
          boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)',
          border: '1px solid rgba(16, 185, 129, 0.5)',
          color: '#ffffff',
        };
      case 'exposure':
        return {
          background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.8) 0%, rgba(71, 85, 105, 0.8) 100%)',
          boxShadow: '0 0 12px rgba(100, 116, 139, 0.25)',
          border: '1px solid rgba(148, 163, 184, 0.4)',
          color: '#ffffff',
        };
      default:
        return {
          background: 'var(--neutral-alpha-medium)',
          boxShadow: 'none',
          border: '1px solid transparent',
          color: '#ffffff',
        };
    }
  };

  const getProficiencyStyle = (proficiency?: string) => {
    switch (proficiency?.toLowerCase()) {
      case 'expert':
        return {
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#34d399',
          border: '1px solid rgba(52, 211, 153, 0.3)',
        };
      case 'strong':
        return {
          background: 'rgba(56, 189, 248, 0.15)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.3)',
        };
      case 'working':
        return {
          background: 'rgba(148, 163, 184, 0.15)',
          color: '#cbd5e1',
          border: '1px solid rgba(203, 213, 225, 0.3)',
        };
      case 'exposure':
        return {
          background: 'rgba(168, 85, 247, 0.15)',
          color: '#c084fc',
          border: '1px solid rgba(192, 132, 252, 0.3)',
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.08)',
          color: 'var(--neutral-on-background-weak)',
          border: '1px solid transparent',
        };
    }
  };

  return (
    <Column fillWidth ref={containerRef}>
      {showHeader && (
        <Column fillWidth gap="s" horizontal="center" marginBottom="xl" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Heading 
            className="section-title"
            id="Technical Skills"
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
            Fullstack software engineering with production experience across modern frontend and backend technologies
          </Text>
        </Column>
      )}
      
      <div ref={categoriesRef} style={{ width: '100%' }}>
        <Column fillWidth gap="l">
          {skills.map((category, categoryIndex) => {
            const badgeStyle = getLevelStyle(category.level);
            return (
              <Column
                key={categoryIndex}
                fillWidth
                gap="m"
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
                className="hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:shadow-2xl"
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
                    <Heading variant="heading-strong-xl" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)', lineHeight: '1.3', letterSpacing: '-0.01em' }}>
                      {category.title}
                    </Heading>
                    <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: '1.65', fontSize: '0.9375rem' }}>
                      {category.description}
                    </Text>
                  </Column>
                  
                  <Flex
                    vertical="center"
                    style={{
                      padding: '0.35rem 0.9rem',
                      background: badgeStyle.background,
                      boxShadow: badgeStyle.boxShadow,
                      border: badgeStyle.border,
                      borderRadius: '9999px',
                      color: badgeStyle.color,
                      alignSelf: 'flex-start',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Text variant="label-default-s" style={{ fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.02em' }}>
                      {category.level}
                    </Text>
                  </Flex>
                </Flex>

                {/* Technologies Grid */}
                <Flex
                  fillWidth
                  gap="s"
                  wrap
                  style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {category.technologies.map((tech, techIndex) => {
                    const profStyle = getProficiencyStyle(tech.proficiency);
                    return (
                      <Flex
                        key={techIndex}
                        gap="8"
                        vertical="center"
                        style={{
                          padding: '0.55rem 0.95rem',
                          background: 'rgba(255, 255, 255, 0.035)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '9999px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
                          cursor: 'default',
                        }}
                        className="hover:scale-[1.04] hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:shadow-lg"
                      >
                        <div style={{ position: 'relative', zIndex: '1', display: 'flex', alignItems: 'center' }}>
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            style={{
                              width: '20px',
                              height: '20px',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                              display: 'block',
                            }}
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              if (target.parentElement) {
                                target.parentElement.innerHTML = `<span style="font-weight:700;font-size:0.75rem;color:var(--brand-on-background-weak)">${tech.name.charAt(0)}</span>`;
                              }
                            }}
                          />
                        </div>
                        <Text variant="body-default-s" style={{ fontWeight: 500, fontSize: '0.875rem', letterSpacing: '-0.005em' }}>
                          {tech.name}
                        </Text>
                        {tech.proficiency && (
                          <span
                            style={{
                              padding: '2px 8px',
                              background: profStyle.background,
                              color: profStyle.color,
                              border: profStyle.border,
                              borderRadius: '9999px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              lineHeight: '1.3',
                              letterSpacing: '0.01em',
                            }}
                          >
                            {tech.proficiency}
                          </span>
                        )}
                      </Flex>
                    );
                  })}
                </Flex>
              </Column>
            );
          })}
        </Column>
      </div>
    </Column>
  );
}