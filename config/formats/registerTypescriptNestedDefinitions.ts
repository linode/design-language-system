import StyleDictionary from 'style-dictionary';
import { generateNestedOutput } from '../utilities/generateNestedOutput';
import { convertTokensToFlatObject } from '../utilities/convertTokensToFlatObject';

export const registerTypescriptNestedDefinitions = () =>
  StyleDictionary.registerFormat({
    name: 'typescript/nested/definitions',
    formatter(formatterArguments) {
      const tokens = formatterArguments.dictionary.tokens;
      const transformedTokens = convertTokensToFlatObject(tokens);
      const transformedOutputParts = generateNestedOutput({
        transformedTokens,
        formatterType: 'typescript'
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
