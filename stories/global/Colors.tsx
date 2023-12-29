import React from 'react';
import { Color, Font, Spacing, Border } from '../../dist/index.js';
import { Section } from '../Section';

export const GlobalColors = () => (
  <>
    {Object.entries(Color).map(([colorName, colorObject]) => (
      <Section
        colorName={colorName}
        colorObject={colorObject}
        key={colorName}
        title={`${colorName} Colors`}
      />
    ))}
  </>
);
