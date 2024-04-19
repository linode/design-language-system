import StyleDictionary from 'style-dictionary';
import { promises } from 'fs';
import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';
import { registerJavascriptNested } from './formats/registerJavascriptNested.js';
import { registerTypescriptNestedDefinitions } from './formats/registerTypescriptNestedDefinitions.js';
import { registerJsonFlat } from './formats/registerJsonFlat.js';
import { getStyleDictionaryConfig } from './configs/getStyleDictionaryConfig.js'

const readFile = promises.readFile;
const buffer = await readFile('tokens/$themes.json');
const content = buffer.toString('utf-8');
const $themes = JSON.parse(content);

// https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary);

registerJavascriptNested();
registerTypescriptNestedDefinitions();
registerJsonFlat();

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