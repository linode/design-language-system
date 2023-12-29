import type { Meta, StoryObj } from '@storybook/react';
import { Action,
  Background,
  Border,
  Content,
  Interaction, } from '../../dist/index.js';
import { AliasColors } from './AliasColors';

const meta = {
  title: 'Colors/Alias',
  component: AliasColors,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {

  },
} satisfies Meta<typeof AliasColors>;

export default meta;
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
