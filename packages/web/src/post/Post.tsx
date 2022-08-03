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

import React from 'react';

import {graphql, useLazyLoadQuery} from 'react-relay';

import {PostQuery} from '../__generated__/PostQuery.graphql';

const PostQuery = graphql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      description
      video
    }
  }
`;

export type PostProps = {
  readonly postId: string;
};

function Post(props: PostProps) {
  const {postId} = props;

  const {post} = useLazyLoadQuery<PostQuery>(PostQuery, {id: postId});

  return null;
}

export default Post;
