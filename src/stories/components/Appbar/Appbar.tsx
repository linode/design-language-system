import React from 'react';
import { Appbar } from '../../../../dist/index.js';
import { Section } from '../../Section.js';

export const AppbarColors = () => (
  <>
    {Object.entries(Appbar).map(([key, colorObject]) => {
      return (
        <Section
          concept="Appbar"
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
