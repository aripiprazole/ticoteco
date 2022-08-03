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

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {graphql, useLazyLoadQuery} from 'react-relay';

import {
  Box,
  chakra,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import {PostQuery} from '../__generated__/PostQuery.graphql';

const PostQuery = graphql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      description
      video
      profile {
        id
        avatar
        displayName
        username
      }
    }
  }
`;

export type PostProps = {
  readonly postId: string;
};

function Post(props: PostProps) {
  const {postId} = props;

  const videoRef = useRef<HTMLVideoElement>();

  const [playing, setPlaying] = useState(false);

  const {post} = useLazyLoadQuery<PostQuery>(PostQuery, {id: postId});

  useEffect(() => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [playing]);

  return (
    <HStack width='100%' height='100%' wrap='wrap'>
      <Flex
        background='#111'
        minWidth={{
          sm: '100%',
          md: 'calc(100% / 16 * 9)',
        }}
        height='100%'
        justify='center'
      >
        <chakra.video
          onClick={() => setPlaying((playing) => !playing)}
          ref={videoRef}
          sx={{
            width: 'calc(100% / 16 * 9)',
            height: '100%',
          }}
        >
          <chakra.source src={post.video} type='video/mp4' />
          Use an updated browser to play TicoTeco videos.
        </chakra.video>
      </Flex>

      <Box flex='1' height='100%' style={{margin: '0'}}>
        <HStack
          width='100%'
          mt='0.5rem'
          padding='3rem 1.5rem'
          borderBottom='1px solid #ccc'
          background='#fff'
          style={{margin: '0'}}
        >
          <Link href={`/${post.profile.username}`}>
            <chakra.a>
              <Image
                src={post.profile.avatar}
                aria-label={`${post.profile.username}'s avatar`}
                height='4rem'
                width='4rem'
                borderRadius='50%'
              />
            </chakra.a>
          </Link>

          <VStack align='start' gap='0.5rem'>
            <Heading fontSize='1.5rem' lineHeight='0.8'>
              {post.profile.username}{' '}
              <chakra.span fontSize='1rem' fontWeight={400}>
                {post.profile.displayName}
              </chakra.span>
            </Heading>

            <Text fontSize='1rem'>
              {post.title}{' '}
              <chakra.span fontWeight={600}>{post.description}</chakra.span>
            </Text>
          </VStack>
        </HStack>
      </Box>
    </HStack>
  );
}

export default Post;
