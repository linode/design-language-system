import type { Meta, StoryObj } from '@storybook/react';
import {
  Action,
  Background,
  Border,
  Content,
  Interaction,
  Elevation
} from '../../../dist/index.js';
import { Aliases } from './Aliases.js';

const meta = {
  title: 'Tokens/Aliases',
  component: Aliases,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {

  },
} satisfies Meta<typeof Aliases>;

type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  args: {
    concept: Action,
    conceptHeading: 'Action'
  },
};

export const Backgrounds: Story = {
  args: {
    concept: Background,
    conceptHeading: 'Background'
  },
};

export const Borders: Story = {
  args: {
    concept: Border,
    conceptHeading: 'Border'
  },
};

export const ContentColors: Story = {
  args: {
    concept: Content,
    conceptHeading: 'Content'
  },
};

export const Interactions: Story = {
  args: {
    concept: Interaction,
    conceptHeading: 'Interaction'
  },
};

export const Elevations: Story = {
  args: {
    concept: Elevation,
    conceptHeading: 'Elevation'
  },
};

export default meta;
