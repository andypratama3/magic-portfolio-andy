import { Column, Flex, Text, Button, Icon } from "@once-ui-system/core";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  onDismiss,
}: ErrorMessageProps) {
  return (
    <Column
      fillWidth
      horizontal="center"
      gap="m"
      style={{
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        background: 'var(--brand-alpha-weak)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--brand-alpha-medium)',
        maxWidth: '600px',
      }}
    >
      <Flex horizontal="center" gap="s">
        <Icon name="alertCircle" onBackground="brand-strong" size="l" />
        <Text variant="heading-strong-l" onBackground="brand-strong">
          {title}
        </Text>
      </Flex>
      <Text variant="body-default-l" onBackground="brand-medium" style={{ textAlign: 'center' }}>
        {message}
      </Text>
      {(onRetry || onDismiss) && (
        <Flex horizontal="center" gap="s" paddingTop="s">
          {onRetry && (
            <Button
              variant="primary"
              onClick={onRetry}
              size="m"
              style={{
                borderRadius: 'var(--radius-full)',
                transition: 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
              className="hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              Try Again
            </Button>
          )}
          {onDismiss && (
            <Button
              variant="secondary"
              onClick={onDismiss}
              size="m"
              style={{
                borderRadius: 'var(--radius-full)',
                transition: 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
              className="hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              Dismiss
            </Button>
          )}
        </Flex>
      )}
    </Column>
  );
}
