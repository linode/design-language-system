import type { Meta, StoryObj } from '@storybook/react';

import { ColorSwatch } from './ColorSwatch';

const meta = {
  title: 'Example/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'red',
  },
};