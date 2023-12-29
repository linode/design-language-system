export const formatValue = (value) =>
  isNaN(Number(value)) ? `.${value}` : `[${value}]`;