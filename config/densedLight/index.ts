import * as Tokens from '../../dist/densedLight/tokens.es6.js';
import * as TokensTheme from '../../dist/densedLight/nested.es6.js';
import type {
  AliasTypes,
  ComponentTypes,
  GlobalTypes
} from '../../dist/densedLight/nested.d.ts';

const {
  Color,
  Elevation,
  Font,
  Spacing
} = TokensTheme.default.Global;

const {
  Action,
  Background,
  Border,
  Content,
  Interaction,
} = TokensTheme.default.Alias;

const {
  Appbar,
  Button,
  Container,
  Table,
} = TokensTheme.default.Component;

export {
  Action,
  Appbar,
  Background,
  Border,
  Button,
  Color,
  Container,
  Content,
  Elevation,
  Font,
  Interaction,
  Spacing,
  Table,
  Tokens
};

export type {
  AliasTypes,
  ComponentTypes,
  GlobalTypes
};
