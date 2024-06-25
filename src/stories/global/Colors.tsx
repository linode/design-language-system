import React from 'react';
import { Color } from '../../../dist/index.js';
import { Section } from '../Section.tsx';

export const GlobalColors = () => (
  <>
    {Object.entries(Color).map(([key, colorObject]) => (
      <Section key={key} title={key} value={colorObject} variant={key} />
    ))}
  </>
);
