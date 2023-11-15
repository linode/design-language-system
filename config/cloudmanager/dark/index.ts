import * as Tokens from '../../../dist/cloudmanager/dark/tokens.es6.js';
import * as TokensTheme from '../../../dist/cloudmanager/dark/theme.es6.js';
import type {
  ColorTypes,
  ElevationTypes,
  FontTypes,
  ContentTypes,
  BorderTypes,
  BackgroundTypes,
  InteractionTypes,
  ActionTypes,
  ButtonTypes,
} from '../../../dist/cloudmanager/dark/theme.d.ts';

const Colors: ColorTypes = TokensTheme.default.Color;
const Elevation: ElevationTypes = TokensTheme.default.Elevation;
const Fonts: FontTypes = TokensTheme.default.Font;
const Content: ContentTypes = TokensTheme.default.Content;
const Border: BorderTypes = TokensTheme.default.Border;
const Background: BackgroundTypes = TokensTheme.default.Background;
const Interaction: InteractionTypes = TokensTheme.default.Interaction;
const Actions: ActionTypes = TokensTheme.default.Action;
const Buttons: ButtonTypes = TokensTheme.default.Button;

export { Tokens, Colors, Elevation, Fonts, Content, Border, Background, Interaction, Actions, Buttons };
export type { ColorTypes, ElevationTypes, FontTypes, ContentTypes, BorderTypes, BackgroundTypes, InteractionTypes, ActionTypes, ButtonTypes };

