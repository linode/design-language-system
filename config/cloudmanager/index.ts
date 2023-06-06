import * as TOKENS from '../../dist/cloudmanager/tokens.es6.js';
import * as TOKENS_THEME from '../../dist/cloudmanager/theme.es6.js';
import type {
  COLOR_TYPES,
  COMPONENT_TYPES,
} from '../../dist/cloudmanager/theme-types.d.ts';

const COLORS: COLOR_TYPES = TOKENS_THEME.default.COLOR;
const COMPONENTS: COMPONENT_TYPES = TOKENS_THEME.default.COMPONENT;

export { TOKENS, COLORS, COMPONENTS };
export type { COLOR_TYPES, COMPONENT_TYPES };
