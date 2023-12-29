import React from 'react';
import { Action } from '../../dist/index.js';
import { Section } from '../Section.js';

export const AliasColors = () => (
  <>
    {Object.entries(Action).map(([colorName, colorObject]) => (
      <Section
        colorName={colorName}
        colorObject={colorObject}
        key={colorName}
        title={`${colorName} Colors`}
      />
    ))}
  </>
);
