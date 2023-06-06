import * as TOKENS from '../../dist/akamai/tokens.es6.js';
import * as TOKENS_THEME from '../../dist/akamai/theme.es6.js';
import type {
  COLOR_TYPES,
  COMPONENT_TYPES,
} from '../../dist/akamai/theme.d.ts';

const COLORS: typeof COLOR_TYPES = TOKENS_THEME.default.COLOR;
const COMPONENTS: typeof COMPONENT_TYPES = TOKENS_THEME.default.COMPONENT;

export { TOKENS, COLORS, COMPONENTS };
