import type { Config } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { StyleDictionaryOptions } from '../types.ts';
import { spacingPxToRem } from '../transforms/spacingPxToRem.ts';

const PREFIX = 'token';

// Register the custom transformer
StyleDictionary.registerTransform(spacingPxToRem);

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
    log: {
      warnings: 'warn',
      verbosity: 'verbose',
      errors: {
        brokenReferences: 'throw',
      },
    },
    platforms: {
      js: {
        transformGroup: 'tokens-studio',
        transforms: ['name/pascal', 'color/hex', 'shadow/css/shorthand', 'typography/css/shorthand', 'size/spacingPxToRem'],
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
        transforms: ['name/kebab', 'time/seconds', 'color/css', 'shadow/css/shorthand', 'typography/css/shorthand'],
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
        transforms: ['name/kebab', 'time/seconds', 'color/css', 'shadow/css/shorthand', 'typography/css/shorthand'],
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