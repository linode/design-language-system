import type { Meta, StoryObj } from '@storybook/react';

import { ColorSwatch } from './ColorSwatch.tsx';

const meta = {
  title: 'Example/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    shape: { control: 'radio', options: ['circle', 'square'] },
    elevation: {
      control: {
        type: 'select',
      },
      options: ['none', '0 2px 6px 0 rgba(58,59,63,0.18)', '0 16px 32px 0 rgba(58,59,63,0.18), 0 4px 8px 0 rgba(58,59,63,0.08)'],
    },
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'red',
    shape: 'circle',
    elevation: 'none',
  },
};