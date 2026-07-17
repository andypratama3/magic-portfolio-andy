import React from "react";
import { Column, Flex, Text, Heading, Media } from "@once-ui-system/core";
import styles from "./Testimonials.module.scss";

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  image?: string;
}

interface TestimonialsProps {
  title: string;
  description: string;
  items: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <Column fillWidth gap="xl" marginY="xl">
      <Column fillWidth gap="m" horizontal="center" maxWidth="m">
        <Heading variant="display-strong-m">
          {title}
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
        >
          {description}
        </Text>
      </Column>

      <Flex
        fillWidth
        gap="l"
        wrap
        horizontal="center"
        paddingY="m"
      >
        {items.map((testimonial, index) => (
          <Column
            key={index}
            className={styles.testimonialCard}
            flex={1}
            minWidth="280px"
            maxWidth="380px"
            padding="l"
            border="neutral-medium"
            radius="m"
            gap="m"
            background="surface"
          >
            {/* Quote */}
            <Text
              variant="body-default-m"
              onBackground="neutral-strong"
              style={{ fontStyle: "italic" }}
            >
              "{testimonial.content}"
            </Text>

            {/* Divider */}
            <Flex
              fillWidth
              style={{
                height: "1px",
                background: "var(--neutral-alpha-weak)",
              }}
            />

            {/* Author Info */}
            <Flex gap="m" vertical="center">
              {testimonial.image && (
                <Flex
                  minWidth="48px"
                  minHeight="48px"
                  radius="m"
                  border="neutral-medium"
                  overflow="hidden"
                >
                  <Media
                    src={testimonial.image}
                    alt={testimonial.name}
                    sizes="48"
                  />
                </Flex>
              )}
              <Column gap="2">
                <Text variant="heading-strong-s" onBackground="neutral-strong">
                  {testimonial.name}
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {testimonial.role}
                </Text>
              </Column>
            </Flex>
          </Column>
        ))}
      </Flex>
    </Column>
  );
};
