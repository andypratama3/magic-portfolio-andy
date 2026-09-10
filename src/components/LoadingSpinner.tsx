import { Flex } from "@once-ui-system/core";

interface LoadingSpinnerProps {
  size?: 's' | 'm' | 'l';
  color?: string;
}

export function LoadingSpinner({ size = 'm', color = 'var(--brand)' }: LoadingSpinnerProps) {
  const sizeMap = {
    s: '24px',
    m: '32px',
    l: '48px',
  };

  return (
    <Flex
      horizontal="center"
      vertical="center"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Flex>
  );
}
