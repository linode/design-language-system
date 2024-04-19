import { formatProperties } from './formatProperties.js';

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
