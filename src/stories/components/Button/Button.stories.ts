import type { Meta, StoryObj } from '@storybook/react';
import { ButtonColors } from './Button.js';

const meta = {
  title: 'Colors/Components/Button',
  component: ButtonColors,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ButtonColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
