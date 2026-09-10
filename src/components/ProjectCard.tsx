"use client";

import { useEffect, useRef } from "react";
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { magneticButton, premiumEase } from "@/utils/gsap";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      magneticButton(buttonRef.current);
    }
  }, []);

  return (
    <Column 
      ref={cardRef}
      fillWidth 
      gap="m"
      style={{
        position: 'relative',
        borderRadius: '2rem',
        padding: '0.375rem',
        background: 'var(--neutral-alpha-weak)',
        border: '1px solid var(--neutral-alpha-medium)',
        transition: `all 0.7s ${premiumEase}`,
      }}
      className="group hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Inner Core - Double-Bezel Architecture */}
      <Column 
        fillWidth 
        gap="m"
        style={{
          borderRadius: 'calc(2rem - 0.375rem)',
          background: 'var(--surface)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Image Carousel with Hover Effect */}
        <div 
          style={{ 
            overflow: 'hidden',
            borderRadius: 'calc(2rem - 0.375rem) calc(2rem - 0.375rem) 0 0',
          }}
          className="group"
        >
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={images.map((image) => ({
              slide: image,
              alt: title,
            }))}
            style={{
              transition: `transform 0.7s ${premiumEase}`,
            }}
            className="group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <Column
          fillWidth
          paddingX="l"
          paddingTop="l"
          paddingBottom="l"
          gap="m"
        >
          {title && (
            <Heading 
              as="h2" 
              wrap="balance" 
              variant="heading-strong-xl"
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
              }}
            >
              {title}
            </Heading>
          )}
          {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
            <Column fillWidth gap="16">
              {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
              {description?.trim() && (
                <Text 
                  wrap="balance" 
                  variant="body-default-s" 
                  onBackground="neutral-weak"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                    lineHeight: '1.6',
                  }}
                >
                  {description}
                </Text>
              )}
              <Flex gap="24" wrap>
                {content?.trim() && (
                  <SmartLink
                    ref={buttonRef}
                    suffixIcon="arrowRight"
                    style={{ 
                      margin: "0", 
                      width: "fit-content",
                      borderRadius: '9999px',
                      padding: '0.75rem 1.5rem',
                      background: 'var(--brand-alpha-weak)',
                      border: '1px solid var(--brand-alpha-medium)',
                      transition: `all 0.7s ${premiumEase}`,
                    }}
                    href={href}
                    className="group-hover:bg-brand-alpha-medium group-hover:scale-105 active:scale-[0.98]"
                  >
                    <Text 
                      variant="body-default-s"
                      style={{ fontWeight: 500 }}
                    >
                      View
                    </Text>
                  </SmartLink>
                )}
                {link && (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    style={{ 
                      margin: "0", 
                      width: "fit-content",
                      borderRadius: '9999px',
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      border: '1px solid var(--neutral-alpha-medium)',
                      transition: `all 0.7s ${premiumEase}`,
                    }}
                    href={link}
                    className="group-hover:border-brand-alpha-medium group-hover:scale-105 active:scale-[0.98]"
                  >
                    <Text 
                      variant="body-default-s"
                      style={{ fontWeight: 500 }}
                    >
                      View Project
                    </Text>
                  </SmartLink>
                )}
              </Flex>
            </Column>
          )}
        </Column>
      </Column>
    </Column>
  );
};
