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
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import Upload from 'graphql-upload/Upload.mjs';

import * as Yup from 'yup';

import TicoTecoContext from '../../graphql/TicoTecoContext.js';
import Post from '../Post.js';
import GraphQLPost from '../types/GraphQLPost.js';

type CreatePostArgs = {
  readonly title: string;
  readonly description: string;
  readonly video: Upload;
};

const createPostSchema = Yup.object({
  title: Yup.string().required().min(4).max(32),
  description: Yup.string().min(0).max(32),
  video: Yup.mixed()
    .required()
    .test(
      'file-format',
      'The form only accepts MP4',
      (file) => file && file.mimetype === 'video/mp4',
    ),
});

export const createPostMutation = mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLString},
    video: {type: GraphQLUpload},
  },
  outputFields: () => ({
    post: {
      type: GraphQLPost,
      resolve: ({post}) => post,
    },
  }),
  mutateAndGetPayload: async (args: CreatePostArgs, ctx: TicoTecoContext) => {
    const video = await args.video;

    const post = new Post({
      title: args.title,
      description: args.description,
      user: ctx.user._id,
    });

    // Override video to use directly the FileUpload datatype.
    await createPostSchema.validate({...args, video});

    const file = ctx.bucket.file(`posts/${post._id}.mp4`);

    const readStream = video.createReadStream();
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const pipedStreams = readStream.pipe(writeStream);

    await new Promise<void>((resolve, reject) => {
      pipedStreams.on('error', (err) => reject(err));
      pipedStreams.on('finish', () => resolve());
    });

    await post.save();

    return {post};
  },
});
