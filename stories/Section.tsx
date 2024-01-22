import React from 'react';
import { TokenInfo } from './Info';
import { Border, Font } from '../dist/index.js';

interface SectionProps {
  concept?: string;
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
    <TokenInfo type={type} color={value} variant={concept} value={variant} />
  );

  const renderInfo = isColorValueString
    ? renderValue
    : Object.entries(value).map(([key, value]) => {
        if (value instanceof Object) {
          return (
            <Section
              concept={concept}
              key={key}
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
          borderBottom: !stacked && `1px solid ${Border.Normal}`,
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
