import * as akamaiTheme from '../dist/akamai/theme.es6.js';
import * as akamaiTokens from '../dist/akamai/tokens.es6.js';
import * as cloudManagerTheme from '../dist/cloudmanager/theme.es6.js';
import * as cloudManagerTokens from '../dist/cloudmanager/tokens.es6.js';

export { akamaiTheme, akamaiTokens, cloudManagerTheme, cloudManagerTokens };

// import fs from 'fs';
// import StyleDictionaryPackage from 'style-dictionary';
// import { BRANDS, PLATFORMS, getStyleDictionaryConfig } from './build';

// console.log('Build started...');

// PLATFORMS.map(function (platform) {
//   BRANDS.map(function (brand) {
//     console.log('\n==============================================');
//     console.log(
//       `\nProcessing...\n - Brand: ${brand.name}\n - Platform: ${platform.name}`
//     );


//     const StyleDictionary = StyleDictionaryPackage.extend(
//       getStyleDictionaryConfig(brand, platform)
//     );

//     if (platform.name === 'web') {
//       StyleDictionary.buildPlatform('web/js');
//       StyleDictionary.buildPlatform('web/json');
//       StyleDictionary.buildPlatform('web/scss');
//     }

//     const indexFileContent = `
//       // Auto-generated index file for ${brand.name} tokens

//       export * as TOKENS from './tokens.es6.js';

//       import * as THEME from './theme.es6.js';

//       const { components, aliases, colors, ...rest } = THEME;

//       export { components as Components };
//       export { aliases as Aliases };
//       export { colors as Colors };

//       // Import other tokens as needed
//       // export * as TYPOGRAPHY from './typography';
//       // export * as SPACING from './spacing';
//       // ...

//     `;

//     const indexPath = `${brand.outputDir}/index.js`;
//     fs.writeFileSync(indexPath, indexFileContent);

//     console.log('\nEnd processing');
//   });
// });

// console.log('\n==============================================');
// console.log('\nBuild completed!');