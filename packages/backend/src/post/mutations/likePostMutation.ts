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

import {GraphQLID, GraphQLNonNull} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import TicoTecoContext from '../../graphql/TicoTecoContext.js';

import Post from '../Post.js';
import GraphQLPost from '../types/GraphQLPost.js';

type LikePostArgs = {
  readonly id: string;
};

export const likePostMutation = mutationWithClientMutationId({
  name: 'LikePost',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: () => ({
    post: {
      type: new GraphQLNonNull(GraphQLPost),
      resolve: ({post}) => post,
    },
  }),
  mutateAndGetPayload: async (args: LikePostArgs, ctx: TicoTecoContext) => {
    const {id} = args;

    const post = await Post.findByIdAndUpdate(id, {
      $addToSet: {
        likes: ctx.user._id,
      },
    });

    return {post};
  },
});
