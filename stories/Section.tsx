import React from 'react';
import { TokenInfo } from './Info';
import { Font } from '../dist/index.js';

export const Section = ({ colorObject, colorName, title }) => (
  <div key={colorName}>
    <h2
      style={{
        fontFamily: Font.FontFamily.Brand
      }}
    >
      {title}
    </h2>
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}
    >
      {Object.entries(colorObject).map(([value, color]) => (
        <div key={value}>
          <TokenInfo color={color} colorName={colorName} value={value} />
        </div>
      ))}
    </div>
  </div>
);
