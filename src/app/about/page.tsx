import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import { AboutClient } from "@/components/AboutClient";
import { EngineeringPhilosophy } from "@/components/EngineeringPhilosophy";
import { EnhancedProfileSection } from "@/components/EnhancedProfileSection";
import { EnhancedTechStack } from "@/components/EnhancedTechStack";
import styles from "@/components/about/about.module.scss";
import React from "react";

interface ExperienceImage {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const engineeringPhilosophy = {
    display: true,
    title: "Engineering Philosophy",
    description: (
      <>
        I approach software development as an end-to-end engineering problem. Technology exists to solve real business problems, not to be an end in itself.
        <br />
        <br />
        <strong>Solve the business problem:</strong> I focus on understanding requirements first, then choosing the right tools to solve them effectively.
        <br />
        <br />
        <strong>Design for maintainability:</strong> I prefer clear boundaries, understandable architecture, and separation of concerns over clever code.
        <br />
        <br />
        <strong>Build for production:</strong> I think about security, deployment, monitoring, and maintenance from the start, not as an afterthought.
        <br />
        <br />
        <strong>Automate repetitive work:</strong> I use queues, jobs, integrations, and automation to reduce manual overhead and improve reliability.
        <br />
        <br />
        <strong>Measure improvements:</strong> I use measurable results whenever possible — performance metrics, security scores, and user outcomes.
      </>
    ),
  };

  const structure = [
    {
      title: "Profile",
      display: true,
      items: [],
    },
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: engineeringPhilosophy.title,
      display: engineeringPhilosophy.display,
      items: [],
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <nav aria-label="Table of Contents">
          <TableOfContents structure={structure} about={about} />
        </nav>
      )}
      <AboutClient>
        <Column as="main" id="main-content" fillWidth gap="l">
          {/* Enhanced Profile Section */}
          <EnhancedProfileSection
            person={person}
            social={social}
            calendar={about.calendar}
          />

          {/* Introduction */}
          {about.intro.display && (
            <Column
              fillWidth
              gap="s"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--neutral-alpha-weak)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Heading variant="display-strong-s" marginBottom="s" style={{ fontSize: 'clamp(1.375rem, 2.25vw, 1.75rem)' }}>
                {about.intro.title}
              </Heading>
              <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: '1.7' }}>
                {about.intro.description}
              </Text>
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m" className="animate-on-scroll" style={{ fontSize: 'clamp(1.375rem, 2.25vw, 1.75rem)' }}>
                {about.work.title}
              </Heading>
              <Column fillWidth gap="m" marginBottom="xl">
                {about.work.experiences.map((experience, index) => (
                  <Column 
                    key={`${experience.company}-${experience.role}-${index}`} 
                    fillWidth
                    gap="s"
                    className={`${styles.rowHover} animate-on-scroll`}
                    style={{
                      padding: 'clamp(1.5rem, 3vw, 2rem)',
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--neutral-alpha-weak)',
                    }}
                  >
                    <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="2">
                      <Text id={experience.company} variant="heading-strong-l" style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)' }}>
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="s" style={{ fontWeight: 500 }}>
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="12">
                      {experience.achievements.map((achievement: JSX.Element, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                          style={{ lineHeight: '1.6' }}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" gap="m" wrap>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            style={{
                              width: 'clamp(200px, 45%, 280px)',
                              aspectRatio: '16 / 9',
                              overflow: 'hidden',
                              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                              boxShadow: 'var(--shadow-sm)',
                            }}
                            className="hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes="(max-width: 768px) 100vw, 280px"
                              alt={(image as ExperienceImage).alt}
                              src={(image as ExperienceImage).src}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m" className="animate-on-scroll" style={{ fontSize: 'clamp(1.375rem, 2.25vw, 1.75rem)' }}>
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="m" marginBottom="xl">
                {about.studies.institutions.map((institution, index) => (
                  <Column 
                    key={`${institution.name}-${index}`} 
                    fillWidth 
                    gap="xs"
                    className={`${styles.rowHover} animate-on-scroll`}
                    style={{
                      padding: 'clamp(1.5rem, 3vw, 2rem)',
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--neutral-alpha-weak)',
                    }}
                  >
                    <Text id={institution.name} variant="heading-strong-l" style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)' }}>
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak" style={{ lineHeight: '1.5' }}>
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <EnhancedTechStack skills={about.technical.skills} />
          )}

          {engineeringPhilosophy.display && (
            <>
              <Heading
                as="h2"
                id="engineering-philosophy"
                variant="display-strong-s"
                marginBottom="m"
                className="animate-on-scroll"
                style={{ fontSize: 'clamp(1.375rem, 2.25vw, 1.75rem)' }}
              >
                {engineeringPhilosophy.title}
              </Heading>
              <Column 
                fillWidth 
                gap="s" 
                className="animate-on-scroll"
                style={{
                  padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                  background: 'var(--surface)',
                  borderRadius: '1.25rem',
                  border: '1px solid var(--neutral-alpha-weak)',
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                }}
              >
                <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: '1.7' }}>
                  {engineeringPhilosophy.description}
                </Text>
              </Column>
            </>
          )}
        </Column>
      </AboutClient>
  </Column>
  );
}
