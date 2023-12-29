import React from 'react';
import { Table } from '../../../dist/index.js';
import { Section } from '../../Section.js';

export const TableColors = () => (
  <>
    {Object.entries(Table).map(([key, colorObject]) => {
      return (
        <Section
          concept="Table"
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
