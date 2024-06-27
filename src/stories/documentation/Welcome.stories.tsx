import { Meta } from '@storybook/react';
import React from 'react';

import './welcome.css';

const meta: Meta<JSX.Element> = {
  title: 'Documentation/Welcome',
};

export default meta;

export const Welcome = () => (
  <div id='welcome'>
    <div className="banner">
     <h1>Akamai Design System</h1>
    </div>
    <p className="intro">Here you can find our design guidelines, component documentation, and resources for building apps with Akamai's design system.</p>
    <h2>What's Inside</h2>
    <div className="inside">
      <div>
        <h3>Get Started</h3>
        <p>Instructions and welcome to Akamai's OS design system</p>
        <a href='../?path=/story/documentation-get-started--get-started'>Read more</a>
      </div>
      <div>
        <h3>Tokens</h3>
        <p>All information about colors, typography, spacing, and icons</p>
        <a href='/'>Read more</a>
      </div>
      <div>
        <h3>Components</h3>
        <p>All the information and guidelines you’ll ever need on each component</p>
        <a href='/'>Read more</a>
      </div>
    </div>
  </div>
);
