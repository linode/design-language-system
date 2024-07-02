import React from 'react';
// import { Section } from '../reusable/Section';

export const Globals = ({ concept, conceptHeading }) => (
  <>
    {Object.entries(concept).map(([key, colorObject]) => {
      return (
        <>
          <h1>{key}</h1>
          <p>{colorObject}</p>
        </>
      );
    })}
  </>
);
