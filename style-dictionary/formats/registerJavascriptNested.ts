import StyleDictionary from 'style-dictionary';
import { generateNestedOutput } from '../utilities/generateNestedOutput.ts';
import { convertTokensToFlatObject } from '../utilities/convertTokensToFlatObject.ts';

export const registerJavascriptNested = () =>
  StyleDictionary.registerFormat({
    name: 'javascript/nested',
    formatter(formatterArguments) {
      const tokens = formatterArguments.dictionary.tokens;
      const transformedTokens = convertTokensToFlatObject(tokens);
      const transformedOutput = generateNestedOutput({
        transformedTokens,
        formatterType: 'javascript'
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
