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

import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {connectionDefinitions} from 'graphql-relay';

import PostModel from './PostModel';
import CommentType from '../comment/CommentType';
import {videoField} from './fields/videoField';
import {profileField} from '../user/fields/profileField';

const PostType = new GraphQLObjectType<PostModel>({
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

    likes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (post) => post.likes.length,
    },

    comments: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(CommentType)),
      ),
      resolve: async (post) => post.comments,
    },

    video: videoField,

    profile: profileField,

    preview: {
      type: new GraphQLNonNull(GraphQLString),
      // TODO: remove
      resolve: () => 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
  }),
});

export const GraphQLPostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

export default PostType;
