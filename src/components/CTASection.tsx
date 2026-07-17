import React from "react";
import { Column, Flex, Text, Heading, Button } from "@once-ui-system/core";
import styles from "./CTASection.module.scss";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}) => {
  return (
    <Column
      fillWidth
      gap="l"
      paddingY="xl"
      paddingX="l"
      horizontal="center"
      className={styles.ctaContainer}
      background="brand-alpha-weak"
      radius="l"
      border="brand-alpha-medium"
      maxWidth="m"
    >
      <Column gap="m" horizontal="center">
        <Heading variant="display-strong-m" horizontal="center">
          {title}
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          horizontal="center"
        >
          {description}
        </Text>
      </Column>

      <Flex gap="m" wrap horizontal="center">
        <Button
          href={primaryButtonHref}
          variant="primary"
          size="l"
          weight="default"
          arrowIcon
        >
          {primaryButtonText}
        </Button>
        {secondaryButtonText && secondaryButtonHref && (
          <Button
            href={secondaryButtonHref}
            variant="secondary"
            size="l"
            weight="default"
            arrowIcon
          >
            {secondaryButtonText}
          </Button>
        )}
      </Flex>
    </Column>
  );
};
