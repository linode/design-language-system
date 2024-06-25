import { create } from '@storybook/theming/create';

// @ts-ignore
import logo from './akamai-logo.png';

export default create({
  base: 'light',
  brandImage: logo,
  brandUrl: 'https://cloud.linode.com',
  brandTitle: 'Akamai Cloud Manager',
  brandTarget: '_self',

  // Typography
  fontBase: '"Nunito Sans", sans-serif',
  fontCode: 'monospace',
  colorPrimary: '#3A10E5',
  colorSecondary: '#585C6D',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 4,
});