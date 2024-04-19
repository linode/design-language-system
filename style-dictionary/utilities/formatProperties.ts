export function formatProperties(properties: Record<string, any>): string {
  // Proper formatting of properties within the object type
  return Object.entries(properties)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
}