import StyleDictionaryPackage, { TransformedTokens } from 'style-dictionary';
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
      'tokens/components/**/*.json'
    ],
    source: [`tokens/global/${brand.name}/*.json`],
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
            filter: {}
          },
          {
            destination: 'theme.d.ts',
            format: 'typescript/theme-types',
            filter: {}
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
    const declarationsOutput = declarations.join('\n');

    // Generate the final TypeScript file content
    const exportsOutput = Object.keys(transformedTokens)
      .filter((key) => !key.endsWith('Type'))
      .map((key) => `${key}Types`)
      .join(', ');

    return `\
${declarationsOutput}
export type { ${exportsOutput} };
    `;
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
  matcher(prop) {
    return prop.value.match(/^[\d.]+px$/);
  },
  transformer(prop) {
    return prop.value.replace(/px$/, 'pt');
  }
});

StyleDictionaryPackage.registerTransform({
  name: 'size/pxToDp',
  type: 'value',
  matcher(prop) {
    return prop.value.match(/^[\d.]+px$/);
  },
  transformer(prop) {
    return prop.value.replace(/px$/, 'dp');
  }
});

/**
 * TRANSFORM GROUPS
 * @see https://amzn.github.io/style-dictionary/#/transform_groups?id=pre-defined-transform-groups
 */

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-js',
  transforms: ['name/cti/pascal', 'size/px', 'color/hex']
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


export function toPascalCase(str: string): string {
  const words = str.split(/[-_\s]/).filter(Boolean);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join('');
}

// Generate TypeScript type declarations for a given token
export function generateTypeDeclaration(value: any): string {
  // If the value is an array, generate an array type declaration
  if (Array.isArray(value)) {
    const arrayType = generateTypeDeclaration(value[0]);
    return `Array<${arrayType}>`;
  } else if (typeof value === 'object' && value !== null) {
    // If the value is an object, generate an object type declaration
    const properties = Object.entries(value)
      .filter(([key]) => !key.endsWith('Type'))
      .map(
        ([key, propertyValue]) =>
          `${key}: ${generateTypeDeclaration(propertyValue)}`
      );
    return `{ ${properties.join(', ')} }`;
  } else {
    // Otherwise, return the type of the value
    return typeof value;
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