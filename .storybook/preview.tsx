import React from 'react';

import type { Preview } from "@storybook/react";

import './global.css';

const preview: Preview = {
  decorators: [
    (Story) => 
      <div id="page-layout"><Story /></div>
  ],
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        inline: true,
      },
    },
    options: {
      storySort: {
        order: ['Documentation', 'Tokens', 'Components'],
      },
    },
  },
};

export default preview;
