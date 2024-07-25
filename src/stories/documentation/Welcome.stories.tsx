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
    <div className="inside">
      <h2>What's Inside</h2>
      <div className='tiles'>
        <div className="tile">
          <h3>Get Started</h3>
          <p>Instructions and welcome to Akamai's OS design system</p>
          <a href='../?path=/story/documentation-get-started--get-started'>Read more</a>
        </div>
        <div className="tile">
          <h3>Foundations</h3>
          <p>All information about colors, typography, spacing, and icons</p>
          <a href='/?path=/story/foundations-accessibility--accessibility'>Read more</a>
        </div>
        <div className="tile">
          <h3>Tokens</h3>
          <p>A reference guide to use tokens in your application</p>
          <a href='/?path=/docs/tokens-globals--docs'>Read more</a>
        </div>
        <div className="tile">
          <h3>Components</h3>
          <p>All the information and guidelines you’ll ever need on each component</p>
          <a href='/?path=/story/components-components--welcome'>Read more</a>
        </div>
      </div>
    </div>
    <div>
      <h2>Our Principles</h2>
      <p>
        Our principles are based on the following core concepts:
        <ul>
          <li>Clarity</li>
          <li>Consistency</li>
          <li>Accessibility</li>
          <li>Flexibility</li>
        </ul>
      </p>
      <p>Our design guidelines are a set of best practices and recommendations for creating a consistent and accessible user experience. They cover everything from color and typography to layout and iconography.</p>
    </div>
    <div className="resources">
      <h2>Resources</h2>
      <div className='tiles'>
        <div className='tile'>
          <h3>Design Kit</h3>
          <p>Download our design kit for Figma</p>
          <a href='/'>Download</a>
        </div>
        <div className='tile'>
          <h3>Sketch Kit</h3>
          <p>Download our design kit for Sketch</p>
          <a href='/'>Download</a>
        </div>
        <div className='tile'>
          <h3>Code Snippets</h3>
          <p>Download our code snippets for React</p>
          <a href='/'>Download</a>
        </div>
      </div>
    </div>
  </div>
);
