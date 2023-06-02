import * as TOKENS from '../../dist/cloudmanager/tokens.es6.js';
import * as TOKENS_THEME from '../../dist/cloudmanager/theme.es6.js';
import { getColors, getComponents } from '../helpers';

const COLORS = getColors(TOKENS_THEME.default.COLOR);
const COMPONENTS = getComponents(TOKENS_THEME.default.COMPONENT);

export { TOKENS, COLORS, COMPONENTS };
