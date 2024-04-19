import type { Config } from "style-dictionary/types";

import type { StyleDictionaryOptions } from '../types.ts';

const PREFIX = 'token';

export function getStyleDictionaryConfig(
  options: StyleDictionaryOptions
): Config {
  const { theme } = options;
  let buildPath;

  if (theme.name === 'light' || theme.name === '') {
    buildPath = 'dist/';
  } else {
    buildPath = `dist/themes/${theme.name}/`;
  }

  return {
    // If we want to show collisions, we can change `include` to `source`.
    include: theme.selectedTokenSets.map(tokenset => `tokens/${tokenset}.json`),
    platforms: {
      js: {
        transforms: ['name/pascal', 'size/px', 'color/hex', 'ts/shadow/css/shorthand', 'ts/typography/css/shorthand'],
        buildPath,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6'
          },
          {
            destination: 'tokens.d.ts',
            format: 'javascript/es6'
          },
          {
            destination: 'index.js',
            format: 'javascript/nested'
          },
          {
            destination: 'index.d.ts',
            format: 'typescript/nested/definitions'
          }
        ]
      },
      scss: {
        transforms: ['name/kebab', 'time/seconds', 'size/px', 'color/css', 'ts/shadow/css/shorthand', 'ts/typography/css/shorthand'],
        buildPath,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.scss',
            format: 'scss/variables',
          }
        ]
      },
      css: {
        transforms: ['name/kebab', 'time/seconds', 'size/px', 'color/css', 'ts/shadow/css/shorthand', 'ts/typography/css/shorthand'],
        buildPath,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
          }
        ]
      }
    }
  };
}