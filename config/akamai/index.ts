import * as TOKENS from '../../dist/akamai/tokens.es6.js';
import * as TOKENS_THEME from '../../dist/akamai/theme.es6.js';
import type {
  COLOR_TYPES,
  COMPONENT_TYPES,
} from '../../dist/akamai/theme-types.d.ts';

const COLORS: COLOR_TYPES = TOKENS_THEME.default.COLOR;
const COMPONENTS: COMPONENT_TYPES = TOKENS_THEME.default.COMPONENT;

export { TOKENS, COLORS, COMPONENTS };
export type { COLOR_TYPES, COMPONENT_TYPES };