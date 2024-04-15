
export function toPascalCase(str: string): string {
  const words = str.split(/[-_\s]/).filter(Boolean);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join('');
}

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

export function formatProperties(properties: Record<string, any>): string {
  // Proper formatting of properties within the object type
  return Object.entries(properties)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
}


export function formatValue(value: any): any {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'object') {
    return formatProperties(value);
  } else {
    // Convert numerical and other types into string literals as well
    return `"${value}"`;
  }
}

// Transform a nested object of tokens into a flat object
export function convertTokensToFlatObject(obj?: any, options?: any) {
  const { generateTypes = false } = options || {};
  const transformedObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        // Recursively transform nested objects
        const transformedValue = value.hasOwnProperty('value')
          ? value.value
          : convertTokensToFlatObject(value);

        // PascalCase the key
        const transformedKey = toPascalCase(key);

        // Assign the transformed key-value pair to the new object
        transformedObj[transformedKey] = transformedValue;

        // Optionally generate a type declaration for the transformed value
        if (generateTypes) {
          transformedObj[`${transformedKey}Type`] =
            generateTypeDeclaration(transformedValue);
        }
      }
    }
  }
  return transformedObj;
}