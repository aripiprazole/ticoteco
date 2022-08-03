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

import {GraphQLNonNull, GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import * as Yup from 'yup';

import TicoTecoContext from '../../graphql/TicoTecoContext.js';

import Post from '../Post.js';
import GraphQLPost from '../types/GraphQLPost.js';

type UpdatePostArgs = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

const updatePostSchema = Yup.object({
  title: Yup.string().required().min(4).max(32),
  description: Yup.string().min(0).max(32),
});

export const updatePostMutation = mutationWithClientMutationId({
  name: 'UpdatePost',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLString},
  },
  outputFields: () => ({
    post: {
      type: new GraphQLNonNull(GraphQLPost),
      resolve: ({post}) => post,
    },
  }),
  mutateAndGetPayload: async (args: UpdatePostArgs, ctx: TicoTecoContext) => {
    const {id, title, description} = args;

    await updatePostSchema.validate({title, description});

    const post = await Post.findById(id);

    if (post.user !== ctx.user._id) {
      throw Error('You are not allowed to update this post');
    }

    post.title = title;
    post.description = description;

    await post.save();

    return {post};
  },
});
