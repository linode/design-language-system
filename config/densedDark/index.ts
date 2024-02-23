import * as Tokens from '../../dist/densedDark/tokens.es6.js';
import * as TokensTheme from '../../dist/densedDark/nested.es6.js';
import type {
  AliasTypes,
  ComponentTypes,
  GlobalTypes
} from '../../dist/densedDark/nested.d.ts';

const {
  Color,
  Font,
  Spacing
} = TokensTheme.default.Global;

const {
  Action,
  Background,
  Border,
  Content,
  Elevation,
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
