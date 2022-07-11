import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {$NAME} from './${NAME}';

export default {
  title: 'UI Kit/${NAME}',
  component: $NAME,
} as ComponentMeta<typeof $NAME>;

export const Main: ComponentStory<typeof $NAME> = () => {
  return <${NAME} />;
};
