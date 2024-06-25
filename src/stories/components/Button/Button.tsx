import React from 'react';
import { Button } from '../../../../dist/index.js';
import { Section } from '../../Section.js';

export const ButtonColors = () => (
  <>
    {Object.entries(Button).map(([key, colorObject]) => {
      return (
        <Section
          concept="Button"
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
