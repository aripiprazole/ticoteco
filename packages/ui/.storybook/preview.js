import React from 'react';

import {addDecorator} from '@storybook/react';

import {ChakraProvider} from '@chakra-ui/react';

import theme from '@ticoteco/ui/src/theme';

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(s => (
  <ChakraProvider theme={theme}>
    {s()}
  </ChakraProvider>
));
