import * as Tokens from '../../dist/dark/tokens.es6.js';
import * as TokensTheme from '../../dist/dark/nested.es6.js';
import type {
  AliasTypes,
  ComponentTypes,
  GlobalTypes
} from '../../dist/dark/nested.d.ts';

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
