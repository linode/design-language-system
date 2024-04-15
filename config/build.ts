import StyleDictionary, { TransformedTokens } from 'style-dictionary';
import { promises } from 'fs';
import type { PlatformTypes, StyleDictionaryOptions } from './types';
import prettier from 'prettier';
import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';
import { convertTokensToFlatObject } from './utils'

const readFile = promises.readFile;
const buffer = await readFile('tokens/$themes.json');
const content = buffer.toString('utf-8');
const $themes = JSON.parse(content);
const PREFIX = 'token';
const date = new Date();
const formattedDate = date.toUTCString();

// https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary);

/**
 * ================================
 * REGISTER FORMATS
 * @see https://amzn.github.io/style-dictionary/#/api?id=registerformat
 * ================================
 */

StyleDictionary.registerFormat({
  name: 'json/flat',
  formatter: function (formatterArguments) {
    return JSON.stringify(formatterArguments.dictionary.allTokens, null, 2);
  }
});

StyleDictionary.registerFormat({
  name: 'javascript/nested',
  formatter(formatterArguments) {
    const tokens = formatterArguments.dictionary.tokens;

    // Transform the tokens by removing metadata, flattening, and capitalizing keys
    const transformedTokens: TransformedTokens =
      convertTokensToFlatObject(tokens);

    // Stringify the transformed tokens and replace quotes with nothing to represent the object as a JS object
    const transformedOutput = JSON.stringify(
      transformedTokens,
      null,
      2
    ).replace(/"([^"]+)":/g, (match, key) => `${key}:`);

    return `
/**
 * Do not edit directly
 * Generated on ${formattedDate}
 */

export default ${transformedOutput};
    `;
  }
});

StyleDictionary.registerFormat({
  name: 'typescript/theme-types',
  formatter(formatterArguments) {
    const tokens = formatterArguments.dictionary.tokens;

    const transformedTokens: TransformedTokens = convertTokensToFlatObject(
      tokens,
      { generateTypes: true }
    );

    // Generate TypeScript declarations for top level KEYS
    const declarations = Object.keys(transformedTokens).map((key) => {
      const typeDeclaration = transformedTokens[`${key}Type`];

      return typeDeclaration && `interface ${key}Types ${typeDeclaration};`;
    });

    // Join the declarations with new lines
    const declarationsOutput = declarations.join('');

    // Generate the final TypeScript file content
    const exportsOutput = Object.keys(transformedTokens)
      .filter((key) => !key.endsWith('Type'))
      .map((key) => `${key}Types`)
      .join(', ');

    return `\
/**
 * Do not edit directly
 * Generated on ${formattedDate}
 */

${prettier.format(declarationsOutput, { parser: 'typescript' })}
${prettier.format(`export type { ${exportsOutput} }`, { parser: 'typescript' })}`;
  }
});

/**
 * ================================
 * CONFIGURATIONS
 * ================================
 */

export function getStyleDictionaryConfig(
  options: StyleDictionaryOptions
) {
  const { theme } = options;
  let buildPath;

  if (theme.name === 'light' || theme.name === '') {
    buildPath = 'dist/';
  } else {
    buildPath = `dist/${theme.name}/`;
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
            destination: 'nested.es6.js',
            format: 'javascript/nested'
          },
          {
            destination: 'nested.d.ts',
            format: 'typescript/theme-types'
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