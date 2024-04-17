import * as Tokens from '../../dist/densedLight/tokens.es6.js';
import * as TokensNested from '../../dist/densedLight/tokens-nested.es6.js';
import type {
  AliasTypes,
  ComponentTypes,
  GlobalTypes
} from '../../dist/densedLight/tokens-nested.d.ts';

const allGlobals = TokensNested.default.Global as GlobalTypes;
const Globals = { ...allGlobals };

const allAliases = TokensNested.default.Alias as AliasTypes;
const Aliases = { ...allAliases };

const allComponents = TokensNested.default.Component as ComponentTypes;
const Components = { ...allComponents };

export {
  Globals,
  Aliases,
  Components,
  Tokens
};

export type { AliasTypes, ComponentTypes, GlobalTypes };
