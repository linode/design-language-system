import { spacingPxToRem } from './spacingPxToRem';
import { expect, describe, it } from 'vitest';

import type { TransformedToken } from 'style-dictionary/types';

describe('spacingPxToRem transformer', () => {
  // Test the matcher function
  describe('matcher', () => {
    it('should return true for tokens with "spacing" in the path', () => {
      const token = {
        path: ['global', 'spacing', 's64'],
        value: '64px',
        original: { value: '64px' },
        name: 's64',
      } as TransformedToken;

      expect(spacingPxToRem.matcher(token)).toBe(true);
    });

    it('should return false for tokens without "spacing" in the path', () => {
      const token = {
        path: ['global', 'typography', 'fontSize'],
        value: '16px',
        original: { value: '16px' },
        name: 'fontSize',
      } as TransformedToken;

      expect(spacingPxToRem.matcher(token)).toBe(false);
    });

    it('should be case sensitive and return false for "Spacing" with capital S', () => {
      const token = {
        path: ['global', 'Spacing', 's64'],
        value: '64px',
        original: { value: '64px' },
        name: 's64',
      } as TransformedToken;

      expect(spacingPxToRem.matcher(token)).toBe(false);
    });
  });

  // Test the transform function
  describe('transform', () => {
    it('should convert px values to rem', () => {
      const token = {
        path: ['global', 'spacing', 's64'],
        value: '64px',
        original: { value: '64px' },
        name: 's64',
      } as TransformedToken;

      expect(spacingPxToRem.transform(token)).toBe('4rem');
    });

    it('should handle decimal px values correctly', () => {
      const token = {
        path: ['global', 'spacing', 's5_5'],
        value: '5.5px',
        original: { value: '5.5px' },
        name: 's5_5',
      } as TransformedToken;

      expect(spacingPxToRem.transform(token)).toBe('0.34375rem');
    });

    it('should pass through non-px values unchanged', () => {
      const token = {
        path: ['global', 'spacing', 'auto'],
        value: 'auto',
        original: { value: 'auto' },
        name: 'auto',
      } as TransformedToken;

      expect(spacingPxToRem.transform(token)).toBe('auto');
    });

    it('should pass through rem values unchanged', () => {
      const token = {
        path: ['global', 'spacing', 's1'],
        value: '1rem',
        original: { value: '1rem' },
        name: 's1',
      } as TransformedToken;

      expect(spacingPxToRem.transform(token)).toBe('1rem');
    });

    it('should pass through numeric values unchanged', () => {
      const token = {
        path: ['global', 'spacing', 'zero'],
        value: 0,
        original: { value: 0 },
        name: 'zero',
      } as TransformedToken;

      expect(spacingPxToRem.transform(token)).toBe(0);
    });
  });
});