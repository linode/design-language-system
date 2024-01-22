import React from 'react';
import { Border } from '../dist/index.js';

interface ColorSwatchProps {
  /**
   * The color to display
   */
  color: string;
}

export const ColorSwatch = ({ color }: ColorSwatchProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
        border: `1px solid ${Border.Normal}`,
        borderRadius: '50%',
        flexShrink: 0,
        height: '50px',
        width: '50px'
      }}
    />
  );
};
