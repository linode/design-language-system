import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<JSX.Element> = {
  title: 'Documentation/Welcome',
};

export default meta;

export const Welcome = () => <h1>Welcome to Storybook</h1>;
