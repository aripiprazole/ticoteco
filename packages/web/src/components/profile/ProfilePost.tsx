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
import {Box} from '@chakra-ui/react';

import {
  ProfileVideosQuery$data,
} from '../../__generated__/ProfileVideosQuery.graphql';

type Post = ProfileVideosQuery$data['profile']['posts']['edges'][0]['node'];

export type ProfilePostProps = {
  readonly data: Post;
};

function ProfilePost(props: ProfilePostProps) {
  return <Box />;
}

export default ProfilePost;
