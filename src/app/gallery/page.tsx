import { Flex, Meta, Schema, Column, Heading, Text } from "@once-ui-system/core";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL, gallery, person } from "@/resources";
import { typography } from "@/utils/typography";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="s" horizontal="center" style={{ maxWidth: '720px', textAlign: 'center' }}>
        <Heading variant="display-strong-xl" style={{ fontSize: typography.heading.xl, letterSpacing: typography.letterSpacing.normal, lineHeight: typography.lineHeight.normal }}>
          {gallery.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" style={{ fontSize: typography.body.m, lineHeight: typography.lineHeight.loose, letterSpacing: typography.letterSpacing.wide, maxWidth: '540px' }}>
          {gallery.description}
        </Text>
      </Column>
      <MasonryGrid />
    </Column>
  );
}
