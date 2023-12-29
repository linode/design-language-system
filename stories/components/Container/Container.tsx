import React from 'react';
import { Container } from '../../../dist/index.js';
import { Section } from '../../Section.js';

export const ContainerColors = () => (
  <>
    {Object.entries(Container).map(([key, colorObject]) => {
      return (
        <Section
          concept="Container"
          key={key}
          title={key}
          type="component"
          value={colorObject}
          variant={key}
        />
      );
    })}
  </>
);
