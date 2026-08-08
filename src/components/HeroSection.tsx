"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Heading, Flex, Text, Button, Avatar, Media, Column } from "@once-ui-system/core";
import { animateHero, premiumEase } from "@/utils/gsap";

interface HeroSectionProps {
  headline: ReactNode;
  subline: ReactNode;
  aboutPath: string;
  aboutTitle: string;
  aboutAvatarDisplay: boolean;
  personAvatar: string;
}

export function HeroSection({
  headline,
  subline,
  aboutPath,
  aboutTitle,
  aboutAvatarDisplay,
  personAvatar,
}: HeroSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current && sublineRef.current && buttonsRef.current && imageRef.current) {
      animateHero({
        heading: headingRef.current,
        subline: sublineRef.current,
        buttons: buttonsRef.current,
        image: imageRef.current,
      });
    }
  }, []);

  return (
    <Column fillWidth gap="m" style={{ minHeight: 'min(80vh, 800px)', alignItems: 'center', justifyContent: 'center' }}>
      <Flex 
        fillWidth 
        gap="l" 
        horizontal="center" 
        vertical="center" 
        mobileDirection="column" 
        style={{ padding: 'clamp(2rem, 8vw, 6rem) 0' }}
      >
        <Column flex={1} gap="m" style={{ minWidth: '300px', maxWidth: 'clamp(600px, 80vw, 900px)' }}>
          <div ref={headingRef}>
            <Heading 
              wrap="balance" 
              variant="display-strong-l"
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
              }}
            >
              {headline}
            </Heading>
          </div>
          
          <div ref={sublineRef}>
            <Text 
              wrap="balance" 
              onBackground="neutral-weak" 
              variant="heading-default-xl"
              style={{ 
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                lineHeight: '1.5',
                maxWidth: '600px',
              }}
            >
              {subline}
            </Text>
          </div>
          
          <div ref={buttonsRef}>
            <Flex gap="m" wrap style={{ paddingTop: '1.5rem' }}>
              <Button
                id="about"
                data-border="rounded"
                href={aboutPath}
                variant="secondary"
                size="l"
                weight="default"
                arrowIcon
                style={{
                  borderRadius: '9999px',
                  padding: '1rem 2rem',
                  transition: `all 0.7s ${premiumEase}`,
                }}
                className="group"
              >
                <Flex gap="8" vertical="center" paddingRight="4">
                  {aboutAvatarDisplay && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={personAvatar}
                      size="m"
                    />
                  )}
                  {aboutTitle}
                </Flex>
              </Button>
              <Button
                href="https://cal.com/andypratama"
                variant="primary"
                size="l"
                weight="default"
                arrowIcon
                style={{
                  borderRadius: '9999px',
                  padding: '1rem 2rem',
                  transition: `all 0.7s ${premiumEase}`,
                }}
                className="group"
              >
                Let's Build Together
              </Button>
            </Flex>
          </div>
        </Column>
        
        <div ref={imageRef}>
          <Flex
            radius="xl"
            border="neutral-medium"
            overflow="hidden"
            style={{
              minWidth: 'clamp(280px, 40vw, 400px)',
              minHeight: 'clamp(280px, 40vw, 400px)',
              maxWidth: 'clamp(320px, 45vw, 450px)',
              maxHeight: 'clamp(320px, 45vw, 450px)',
              boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
              borderRadius: '2rem',
            }}
          >
            <Media
              src={personAvatar}
              alt="Profile"
              sizes="450px"
              style={{ borderRadius: '2rem' }}
            />
          </Flex>
        </div>
      </Flex>
    </Column>
  );
}
