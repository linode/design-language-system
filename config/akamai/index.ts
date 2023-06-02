import * as TOKENS from '../../dist/akamai/tokens.es6.js';
import * as TOKENS_THEME from '../../dist/akamai/theme.es6.js';
import { getComponents } from '../helpers';
import { getColors } from '../helpers';

const COLORS = getColors(TOKENS_THEME.default.COLOR);
const COMPONENTS = getComponents(TOKENS_THEME.default.COMPONENT);

export { TOKENS, TOKENS_THEME, COLORS, COMPONENTS };
