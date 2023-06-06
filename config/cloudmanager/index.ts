import * as TOKENS from '../../dist/cloudmanager/tokens.es6.js';
import * as TOKENS_THEME from '../../dist/cloudmanager/theme.es6.js';
import type {
  COLOR_TYPES,
  COMPONENT_TYPES,
} from '../../dist/cloudmanager/theme.d.ts';

const COLORS: typeof COLOR_TYPES = TOKENS_THEME.default.COLOR;
const COMPONENTS: typeof COMPONENT_TYPES = TOKENS_THEME.default.COMPONENT;

export { TOKENS, COLORS, COMPONENTS };
