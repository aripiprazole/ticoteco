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

import {GraphQLFieldConfig, GraphQLID} from 'graphql';

import TicoTecoContext from '../../graphql/TicoTecoContext.js';

import GraphQLPost from '../types/GraphQLPost.js';
import Post from '../Post.js';

export type PostArguments = {
  readonly id: string;
};

type PostQuery = GraphQLFieldConfig<any, TicoTecoContext, PostArguments>;

export const postQuery: PostQuery = {
  type: GraphQLPost,
  description: 'Finds a post by id',
  args: {
    id: {type: GraphQLID},
  },
  resolve: async (_root, args) => {
    const {id} = args;

    return Post.findById(id);
  },
};
