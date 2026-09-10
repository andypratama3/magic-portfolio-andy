/**
 * Standardized Typography Scale
 * Consistent responsive typography using clamp() functions
 */

export const typography = {
  // Display headings
  display: {
    xl: 'clamp(2.5rem, 5vw, 4.5rem)', // Hero/impact headings
    l: 'clamp(2rem, 4vw, 3.5rem)',  // Large section headings
    m: 'clamp(1.75rem, 3.5vw, 2.5rem)', // Medium section headings
    s: 'clamp(1.5rem, 3vw, 2rem)',  // Small section headings
    xs: 'clamp(1.25rem, 2.5vw, 1.75rem)', // Extra small section headings
  },
  
  // Content headings
  heading: {
    xl: 'clamp(1.75rem, 3.5vw, 2.5rem)', // Page titles
    l: 'clamp(1.5rem, 3vw, 2rem)',      // Major headings
    m: 'clamp(1.25rem, 2.5vw, 1.75rem)', // Subheadings
    s: 'clamp(1.125rem, 2vw, 1.5rem)',  // Minor headings
    xs: 'clamp(1rem, 1.75vw, 1.25rem)', // Micro headings
  },
  
  // Body text
  body: {
    xl: 'clamp(1.25rem, 2.5vw, 1.5rem)', // Large body text
    l: 'clamp(1.125rem, 2vw, 1.375rem)', // Large body text
    m: 'clamp(1rem, 1.5vw, 1.125rem)',  // Default body text
    s: 'clamp(0.9375rem, 1.25vw, 1rem)', // Small body text
    xs: 'clamp(0.875rem, 1vw, 0.9375rem)', // Extra small body text
  },
  
  // Labels and captions
  label: {
    l: 'clamp(0.9375rem, 1.25vw, 1rem)', // Large labels
    m: 'clamp(0.875rem, 1vw, 0.9375rem)', // Default labels
    s: 'clamp(0.8125rem, 0.875vw, 0.875rem)', // Small labels
    xs: 'clamp(0.75rem, 0.75vw, 0.8125rem)', // Extra small labels
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',  // Display headings
    normal: '-0.015em', // Regular headings
    wide: '0.01em',     // Body text
    wider: '0.02em',    // Labels/captions
  },
  
  // Line height
  lineHeight: {
    tight: '1.1',    // Display text
    normal: '1.2',  // Headings
    relaxed: '1.5', // Body text
    loose: '1.7',   // Long-form content
  },
};

/**
 * Get typography styles for a specific element type
 */
export function getTypographyStyles(type: 'display' | 'heading' | 'body' | 'label', size: 'xl' | 'l' | 'm' | 's' | 'xs') {
  const sizeMap = (typography[type] as Record<string, string>)[size];
  const letterSpacing = type === 'display' ? typography.letterSpacing.tight :
                      type === 'heading' ? typography.letterSpacing.normal :
                      type === 'body' ? typography.letterSpacing.wide :
                      typography.letterSpacing.wider;
  
  const lineHeight = type === 'display' ? typography.lineHeight.tight :
                    type === 'heading' ? typography.lineHeight.normal :
                    type === 'body' ? typography.lineHeight.relaxed :
                    typography.lineHeight.loose;
  
  return {
    fontSize: sizeMap,
    letterSpacing,
    lineHeight,
  };
}
