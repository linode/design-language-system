import React from 'react';
import { Color } from '../../../dist/index.js';
import { Section } from '../reusable/Section.js';

export const GlobalColors = () => (
  <>
    {Object.entries(Color).map(([key, colorObject]) => (
      <Section key={key} title={key} value={colorObject} variant={key} />
    ))}
  </>
);
