import React from 'react';
import { TokenInfo } from './Info.tsx';
import { Border, Font } from '../../dist/index.js';

interface SectionProps {
  concept?: string;
  shape?: 'circle' | 'square';
  stacked?: boolean;
  state?: string;
  title: string;
  type?: string;
  value: any;
  variant: string;
}

export const Section = ({
  concept,
  stacked,
  state,
  title,
  type,
  value,
  variant
}: SectionProps) => {
  const HeadingElement = stacked ? 'h3' : 'h2';
  const isColorValueString = typeof value === 'string';

  const renderValue = (
    <TokenInfo
      color={value}
      shape={concept === 'Elevation' ? 'square' : 'circle'}
      type={type}
      value={variant}
      variant={concept}
    />
  );

  const renderInfo = isColorValueString
    ? renderValue
    : Object.entries(value).map(([key, value]) => {
        if (value instanceof Object) {
          return (
            <Section
              concept={concept}
              key={key}
              shape={concept === 'Elevation' ? 'square' : 'circle'}
              stacked
              state={key}
              title={key}
              type={type}
              value={value}
              variant={variant}
            />
          );
        }
        return (
          <TokenInfo
            color={value as string}
            concept={concept}
            key={state}
            shape={concept === 'Elevation' ? 'square' : 'circle'}
            state={state}
            type={type}
            value={key}
            variant={variant}
          />
        );
      });

  return (
    <div
      key={variant}
      style={{
        width: '100%'
      }}
    >
      <HeadingElement
        style={{
          borderBottom: !stacked ? `1px solid ${Border.Normal}`: 'none',
          fontFamily: Font.FontFamily.Brand
        }}
      >
        {title}
      </HeadingElement>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {renderInfo}
      </div>
    </div>
  );
};
