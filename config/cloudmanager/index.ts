import * as Tokens from '../../dist/cloudmanager/tokens.es6.js';
import * as TokensTheme from '../../dist/cloudmanager/theme.es6.js';
import type {
  ColorTypes,
  ComponentTypes,
} from '../../dist/cloudmanager/theme.d.ts';

const Colors: ColorTypes = TokensTheme.default.Color;
const Components: ComponentTypes = TokensTheme.default.Component;

export { Tokens, Colors, Components };
export type { ColorTypes, ComponentTypes };
