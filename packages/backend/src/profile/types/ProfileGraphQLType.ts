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

import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';

const ProfileGraphQLType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post._id.toString(),
    },
    avatar: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.avatarUrl.toString(),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.username.toString(),
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.displayName.toString(),
    },
  }),
});

export default ProfileGraphQLType;
