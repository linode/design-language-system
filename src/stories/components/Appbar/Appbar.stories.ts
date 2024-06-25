import type { Meta, StoryObj } from '@storybook/react';
import { AppbarColors } from './Appbar.js';

const meta = {
  title: 'Colors/Components/Appbar',
  component: AppbarColors,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof AppbarColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
