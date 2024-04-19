import StyleDictionary from 'style-dictionary';
import { generateNestedOutput } from '../utilities/generateNestedOutput.js';
import { convertTokensToFlatObject } from '../utilities/convertTokensToFlatObject.js';

export const registerJavascriptNested = () =>
  StyleDictionary.registerFormat({
    name: 'javascript/nested',
    formatter(formatterArguments) {
      const tokens = formatterArguments.dictionary.tokens;
      const transformedTokens = convertTokensToFlatObject(tokens);
      const transformedOutputParts = generateNestedOutput({
        transformedTokens,
        formatterType: 'javascript'
      });

      const transformedOutput = transformedOutputParts.join('\n\n');
      return `
  /**
   * Do not edit directly
   * Generated on ${new Date().toISOString().slice(0, 10)}
   */
  ${transformedOutput}
      `;
    }
  });
