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
import Link from 'next/link';

import {chakra, Heading, HStack, Image, Text, VStack} from '@chakra-ui/react';

export type PostCommentProps = {
  readonly data: any;
};

function PostComment(props: PostCommentProps) {
  const {data} = props;

  return (
    <VStack
      width='100%'
      mt='0.5rem'
      style={{margin: '0'}}
      justify='start'
      align='start'
      padding='1rem 1.5rem'
    >
      <HStack>
        <Link href='/[username]' as={`/${data.profile.username}`}>
          <chakra.a>
            <Image
              cursor='pointer'
              src={data.profile.avatar}
              aria-label={`${data.profile.username}'s avatar`}
              height='2rem'
              width='2rem'
              borderRadius='50%'
            />
          </chakra.a>
        </Link>

        <Heading fontSize='1rem' lineHeight='0.8'>
          {data.profile.username}{' '}
        </Heading>
      </HStack>

      <VStack align='start' gap='0.5rem' width='100%'>
        <Text fontSize='0.8rem'>{data.content}</Text>
      </VStack>
    </VStack>
  );
}

export default PostComment;
