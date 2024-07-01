import React from 'react';
import { Border, Elevation } from '../../../dist/index.js';

interface ColorSwatchProps {
  /**
   * The color to display
   */
  color: string;
  /**
   * The elevation to display
   */
  elevation: string | undefined;
  /**
   * The shape of the swatch
   */
  shape: 'circle' | 'square';
}

export const ColorSwatch = ({ color, elevation, shape }: ColorSwatchProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
        border: `1px solid ${Border.Normal}`,
        borderRadius: shape === 'square' ? '0' : '50%',
        flexShrink: 0,
        marginTop: 8,
        height: '50px',
        width: '50px',
        boxShadow: elevation
      }}
    />
  );
};
