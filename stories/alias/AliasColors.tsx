import React from 'react';
import { Section } from '../Section.js';

export const AliasColors = ({ concept, conceptHeading }) => (
  <>
    {Object.entries(concept).map(([key, colorObject]) => {
      return (
        <Section
          concept={conceptHeading}
          key={key}
          title={key}
          type="alias"
          value={colorObject}
          variant={key}
        />
      );
    })}
  </>
);
