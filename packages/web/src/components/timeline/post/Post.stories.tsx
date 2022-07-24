/*
 * TikTok clone as web application
 * Copyright (C) 2022  Gabrielle Guimarães de Oliveira
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Post} from './Post';

export default {
  title: 'Web/Post',
  component: Post,
} as ComponentMeta<typeof Post>;

export const Main: ComponentStory<typeof Post> = () => {
  const dummy = {
    id: '1',
    title: 'Dance 1',
    description: '#dance',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    preview: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  };

  return <Post data={dummy} />;
};
