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
import {GraphQLNonNull} from 'graphql';
import {connectionArgs, ConnectionArguments} from 'graphql-relay';
import DataLoader from 'dataloader';

import {
  mongooseLoader,
  connectionFromMongoCursor,
} from '@entria/graphql-mongoose-loader';

import {GraphQLPostConnection} from '../PostType';
import PostModel from '../PostModel';

import TicoTecoContext from '../../graphql/TicoTecoContext';

export type ForYouArguments = ConnectionArguments;

type ForYouQuery = GraphQLFieldConfig<any, TicoTecoContext, ForYouArguments>;

export const forYouQuery: ForYouQuery = {
  type: new GraphQLNonNull(GraphQLPostConnection.connectionType),
  description: 'Get for you post connection',
  args: connectionArgs,
  resolve: async (_root, args, context) => {
    const loader = new DataLoader((ids) => {
      return mongooseLoader(PostModel, ids as any);
    });

    return connectionFromMongoCursor({
      cursor: PostModel.find(),
      context,
      args,
      loader: (_context, id) => loader.load(id),
    });
  },
};
