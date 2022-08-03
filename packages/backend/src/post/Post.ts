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

import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema<Post>({
  user: {type: mongoose.SchemaTypes.ObjectId, required: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  likes: [{type: Array, required: false}],
});

type Post = {
  readonly _id: mongoose.Types.ObjectId;
  readonly user: mongoose.Types.ObjectId;
  readonly likes: mongoose.Types.ObjectId[];
  title: string;
  description: string;
};

const Post = mongoose.model<Post>('Post', postSchema);

export default Post;
