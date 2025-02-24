import type { TransformedToken, PreprocessedTokens } from 'style-dictionary/types';

// Custom transformer that only converts px to rem for Spacing tokens
export const spacingPxToRem = {
  name: 'size/spacingPxToRem',
  type: 'value' as const,
  matcher: function(token: PreprocessedTokens): boolean {
    // Use Array.some() for better type safety when checking paths
    return Array.isArray(token.path) && token.path.some(segment => segment === 'Spacing');
  },
  transform: function(token: TransformedToken): unknown {
    const baseFont = 16;

    // Handle pixel values
    if (typeof token.value === 'string' && token.value.endsWith('px')) {
      const pxValue = parseFloat(token.value.replace('px', ''));
      return `${pxValue / baseFont}rem`;
    }

    // Pass through other values
    return token.value;
  }
}