import { create } from '@storybook/theming/create';

// @ts-ignore
import logo from './assets/akamai-logo.png';

export default create({
  base: 'light',
  brandImage: logo,
  brandUrl: '/',
  brandTitle: 'Akamai Cloud Manager',
  brandTarget: '_self',
});