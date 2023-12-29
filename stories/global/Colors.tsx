import React from 'react';
import { Color, Font, Spacing, Border } from '../../dist/index.js';
import { ColorSwatch } from '../ColorSwatch';
import '../../dist/tokens.css';

const formatValue = (value) =>
  isNaN(Number(value)) ? `.${value}` : `[${value}]`;

const Typography = ({ key, heading, value, isLowerCase = false }) => {
  if (isLowerCase) value = value.toLowerCase();

  return (
    <div
      key={key}
      style={{
        padding: Spacing[20]
      }}
    >
      <span
        style={{
          fontFamily: 'sans-serif',
          fontSize: Font.FontSize.Xxxs,
          fontWeight: Font.FontWeight.Bold
        }}
      >
        {heading}:
      </span>{' '}
      <span
        style={{
          background: Color.Neutrals[5],
          border: `1px solid ${Border.Normal}`,
          borderRadius: '0.2rem',
          color: Color.Red[90],
          fontFamily: 'monospace',
          fontSize: Font.FontSize.Xxxs,
          padding: Spacing[10],
          whiteSpace: 'nowrap'
        }}
      >
        {value}
      </span>
    </div>
  );
};

const ColorInfo = ({ color, colorName, value }) => (
  <div
    style={{
      borderRadius: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <ColorSwatch color={color} />
    <div>
      <Typography key={value} heading={'Hex'} value={color} />
      <Typography
        heading={'JS'}
        key={value}
        value={`Color.${colorName}${formatValue(value)}`}
      />
      <Typography
        heading={'CSS'}
        isLowerCase
        key={value}
        value={`--token-global-color-${colorName}-${value}`}
      />
      <Typography
        heading={'SCSS'}
        isLowerCase
        key={value}
        value={`$token-global-color-${colorName}-${value}`}
      />
    </div>
  </div>
);

const ColorSection = ({ colorObject, colorName, title }) => (
  <div key={colorName}>
    <h2
      style={{
        fontFamily: Font.FontFamily.Brand
      }}
    >
      {title}
    </h2>
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}
    >
      {Object.entries(colorObject).map(([value, color]) => (
        <div key={value}>
          <ColorInfo color={color} colorName={colorName} value={value} />
        </div>
      ))}
    </div>
  </div>
);

export const Colors = () => (
  <>
    {Object.entries(Color).map(([colorName, colorObject]) => (
      <ColorSection
        colorName={colorName}
        colorObject={colorObject}
        key={colorName}
        title={`${colorName} Colors`}
      />
    ))}
  </>
);
