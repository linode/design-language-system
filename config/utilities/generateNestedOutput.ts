// Helper function to generate transformed output parts
export function generateNestedOutput({transformedTokens, formatterType}) {
  return Object.keys(transformedTokens).map(key => {
    const topLevelObjectString = JSON.stringify(
      transformedTokens[key],
      null,
      2
    ).replace(/"([^"]+)":/g, (match, key) => `${key}:`);

    const exports: string[] = [];
    const isInterface = formatterType === 'typescript';
    const declarationOrExport = formatterType === 'typescript' ? `interface ${key}Types` : `export const ${key} =`;
    exports.push(`${declarationOrExport} ${topLevelObjectString}${isInterface ? '' : ';'}`);

    // Handling one level deeper
    Object.entries(transformedTokens[key]).forEach(([subKey, subValue]) => {
      const subObjectString = JSON.stringify(
        subValue,
        null,
        2
      ).replace(/"([^"]+)":/g, (match, key) => `${key}:`);

      const subDeclarationOrExport = formatterType === 'typescript' ? `interface ${subKey}Types` : `export const ${subKey} =`;
      exports.push(`${subDeclarationOrExport} ${subObjectString}${isInterface ? '' : ';'}`);
    });

    return exports.join('\n\n');
  });
}