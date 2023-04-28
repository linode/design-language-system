const fs = require('fs');
const path = require('path');

const StyleDictionaryPackage = require('style-dictionary');

function getStyleDictionaryConfig(brand, platform) {
  return {
    source: [
      'tokens/alias/**/*.json',
      'tokens/components/**/*.json',
      `tokens/brands/${brand}/*.json`,
      'tokens/globals/**/*.json',
      `tokens/platforms/${platform}/*.json`,
    ],
    platforms: {
      'web/js': {
        transformGroup: 'tokens-js',
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: 'single-exports.es6.js',
            format: 'javascript/es6',
            filter: 'excludeBrand',
          },
          {
            destination: 'grouped-export.es6.js',
            format: 'javascript/nested',
            filter: 'excludeBrand',
          },
        ],
      },
      'web/json': {
        transformGroup: 'tokens-json',
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: 'tokens.json',
            format: 'json/flat',
            filter: 'excludeBrand',
          },
        ],
      },
      'web/scss': {
        transformGroup: 'tokens-scss',
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: 'tokens.scss',
            format: 'scss/variables',
            filter: 'excludeBrand',
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
StyleDictionaryPackage.registerFilter({
  name: 'excludeBrand',
  matcher: function (token) {
    return token.category !== 'brand';
  },
});

/**
 * REGISTER FORMATS
 * @see https://amzn.github.io/style-dictionary/#/api?id=registerformat
 */

StyleDictionaryPackage.registerFormat({
  name: 'json/flat',
  formatter: function (dictionary) {
    return JSON.stringify(dictionary.allProperties, null, 2);
  },
});

StyleDictionaryPackage.registerFormat({
  name: 'javascript/nested',
  formatter: function (dictionary) {
    const tokens = dictionary.properties;
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

    return `export default tokens = ${JSON.stringify(flattenedTokens, null, 2)
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
  name: 'name/prefix/kebab',
  type: 'name',
  transformer: function (prop) {
    const prefix = 'token-';
    return `${prefix}${prop.name}`;
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'name/prefix/constant',
  type: 'name',
  transformer: function (prop) {
    const prefix = 'TOKEN_';
    return `${prefix}${prop.name}`;
  },
});

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
    'name/prefix/constant',
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
    'name/prefix/kebab',
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

['web'].map(function (platform) {
  ['akamai', 'cloudmanager'].map(function (brand) {
    console.log('\n==============================================');
    console.log(
      `\nProcessing...\n - Brand: ${brand}\n - Platform: ${platform}`
    );

    const StyleDictionary = StyleDictionaryPackage.extend(
      getStyleDictionaryConfig(brand, platform)
    );

    if (platform === 'web') {
      StyleDictionary.buildPlatform('web/js');
      StyleDictionary.buildPlatform('web/json');
      StyleDictionary.buildPlatform('web/scss');
    }

    console.log('\nEnd processing');
  });
});

console.log('\n==============================================');
console.log('\nBuild completed!');
