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
import {connectionDefinitions} from 'graphql-relay';

import GraphQLProfile from '@/profile/types/GraphQLProfile';

import Post from '@/post/Post';
import User from '@/users/User';

const GraphQLPost = new GraphQLObjectType<Post>({
  name: 'Post',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post._id.toString(),
    },

    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.title,
    },

    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.description,
    },

    video: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.videoUrl,
    },

    preview: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.previewUrl,
    },

    profile: {
      type: new GraphQLNonNull(GraphQLProfile),
      resolve: async (post) => {
        const user = await User.findById(post.user);

        return user.profile;
      },
    },
  }),
});

export const GraphQLPostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: GraphQLPost,
});

export default GraphQLPost;
