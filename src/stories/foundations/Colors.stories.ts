import type { Meta, StoryObj } from '@storybook/react';

import { GlobalColors } from './Colors.tsx';

const meta = {
  title: 'Foundations/Colors',
  component: GlobalColors,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
} satisfies Meta<typeof GlobalColors>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  args: {},
};
