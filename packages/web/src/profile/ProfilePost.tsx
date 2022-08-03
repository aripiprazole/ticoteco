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
import {FiPlay} from 'react-icons/fi';

import {Box, Heading, Image, VStack} from '@chakra-ui/react';

import {ProfileVideosQuery$data} from '../__generated__/ProfileVideosQuery.graphql';

type Post = ProfileVideosQuery$data['profile']['posts']['edges'][0]['node'];

export type ProfilePostProps = {
  readonly data: Post;
};

function ProfilePost(props: ProfilePostProps) {
  const {data} = props;

  return (
    <VStack width='12rem' gap='0.2rem' align='start'>
      <Box
        position='relative'
        sx={{
          width: '12rem',
          height: 'calc(12rem / 9 * 16)',
        }}
      >
        <Image
          src={data.preview}
          borderRadius='0.5rem'
          width='100%'
          height='100%'
        />

        <FiPlay
          color='#fefefe'
          size='1.2rem'
          style={{position: 'absolute', bottom: '0.3rem', left: '0.3rem'}}
        />
      </Box>

      <Heading as='h4' fontSize='1.2rem' fontWeight='normal'>
        {props.data.title}
      </Heading>
    </VStack>
  );
}

export default ProfilePost;
