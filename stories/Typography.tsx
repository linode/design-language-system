import React from 'react';
import { Border, Color, Font, Spacing } from '../dist/index.js';

export const Typography = ({ key, format, value, isLowerCase = false }) => {
  if (isLowerCase) value = value.toLowerCase();

  return (
    <div
      key={key}
      style={{
        padding: Spacing[20]
      }}
    >
      <span
        style={{
          fontFamily: Font.FontFamily.Code,
          fontSize: Font.FontSize.Xxxs,
          fontWeight: Font.FontWeight.Semibold
        }}
      >
        {format}:
      </span>{' '}
      <span
        style={{
          background: Color.Neutrals[5],
          border: `1px solid ${Border.Normal}`,
          borderRadius: '0.2rem',
          color: Color.Red[90],
          fontFamily: Font.FontFamily.Code,
          fontSize: Font.FontSize.Xxxs,
          padding: Spacing[10],
          whiteSpace: 'nowrap'
        }}
      >
        {value}
      </span>
    </div>
  );
};
