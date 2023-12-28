import * as Tokens from '../dist/tokens.es6.js';
import * as TokensTheme from '../dist/theme.es6.js';
import type {
  AliasTypes,
  ComponentTypes,
  ElevationTypes,
  FontTypes,
  GlobalTypes
} from '../dist/theme.js';

const {
  Color,
  Spacing,
} = TokensTheme.default.Global;

const {
  Elevation,
  Font
} = TokensTheme.default;

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
  ElevationTypes,
  FontTypes,
  GlobalTypes
};
