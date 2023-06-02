export const getColors = (color) => {
  return {
    ACTION: { ...color.ACTION },
    CONTENT: { ...color.CONTENT },
    BACKGROUND: { ...color.BACKGROUND },
    BORDER: { ...color.BORDER },
    INTERACTION: { ...color.INTERACTION },
    BRAND: {
      BRAND01: color.BRAND01,
      BRAND02: color.BRAND02,
      BRAND03: color.BRAND03,
      BRAND04: color.BRAND04,
      BRAND05: color.BRAND05
    },
    NEUTRALS: { ...color.NEUTRALS },
    STATUS: { ...color.STATUS }
  };
};

export const getComponents = (component) => {
  return {
    BUTTON: { ...component.BUTTON },
    TABLE: { ...component.TABLE },
    TEXTFIELD: { ...component.TEXTFIELD }
  };
};
