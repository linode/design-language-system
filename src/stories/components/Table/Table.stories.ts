import type { Meta, StoryObj } from '@storybook/react';
import { TableColors } from './Table.js';

const meta = {
  title: 'Colors/Components/Table',
  component: TableColors,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof TableColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
