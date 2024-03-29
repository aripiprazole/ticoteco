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

import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import TicoTecoContext from '../../graphql/TicoTecoContext';

import CommentModel from '../../comment/CommentModel';
import PostType from '../PostType';
import PostModel from '../PostModel';

type CommentPostArgs = {
  readonly id: string;
  readonly content: string;
};

export const commentPostMutation = mutationWithClientMutationId({
  name: 'CommentPost',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    content: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: () => ({
    post: {
      type: new GraphQLNonNull(PostType),
      resolve: ({post}) => post,
    },
  }),
  mutateAndGetPayload: async (args: CommentPostArgs, ctx: TicoTecoContext) => {
    const {content} = args;

    const post = await PostModel.findByIdAndUpdate(args.id, {
      $push: {
        comments: new CommentModel({
          user: ctx.user._id,
          content,
        }),
      },
    });

    return {post};
  },
});
