import fs from 'fs';
import StyleDictionaryPackage from 'style-dictionary';
import type { BrandTypes, PlatformTypes } from './types';

const PREFIX = 'token';

export const PLATFORMS: PlatformTypes[] = [
  {
    name: 'web'
  }
];

export const BRANDS: BrandTypes[] = [
  {
    name: 'akamai',
    outputDir: './dist/akamai'
  },
  {
    name: 'cloudmanager',
    outputDir: './dist/cloudmanager'
  }
];

export function getStyleDictionaryConfig(
  brand: BrandTypes,
  platform: PlatformTypes
): StyleDictionaryPackage.Config {
  return {
    include: [
      'tokens/**/**/*.json',
      'tokens/alias/**/*.json',
      'tokens/components/**/*.json',
    ],
    source: [
      `tokens/global/${brand.name}/*.json`
    ],
    platforms: {
      'web/js': {
        transformGroup: 'tokens-js',
        buildPath: `dist/${brand.name}/`,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.es6.js',
            format: 'javascript/es6',
            filter: {}
          },
          {
            destination: 'theme.es6.js',
            format: 'javascript/nested',
            filter: {},
          },
          {
            format: 'typescript/es6-declarations',
            destination: 'tokens.d.ts'
          }
        ]
      },
      'web/json': {
        transformGroup: 'tokens-json',
        buildPath: `dist/${brand.name}/`,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.json',
            format: 'json/flat',
            filter: {}
          }
        ]
      },
      'web/scss': {
        transformGroup: 'tokens-scss',
        buildPath: `dist/${brand.name}/`,
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
      }
    }
  };
}

/**
 * REGISTER FILTERS
 * @see https://amzn.github.io/style-dictionary/#/api?id=registerfilter
 */

// We want to exlude the brand tokens since they're only used to create global tokens
// StyleDictionaryPackage.registerFilter({
//   name: '',
//   matcher: function (token) {
//     return token.category !== 'brand';
//   },
// });

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
  formatter: function (formatterArguments) {
    const tokens = formatterArguments.dictionary.properties;

    // Function to transform tokens by removing metadata, flattening, and capitalizing keys
    const transformTokens = (obj) => {
      const transformedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (typeof value === 'object' && value !== null) {
            // Recursively transform nested objects
            const transformedValue = value.hasOwnProperty('value') ? value.value : transformTokens(value);

            // Capitalize the key by splitting, mapping, and joining characters
            const transformedKey = key
              .split('')
              .map((char) => char.toUpperCase())
              .join('');

            // Assign the transformed key-value pair to the new object
            transformedObj[transformedKey] = transformedValue;
          }
        }
      }
      return transformedObj;
    };

    // Transform the tokens by removing metadata, flattening, and capitalizing keys
    const transformedTokens = transformTokens(tokens);

    // Convert the transformed tokens to string representation, with necessary replacements
    const transformedOutput = JSON.stringify(transformedTokens, null, 2)
      .replace(/"([^"]+)":/g, (match, key) => `${key}:`)
      .replace(/\balias\b/g, 'aliases')
      .replace(/\bcomponent\b/g, 'components')
      .replace(/\bcolor\b/g, 'colors');

      return `export default ${transformedOutput}`;
    // return `export const THEME_TOKEN = ${transformedOutput}`;
  }
});

/**
 * REGISTER TRANSFORMS
 * @see https://amzn.github.io/style-dictionary/#/api?id=registertransform
 * @todo Combine prefix transforms - we Didn't want a prefix on alias tokens, if this changes, we can add `prefix` to each 'platform' config
 */
StyleDictionaryPackage.registerTransform({
  name: 'size/pxToPt',
  type: 'value',
  matcher: function (prop) {
    return prop.value.match(/^[\d.]+px$/);
  },
  transformer: function (prop) {
    return prop.value.replace(/px$/, 'pt');
  }
});

StyleDictionaryPackage.registerTransform({
  name: 'size/pxToDp',
  type: 'value',
  matcher: function (prop) {
    return prop.value.match(/^[\d.]+px$/);
  },
  transformer: function (prop) {
    return prop.value.replace(/px$/, 'dp');
  }
});

/**
 * TRANSFORM GROUPS
 * @see https://amzn.github.io/style-dictionary/#/transform_groups?id=pre-defined-transform-groups
 */

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-js',
  transforms: ['name/cti/constant', 'size/px', 'color/hex']
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-json',
  transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'color/css']
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-scss',
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css']
});

console.log('Build started...');

PLATFORMS.map(function (platform) {
  BRANDS.map(function (brand) {
    console.log('\n==============================================');
    console.log(
      `\nProcessing...\n - Brand: ${brand.name}\n - Platform: ${platform.name}`
    );

    const StyleDictionary = StyleDictionaryPackage.extend(
      getStyleDictionaryConfig(brand, platform)
    );

    if (platform.name === 'web') {
      StyleDictionary.buildPlatform('web/js');
      StyleDictionary.buildPlatform('web/json');
      StyleDictionary.buildPlatform('web/scss');
    }

    console.log('\nEnd processing');
  });
});

console.log('\n==============================================');
console.log('\nBuild completed!');
