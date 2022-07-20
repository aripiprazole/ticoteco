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

import {GraphQLObjectType, GraphQLString} from 'graphql';

import UserModel from '@/users/UserModel';

const UserGraphQLType = new GraphQLObjectType<UserModel>({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (user) => user._id.toString(),
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    displayName: {
      type: GraphQLString,
      resolve: (user) => user.displayName,
    },
  }),
});

export default UserGraphQLType;

