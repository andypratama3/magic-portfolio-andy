import { Column, Meta, Schema, Heading, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { ProjectsWrapper } from "@/components/work/ProjectsWrapper";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center" style={{ padding: 'clamp(2rem, 5vw, 6rem) 0' }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="s" horizontal="center" style={{ maxWidth: '720px', textAlign: 'center' }}>
        <Heading variant="display-strong-xl" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.015em', lineHeight: '1.2' }}>
          {work.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', lineHeight: '1.65', maxWidth: '540px' }}>
          {work.description}
        </Text>
      </Column>
      <ProjectsWrapper />
    </Column>
  );
}
