export function generateNestedOutput({ transformedTokens, formatterType }: { transformedTokens: any, formatterType: 'typescript' | 'javascript' }) {
  return Object.keys(transformedTokens).map(key => {
    // Generate JSON string of the object, then format it for JS object syntax
    const topLevelObjectString = JSON.stringify(
      transformedTokens[key], null, 2
    ).replace(/"([^"]+)":/g, (match, key) => `${key}:`);

    const exports: string[] = [];
    const isInterface = formatterType === 'typescript';

    if (isInterface) {
      // Create TypeScript interface
      const interfaceName = `${key}Types`;
      exports.push(`export interface ${interfaceName} ${topLevelObjectString}`);

      // Declare const with the interface type
      exports.push(`declare const ${key}: ${interfaceName};`);
    } else {
      // JavaScript export statement
      exports.push(`export const ${key} = ${topLevelObjectString};`);
    }

    // Handling one level deeper for JavaScript objects or TypeScript interfaces
    Object.entries(transformedTokens[key]).forEach(([subKey, subValue]) => {
      const subObjectString = JSON.stringify(
        subValue, null, 2
      ).replace(/"([^"]+)":/g, (match, key) => `${key}:`);

      if (isInterface) {
        // Create sub-interface and declare const for each subkey
        const subInterfaceName = `${subKey}Types`;
        exports.push(`export interface ${subInterfaceName} ${subObjectString}`);
        exports.push(`declare const ${subKey}: ${subInterfaceName};`);
      } else {
        // JavaScript export for subkeys
        exports.push(`export const ${subKey} = ${subObjectString};`);
      }
    });

    return exports.join('\n\n');
  }).join('\n\n');
}
