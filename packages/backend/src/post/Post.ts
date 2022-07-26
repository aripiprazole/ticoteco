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

import {model, Schema, Types, SchemaTypes} from 'mongoose';

export const postSchema = new Schema<Post>({
  user: {type: SchemaTypes.ObjectId, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  videoUrl: {type: String, required: true},
  previewUrl: {type: String, required: true},
});

type Post = {
  readonly _id: Types.ObjectId;
  readonly user: Types.ObjectId;
  readonly title: string;
  readonly description: string;
  readonly videoUrl: string;
  readonly previewUrl: string;
};

const Post = model<Post>('Post', postSchema);

export default Post;
