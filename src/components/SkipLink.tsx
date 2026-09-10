"use client";

import { useEffect, useState } from 'react';

export function SkipLink() {
  const [isVisible, setIsVisible] = useState(false);

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: isVisible ? '1rem' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--brand)',
        color: 'var(--on-brand)',
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        zIndex: 9999,
        textDecoration: 'none',
        fontWeight: 500,
        transition: 'top 0.3s ease',
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      Skip to main content
    </a>
  );
}
