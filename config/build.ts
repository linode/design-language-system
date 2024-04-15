import StyleDictionary, { TransformedTokens } from 'style-dictionary';
import { promises } from 'fs';
import type { PlatformTypes, StyleDictionaryOptions } from './types';
import prettier from 'prettier';
import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';

const readFile = promises.readFile;
const buffer = await readFile('tokens/$themes.json');
const content = buffer.toString('utf-8');
const themes = JSON.parse(content);
const PREFIX = 'token';

const date = new Date();
const formattedDate = date.toUTCString();

// https://github.com/tokens-studio/sd-transforms
// Register token studio transforms on style dictionary
await registerTransforms(StyleDictionary, {});

export const PLATFORMS: PlatformTypes[] = [
  {
    name: 'web'
  }
];

export function getStyleDictionaryConfig(
  options: StyleDictionaryOptions
) {
  const { theme, platform } = options;
  let buildPath;

  if (theme.name === 'light' || theme.name === '') {
    buildPath = 'dist/';
  } else {
    buildPath = `dist/${theme.name}/`;
  }

  return {
    // If we want to show collisions, we can change `include` to `source`.
    include: Object.entries(theme.selectedTokenSets)
      .filter(([, val]) => val !== 'disabled')
      .map(([tokenset]) => `tokens/${tokenset}.json`),
    platforms: {
      'web/js': {
        // transformGroup: 'tokens-js',
        transforms: ['name/pascal', 'size/px', 'color/hex', 'ts/shadow/css/shorthand', 'ts/typography/css/shorthand'],
        buildPath,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.es6.js',
            filter: {},
            format: 'javascript/es6'
          },
          {
            destination: 'tokens.d.ts',
            format: 'javascript/es6'
          },
          {
            destination: 'nested.es6.js',
            filter: {},
            format: 'javascript/nested'
          },
          {
            destination: 'nested.d.ts',
            filter: {},
            format: 'typescript/theme-types'
          }
        ]
      },
      'web/scss': {
        // transformGroup: 'tokens-css',
        transforms: ['name/kebab', 'time/seconds', 'size/px', 'color/css', 'ts/shadow/css/shorthand', 'ts/typography/css/shorthand'],
        buildPath,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.scss',
            format: 'scss/variables',
            filter: {},
            options: {
              outputReferences: false
            }
          }
        ]
      },
      'web/css': {
        // transformGroup: 'tokens-css',
        transforms: ['name/kebab', 'time/seconds', 'size/px', 'color/css', 'ts/shadow/css/shorthand', 'ts/typography/css/shorthand'],
        buildPath,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
            filter: {},
            options: {
              outputReferences: false
            }
          }
        ]
      }
    }
  };
}

/**
 * REGISTER FILTERS
 * @see https://amzn.github.io/style-dictionary/#/api?id=registerfilter
 */


/**
 * REGISTER FORMATS
 * @see https://amzn.github.io/style-dictionary/#/api?id=registerformat
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
 * REGISTER TRANSFORMS
 * @see https://amzn.github.io/style-dictionary/#/api?id=registertransform
 * @todo Combine prefix transforms - we Didn't want a prefix on alias tokens, if this changes, we can add `prefix` to each 'platform' config
 */

/**
 * TRANSFORM GROUPS
 * @see https://amzn.github.io/style-dictionary/#/transform_groups?id=pre-defined-transform-groups
 */

// StyleDictionary.registerTransformGroup({
//   name: 'tokens-js',
//   transforms: ['name/cti/pascal', 'size/px', 'color/hex', 'ts/shadow/css/shorthand']
// });

// StyleDictionary.registerTransformGroup({
//   name: 'tokens-json',
//   transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'color/css', 'ts/shadow/css/shorthand']
// });

// StyleDictionary.registerTransformGroup({
//   name: 'tokens-css',
//   transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css', 'ts/shadow/css/shorthand']
// });

console.log('Build started...');

PLATFORMS.map(function (platform) {
  themes.map(async function (theme) {
    const sd = new StyleDictionary(
      getStyleDictionaryConfig({
        theme,
        platform
      })
    );

    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
  });
});

// console.log('\n==============================================');
// console.log('\nBuild completed!');

export function toPascalCase(str: string): string {
  const words = str.split(/[-_\s]/).filter(Boolean);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join('');
}

// Generate TypeScript type declarations for a given token
export function generateTypeDeclaration(value: any): any {
  if (Array.isArray(value)) {
    const arrayType = generateTypeDeclaration(value[0]);
    return `Array<${arrayType}>`;
  } else if (typeof value === 'object' && value !== null) {
    const properties = Object.entries(value)
      .filter(([key]) => !key.endsWith('Type'))
      .reduce((obj, [key, propertyValue]) => {
        obj[key] = generateTypeDeclaration(propertyValue);
        return obj;
      }, {});
    return `{ ${formatProperties(properties)} }`;
  } else {
    // Return the actual value as a string literal for TypeScript
    return `"${value}"`;
  }
}

function formatProperties(properties: Record<string, any>): string {
  // Proper formatting of properties within the object type
  return Object.entries(properties)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
}


function formatValue(value: any): any {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'object') {
    return formatProperties(value);
  } else {
    // Convert numerical and other types into string literals as well
    return `"${value}"`;
  }
}

// Transform a nested object of tokens into a flat object
export function convertTokensToFlatObject(obj?: any, options?: any) {
  const { generateTypes = false } = options || {};
  const transformedObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        // Recursively transform nested objects
        const transformedValue = value.hasOwnProperty('value')
          ? value.value
          : convertTokensToFlatObject(value);

        // PascalCase the key
        const transformedKey = toPascalCase(key);

        // Assign the transformed key-value pair to the new object
        transformedObj[transformedKey] = transformedValue;

        // Optionally generate a type declaration for the transformed value
        if (generateTypes) {
          transformedObj[`${transformedKey}Type`] =
            generateTypeDeclaration(transformedValue);
        }
      }
    }
  }
  return transformedObj;
}
