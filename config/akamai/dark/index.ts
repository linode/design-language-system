import * as Tokens from '../../../dist/akamai/dark/tokens.es6.js';
import * as TokensTheme from '../../../dist/akamai/dark/theme.es6.js';
import type {
  ColorTypes,
  ComponentTypes,
} from '../../../dist/akamai/dark/theme.js';

const Colors: ColorTypes = TokensTheme.default.Color;
const Components: ComponentTypes = TokensTheme.default.Component;

export { Tokens, Colors, Components };
export type { ColorTypes, ComponentTypes };
