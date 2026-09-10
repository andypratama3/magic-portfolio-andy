import { useEffect, useState } from 'react';
import { Flex, Text, Icon, Column } from '@once-ui-system/core';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
}

const typeConfig = {
  success: {
    icon: 'checkCircle',
    background: 'var(--brand-alpha-weak)',
    borderColor: 'var(--brand-alpha-medium)',
  },
  error: {
    icon: 'alertCircle',
    background: 'var(--brand-alpha-weak)',
    borderColor: 'var(--brand-alpha-medium)',
  },
  warning: {
    icon: 'alertTriangle',
    background: 'var(--accent-alpha-weak)',
    borderColor: 'var(--accent-alpha-medium)',
  },
  info: {
    icon: 'info',
    background: 'var(--brand-alpha-weak)',
    borderColor: 'var(--brand-alpha-medium)',
  },
};

export function Toast({ type, message, duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = typeConfig[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Flex
      horizontal="center"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: `translateX(-50%) ${isVisible ? 'translateY(0)' : 'translateY(100px)'}`,
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        zIndex: 9999,
        padding: '0',
      }}
    >
      <Flex
        gap="s"
        vertical="center"
        style={{
          padding: '1rem 1.5rem',
          background: config.background,
          border: `1px solid ${config.borderColor}`,
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          maxWidth: '500px',
          minWidth: '300px',
        }}
      >
        <Icon name={config.icon} size="m" />
        <Text variant="body-default-s" onBackground="neutral-strong" style={{ flex: 1 }}>
          {message}
        </Text>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.6,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
        >
          <Icon name="x" onBackground="neutral-weak" size="s" />
        </button>
      </Flex>
    </Flex>
  );
}

// Simple toast manager for the entire app
let toastListeners: Array<(toast: { type: ToastType; message: string }) => void> = [];

export const toast = {
  success: (message: string) => {
    toastListeners.forEach(listener => listener({ type: 'success', message }));
  },
  error: (message: string) => {
    toastListeners.forEach(listener => listener({ type: 'error', message }));
  },
  warning: (message: string) => {
    toastListeners.forEach(listener => listener({ type: 'warning', message }));
  },
  info: (message: string) => {
    toastListeners.forEach(listener => listener({ type: 'info', message }));
  },
  subscribe: (listener: (toast: { type: ToastType; message: string }) => void) => {
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  },
};
