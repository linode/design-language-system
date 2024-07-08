export function toPascalCase(str: string): string {
  const words = str.split(/[-_\s]/).filter(Boolean);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join('');
}