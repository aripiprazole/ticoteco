import React from 'react';

import {addDecorator} from '@storybook/react';

import {GlobalStyle} from '..';

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(s => <><GlobalStyle />{s()}</>);
