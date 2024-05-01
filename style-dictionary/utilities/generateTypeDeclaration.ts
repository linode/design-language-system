import { formatProperties } from './formatProperties.ts';

// Generate TypeScript type declarations for a given token
export function generateTypeDeclaration(value: any): any {
  if (Array.isArray(value)) {
    const arrayType = generateTypeDeclaration(value[0]);
    return `Array<${arrayType}>`;
  } else if (typeof value === 'object' && value !== null) {
    const properties = Object.entries(value)
      .filter(([key]) => !key.endsWith('Type'))
      .reduce((obj, [key, propertyValue]) => {
        obj[key] = generateTypeDeclaration(propertyValue);
        return obj;
      }, {});
    return `{ ${formatProperties(properties)} }`;
  } else {
    // Return the actual value as a string literal for TypeScript
    return `"${value}"`;
  }
}