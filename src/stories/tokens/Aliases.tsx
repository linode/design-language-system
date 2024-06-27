import React from 'react';
import { Section } from '../reusable/Section';

export const Aliases = ({ concept, conceptHeading }) => (
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
