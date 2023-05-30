import fs from 'fs';
import StyleDictionaryPackage from 'style-dictionary';

const PREFIX = 'token';
const PLATFORMS = ['web'];
const BRANDS = [
  {
    name: 'akamai',
    outputDir: './dist/akamai',
  },
  {
    name: 'cloudmanager',
    outputDir: './dist/cloudmanager',
  }
]

function getStyleDictionaryConfig(brand, platform) {
  return {
    source: [
      'tokens/**/**/*.json',
      'tokens/alias/**/*.json',
      'tokens/components/**/*.json',
      `tokens/globals/${brand}/*.json`,
    ],
    platforms: {
      'web/js': {
        transformGroup: 'tokens-js',
        buildPath: `dist/${brand}/`,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.es6.js',
            format: 'javascript/es6',
            filter: {},
          },
          {
            destination: 'theme.es6.js',
            format: 'javascript/nested',
            filter: {},
          },
          {
            format: "typescript/es6-declarations",
            destination: "theme.d.ts"
          },
          {
            format: "typescript/es6-declarations",
            destination: "tokens.d.ts"
          }
        ],
      },
      'web/json': {
        transformGroup: 'tokens-json',
        buildPath: `dist/${brand}/`,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.json',
            format: 'json/flat',
            filter: {},
          },
        ],
      },
      'web/scss': {
        transformGroup: 'tokens-scss',
        buildPath: `dist/${brand}/`,
        prefix: `${PREFIX}-`,
        files: [
          {
            destination: 'tokens.scss',
            format: 'scss/variables',
            filter: {},
            options: {
              outputReferences: false,
            },
          },
        ],
      },
    },
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
  },
});

StyleDictionaryPackage.registerFormat({
  name: 'javascript/nested',
  formatter: function (formatterArguments) {
    const tokens = formatterArguments.dictionary.properties;
    const removeMetadataAndFlatten = (jsonObj) => {
      for (var key in jsonObj) {
        if (typeof jsonObj[key] == 'object') {
          if (jsonObj[key].hasOwnProperty('value')) {
            jsonObj[key] = jsonObj[key]['value'];
          } else {
            removeMetadataAndFlatten(jsonObj[key]);
          }
        } else {
          continue;
        }
      }
      return jsonObj;
    };
    const flattenedTokens = removeMetadataAndFlatten(tokens);

    return `export default ${JSON.stringify(flattenedTokens, null, 2)
      .replace(/"([^"]+)":/g, '$1:')
      .replace('alias', 'aliases')
      .replace('component', 'components')
      .replace(/color/g, 'colors')}`;
  },
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
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'size/pxToDp',
  type: 'value',
  matcher: function (prop) {
    return prop.value.match(/^[\d.]+px$/);
  },
  transformer: function (prop) {
    return prop.value.replace(/px$/, 'dp');
  },
});

/**
 * TRANSFORM GROUPS
 * @see https://amzn.github.io/style-dictionary/#/transform_groups?id=pre-defined-transform-groups
 */

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-js',
  transforms: [
    'name/cti/constant',
    'size/px',
    'color/hex',
  ],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-json',
  transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'color/css'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-scss',
  transforms: [
    'name/cti/kebab',
    'time/seconds',
    'size/px',
    'color/css',
  ],
});

/**
 * BUILD PROCESS
 * As we begin supporting more platforms and brands, we can easily scale this build process
 */

console.log('Build started...');

PLATFORMS.map(function (platform) {
  BRANDS.map(function (brand) {
    console.log('\n==============================================');
    console.log(
      `\nProcessing...\n - Brand: ${brand.name}\n - Platform: ${platform}`
    );


    const StyleDictionary = StyleDictionaryPackage.extend(
      getStyleDictionaryConfig(brand.name, platform)
    );

    if (platform === 'web') {
      StyleDictionary.buildPlatform('web/js');
      StyleDictionary.buildPlatform('web/json');
      StyleDictionary.buildPlatform('web/scss');
    }

    const indexFileContent = `
      // Auto-generated index file for ${brand.name} tokens

      export * as TOKENS from './tokens.es6.js';

      import * as THEME from './theme.es6.js';
      const { components, aliases, colors, ...rest } = THEME;
      export { components, aliases, colors };

      // Import other tokens as needed
      // export * as TYPOGRAPHY from './typography';
      // export * as SPACING from './spacing';
      // ...

    `;

    const indexPath = `${brand.outputDir}/index.js`;
    fs.writeFileSync(indexPath, indexFileContent);

    console.log('\nEnd processing');
  });
});

console.log('\n==============================================');
console.log('\nBuild completed!');