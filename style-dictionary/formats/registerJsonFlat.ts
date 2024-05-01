import StyleDictionary from 'style-dictionary';

export const registerJsonFlat = () =>
  StyleDictionary.registerFormat({
    name: 'json/flat',
    formatter: function (formatterArguments) {
      return JSON.stringify(formatterArguments.dictionary.allTokens, null, 2);
    }
  });
