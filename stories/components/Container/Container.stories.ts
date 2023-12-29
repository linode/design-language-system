import type { Meta, StoryObj } from '@storybook/react';
import { ContainerColors } from './Container.js';

const meta = {
  title: 'Colors/Components/Container',
  component: ContainerColors,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ContainerColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
