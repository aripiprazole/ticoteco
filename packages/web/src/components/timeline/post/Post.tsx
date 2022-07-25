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
import {FiHeart, FiMessageCircle, FiShare2} from 'react-icons/fi';

import {
  Container,
  PostPreview,
  PostActions,
  PostVideo,
  Like,
  Comment,
  Share,
} from './Post.styles';

import {TimelineQuery$data} from '@/__generated__/TimelineQuery.graphql';

export type PostProps = {
  readonly data: TimelineQuery$data['forYou']['edges'][0]['node'];
}

export function Post(props: PostProps) {
  const {data} = props;

  return (
    <Container>
      <h4>{data.title} {data.description}</h4>

      <PostVideo>
        <PostPreview src={data.preview} />

        <PostActions>
          <Like><FiHeart fill='#000' /></Like>
          <Comment><FiMessageCircle fill='#000' /></Comment>
          <Share><FiShare2 fill='#000' /></Share>
        </PostActions>
      </PostVideo>
    </Container>
  );
}