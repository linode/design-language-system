import type { Meta, StoryObj } from '@storybook/react';

import { GlobalColors } from './Colors';

const meta = {
  title: 'Colors/Global',
  component: GlobalColors,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {

  },
} satisfies Meta<typeof GlobalColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
