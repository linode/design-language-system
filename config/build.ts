import StyleDictionaryPackage, { TransformedTokens } from 'style-dictionary';
import { promises } from 'fs';
import type { PlatformTypes, StyleDictionaryOptions } from './types';
import prettier from 'prettier';
import { registerTransforms } from '@tokens-studio/sd-transforms';

const readFile = promises.readFile;
const buffer = await readFile('tokens/$themes.json');
const content = buffer.toString('utf-8');
const themes = JSON.parse(content);
const PREFIX = 'token';

const date = new Date();
const formattedDate = date.toUTCString();

// https://github.com/tokens-studio/sd-transforms
// Register token studio transforms on style dictionary
await registerTransforms(StyleDictionaryPackage, {});

export const PLATFORMS: PlatformTypes[] = [
  {
    name: 'web'
  }
];

export function getStyleDictionaryConfig(
  options: StyleDictionaryOptions
): StyleDictionaryPackage.Config {
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
        transformGroup: 'tokens-js',
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
            format: 'typescript/es6-declarations'
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
        transformGroup: 'tokens-css',
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
        transformGroup: 'tokens-css',
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

StyleDictionaryPackage.registerFormat({
  name: 'json/flat',
  formatter: function (formatterArguments) {
    return JSON.stringify(formatterArguments.dictionary.allProperties, null, 2);
  }
});

StyleDictionaryPackage.registerFormat({
  name: 'javascript/nested',
  formatter(formatterArguments) {
    const tokens = formatterArguments.dictionary.properties;

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

StyleDictionaryPackage.registerFormat({
  name: 'typescript/theme-types',
  formatter(formatterArguments) {
    const tokens = formatterArguments.dictionary.properties;

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

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-js',
  transforms: ['name/cti/pascal', 'size/px', 'color/hex', 'ts/shadow/css/shorthand']
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-json',
  transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'color/css', 'ts/shadow/css/shorthand']
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-css',
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css', 'ts/shadow/css/shorthand']
});

console.log('Build started...');

PLATFORMS.map(function (platform) {
  themes.map(function (theme, idx, themes) {
    const currentIndex = idx + 1;
    const totalThemes = themes.length;
    const themeName = theme.name ? theme.name : 'default';

    console.log('\n==============================================');
    console.log(
      `\nProcessing... ${currentIndex} of ${totalThemes} \n - theme: ${themeName}\n - Platform: ${platform.name}`
    );

    const StyleDictionary = StyleDictionaryPackage.extend(
      getStyleDictionaryConfig({
        theme,
        platform
      })
    );

    if (platform.name === 'web') {
      StyleDictionary.buildPlatform('web/js');
      StyleDictionary.buildPlatform('web/scss');
      StyleDictionary.buildPlatform('web/css');
    }

    console.log('\nEnd processing');
  });
});

console.log('\n==============================================');
console.log('\nBuild completed!');

export function toPascalCase(str: string): string {
  const words = str.split(/[-_\s]/).filter(Boolean);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join('');
}

// Generate TypeScript type declarations for a given token
export function generateTypeDeclaration(value: any): any {
  // If the value is an array, generate an array type declaration
  if (Array.isArray(value)) {
    const arrayType = generateTypeDeclaration(value[0]);
    return {
      type: `Array<${arrayType}>`
    };
  } else if (typeof value === 'object' && value !== null) {
    // If the value is an object, generate an object type declaration
    const properties = Object.entries(value)
      .filter(([key]) => !key.endsWith('Type'))
      .reduce((obj, [key, propertyValue]) => {
        obj[key] = generateTypeDeclaration(propertyValue);
        return obj;
      }, {});
    return formatProperties(properties);
  } else {
    // Otherwise, return the type of the value
    return typeof value;
  }
}

function formatProperties(properties: Record<string, any>): string {
  const formattedProperties = Object.entries(properties).reduce(
    (obj, [key, value]) => {
      obj[key] = formatValue(value);
      return obj;
    },
    {}
  );
  const jsonString = JSON.stringify(formattedProperties, null, 2)
    // Remove quotes from keys and values
    .replace(/"([^"]+)":/g, (match, key) => `${key}:`)
    .replace(/"([^"]+)"/g, (match, value) => value)
    // Remove newlines,
    .replace(/\\n/g, '');

  return jsonString
}

function formatValue(value: any): any {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'object') {
    return formatProperties(value);
  } else {
    return String(value);
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
