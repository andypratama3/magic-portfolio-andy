"use client";

import { Flex, IconButton, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";
import { useEffect, useRef } from "react";
import { premiumEase } from "@/utils/gsap";
import type React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      // Animate footer on scroll into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.style.opacity = '1';
              target.style.transform = 'translateY(0)';
            }
          });
        },
        { threshold: 0.1 }
      );

      const socialIcons = footerRef.current.querySelectorAll<HTMLElement>('.footer-social-icon');
      socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        icon.style.transition = `all 0.6s ${premiumEase} ${index * 0.1}s`;
        observer.observe(icon);
      });

      return () => {
        socialIcons.forEach((icon) => observer.unobserve(icon));
      };
    }
  }, []);

  return (
    <Flex
      ref={footerRef}
      as="footer"
      fillWidth
      padding="12"
      horizontal="center"
      mobileDirection="column"
      style={{ 
        borderTop: '1px solid var(--neutral-alpha-weak)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, var(--brand-alpha-weak) 0%, transparent 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="16"
        paddingX="20"
        gap="24"
        horizontal="space-between"
        vertical="center"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong" style={{ fontSize: '0.875rem' }}>
          <Text onBackground="neutral-weak">© {currentYear}</Text>
          <Text paddingX="8" style={{ fontWeight: '500' }}>{person.name}</Text>
        </Text>
        <Flex gap="20">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                  className="footer-social-icon"
                  style={{ 
                    transition: `all 0.3s ${premiumEase}`,
                    borderRadius: '8px',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
                    e.currentTarget.style.background = 'var(--brand-alpha-weak)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                />
              ),
          )}
        </Flex>
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  );
};
