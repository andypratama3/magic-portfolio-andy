import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema } from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";

const metrics = [
  { value: "70%+", label: "Performance Improvement" },
  { value: "99.9%", label: "Uptime" },
  { value: "52", label: "Production Modules" },
  { value: "A+", label: "Security Rating" },
];

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured.display && (
          <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
            <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
              href={home.featured.href}>
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Flex gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="12" delay={0.5}>
        <Flex
          fillWidth
          gap="12"
          wrap
          horizontal="center"
          paddingY="32"
          paddingX="16"
          style={{ borderTop: "1px solid var(--neutral-alpha-weak)", borderBottom: "1px solid var(--neutral-alpha-weak)" }}
        >
          {metrics.map((m) => (
            <Flex key={m.label} direction="column" horizontal="center" flex={1} minWidth={120} padding="16" gap="4">
              <Text variant="display-strong-l" onBackground="brand-strong">{m.value}</Text>
              <Flex horizontal="center"><Text variant="body-default-s" onBackground="neutral-weak">{m.label}</Text></Flex>
            </Flex>
          ))}
        </Flex>
      </RevealFx>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      <Projects range={[2]} />
    </Column>
  );
}
