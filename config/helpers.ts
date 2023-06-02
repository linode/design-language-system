import * as TOKENS_THEME from '../dist/akamai/theme.es6.js'; // TODO: Need to find a better way to import this... tehcnically akamai/cloudmanager should have the same structure

type ColorType = typeof TOKENS_THEME.default.COLOR;
type ComponentType = typeof TOKENS_THEME.default.COMPONENT;

export const getColors = (color: ColorType) => {
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

export const getComponents = (component: ComponentType) => {
  return {
    BUTTON: { ...component.BUTTON },
    TABLE: { ...component.TABLE },
    TEXTFIELD: { ...component.TEXTFIELD }
  };
};
