import * as Tokens from '../../dist/densedLight/tokens.es6.js';
import * as TokensTheme from '../../dist/densedLight/nested.es6.js';
import type {
  AliasTypes,
  ComponentTypes,
  GlobalTypes
} from '../../dist/densedLight/nested.d.ts';

const allGlobals = TokensTheme.default.Global as GlobalTypes;
const Globals = { ...allGlobals };

const allAliases = TokensTheme.default.Alias as AliasTypes;
const Aliases = { ...allAliases };

const allComponents = TokensTheme.default.Component as ComponentTypes;
const Components = { ...allComponents };

export {
  Globals,
  Aliases,
  Components,
  Tokens
};

export type { AliasTypes, ComponentTypes, GlobalTypes };
