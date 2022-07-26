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
import {GraphQLUpload, Upload} from 'graphql-upload';

import TicoTecoContext from '@/graphql/TicoTecoContext';
import GraphQLPost from '@/post/types/GraphQLPost';

type CreatePostArgs = {
  readonly title: string;
  readonly description: string;
  readonly video: Upload;
};

export const createPostMutation = mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)},
    video: {type: new GraphQLNonNull(GraphQLUpload)},
  },
  outputFields: () => ({
    post: {
      type: GraphQLPost,
      resolve: ({post}) => post,
    },
  }),
  mutateAndGetPayload: async (args: CreatePostArgs, ctx: TicoTecoContext) => {
    console.log('video', await args.video.promise.then((a) => a.filename));
  },
});
