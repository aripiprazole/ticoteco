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

import {GraphQLFieldConfig} from 'graphql/type';
import {Connection, connectionArgs, connectionFromArray} from 'graphql-relay';

import TicoTecoContext from '@/graphql/TicoTecoContext';
import {GraphQLPostConnection} from '@/post/types/GraphQLPost';

export const forYouQuery: GraphQLFieldConfig<any, TicoTecoContext> = {
  type: GraphQLPostConnection.connectionType,
  description: 'Get for you post connection',
  args: connectionArgs,
  resolve: (_root, args, _context): Connection<unknown> => {
    const profile = {
      _id: '1',
      avatarUrl: 'https://i.pravatar.cc/300',
      username: 'gabi',
      displayName: 'Gabrielle Guimarães de Oliveira',
    };

    const posts = [
      {
        _id: '1',
        title: 'Dance 1',
        description: '#dance',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        previewUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        profile,
      },
      {
        _id: '2',
        title: 'Dance 2',
        description: '#dance',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        previewUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        profile,
      },
      {
        _id: '3',
        title: 'Dance 3',
        description: '#dance',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        previewUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        profile,
      },
      {
        _id: '4',
        title: 'Dance 4',
        description: '#dance',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        previewUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        profile,
      },
      {
        _id: '5',
        title: 'Dance 5',
        description: '#dance',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        previewUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        profile,
      },
    ];

    return connectionFromArray(posts, args);
  },
};
