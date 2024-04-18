import StyleDictionary, { TransformedTokens } from 'style-dictionary';
import type { Config } from "style-dictionary/types";
import { promises } from 'fs';
import type { StyleDictionaryOptions } from './types';
import prettier from 'prettier';
import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';

const readFile = promises.readFile;
const buffer = await readFile('tokens/$themes.json');
const content = buffer.toString('utf-8');
const $themes = JSON.parse(content);
const PREFIX = 'token';
const date = new Date();
const formattedDate = date.toUTCString();

// https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary);

import { registerJavascriptNested } from './formats/registerJavascriptNested';
import { registerTypescriptNestedDefinitions } from './formats/registerTypescriptNestedDefinitions';
import { registerJsonFlat } from './formats/registerJsonFlat';

registerJavascriptNested();
registerTypescriptNestedDefinitions();
registerJsonFlat();

/**
 * ================================
 * CONFIGURATIONS
 * ================================
 */

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
            destination: 'tokens.es6.js',
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

/**
 * ================================
 * BUILD TOKENS
 * ================================
 */

async function buildTokens() {
  const themes = permutateThemes($themes, { separator: '_' });
  const themesKeys = Object.entries(themes);
  const configs = themesKeys.map(([name, selectedTokenSets]) => {
      return getStyleDictionaryConfig({
        theme: {
          name,
          selectedTokenSets
        }
      })
  });

  for (let i=0; i < configs.length; i++) {
    console.log('\n==============================================');
    console.log(`Theme: ${Object.keys(themes)[i]}`);

    const cfg = configs[i];
    const sd = new StyleDictionary(cfg);
    await sd.buildPlatform('js');
    await sd.buildPlatform('scss');
    await sd.buildPlatform('css');
  }

  console.log('\n==============================================');
  console.log('\nBuild completed!');
  console.log('\n==============================================');
}

buildTokens();