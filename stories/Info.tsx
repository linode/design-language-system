import React from 'react';
import { ColorSwatch } from './ColorSwatch';
import { Typography } from './Typography';
import { formatValue } from './utils';

interface TokenInfoProps {
  color: string;
  concept?: string;
  shape?: 'circle' | 'square';
  state?: string;
  type?: string;
  value?: string;
  variant: string;
}

export const TokenInfo = ({
  color,
  concept,
  shape = 'circle',
  state = '',
  type = 'global',
  value,
  variant,
}: TokenInfoProps) => {
  const hasCategory = type !== 'global';
  const jsConcept = concept ? `${concept}.` : '';
  const cssConcept = concept ? `${concept}-` : '';
  const jsState = state ? `.${state}` : '';
  const cssState = state ? `${state}-` : '';

  return (
    <div
      style={{
        borderRadius: '0.5rem',
        display: 'flex',
        flexBasis: 'calc(50% - 1rem)',
        gap: '.5rem',
        padding: '.5rem'
      }}
    >
      <ColorSwatch color={color} shape={shape} elevation={variant === 'Elevation' ? color : undefined}/>
      <div>
        <Typography key={value} format={'Hex'} value={color} />
        <Typography
          format={'JS'}
          key={value}
          value={`${
            hasCategory ? jsConcept : 'Color.'
          }${variant}${jsState}${formatValue(value)}`}
        />
        <Typography
          format={'CSS'}
          isLowerCase
          key={value}
          value={
            hasCategory
              ? `--token-${type}-${cssConcept}${variant}-${cssState}${value}`
              : `--token-${type}-color-${variant}-${cssState}${value}`
          }
        />
        <Typography
          format={'SCSS'}
          isLowerCase
          key={value}
          value={
            hasCategory
              ? `$token-${type}-${cssConcept}${variant}-${cssState}${value}`
              : `$token-${type}-color-${variant}-${cssState}${value}`
          }
        />
      </div>
    </div>
  );
};
