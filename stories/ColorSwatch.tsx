import React from 'react';
import { Border } from '../dist/index.js';

interface ColorSwatchProps {
  /**
   * The color to display
   */
  color: string;
}

/**
 * A color swatch
 */
export const ColorSwatch = ({ color }: ColorSwatchProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
        border: `1px solid ${Border.Normal}`,
        borderRadius: '50%',
        width: '50px',
        height: '50px',
      }}
    />
  );
}

