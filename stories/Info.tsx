import React from 'react';
import { ColorSwatch } from './ColorSwatch';
import { Typography } from './Typography';
import { formatValue } from './utils';

export const TokenInfo = ({ color, colorName, value }) => (
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