import StyleDictionary from 'style-dictionary';
import { generateNestedOutput } from '../utilities/generateNestedOutput.js';
import { convertTokensToFlatObject } from '../utilities/convertTokensToFlatObject.js';

export const registerTypescriptNestedDefinitions = () =>
  StyleDictionary.registerFormat({
    name: 'typescript/nested/definitions',
    formatter(formatterArguments) {
      const tokens = formatterArguments.dictionary.tokens;
      const transformedTokens = convertTokensToFlatObject(tokens);
      const transformedOutput = generateNestedOutput({
        transformedTokens,
        formatterType: 'typescript'
      });

      return `
  /**
   * Do not edit directly
   * Generated on ${new Date().toISOString().slice(0, 10)}
   */
  ${transformedOutput}
      `;
    }
  });
