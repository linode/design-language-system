import type { Meta, StoryObj } from '@storybook/react';
import { Globals } from './Globals';

const meta = {
  title: 'Tokens/Globals',
  component: Globals,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Globals>;


type Story = StoryObj<typeof meta>;

export const _Globals: Story = {
  args: {
    concept: '',
    conceptHeading: ''
  },
};

export default meta;


