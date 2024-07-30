import type { Config } from "style-dictionary/types";

import type { StyleDictionaryOptions } from '../types.ts';
import { expandTypesMap } from '@tokens-studio/sd-transforms';
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
    preprocessors: ["tokens-studio"],
    expand: {
      typesMap: expandTypesMap,
    },
    platforms: {
      js: {
        transformGroup: 'tokens-studio',
        transforms: ['name/pascal', 'size/px', 'color/hex', 'shadow/css/shorthand', 'typography/css/shorthand'],
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
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab', 'time/seconds', 'size/px', 'color/css', 'shadow/css/shorthand', 'typography/css/shorthand'],
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
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab', 'time/seconds', 'size/px', 'color/css', 'shadow/css/shorthand', 'typography/css/shorthand'],
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