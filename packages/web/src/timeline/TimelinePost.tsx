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
import {useRouter} from 'next/router';
import {FiHeart, FiMessageCircle, FiShare2} from 'react-icons/fi';
import {IconType} from 'react-icons';

import {chakra, Flex, Heading, IconButton, Image, Text} from '@chakra-ui/react';

import {TimelineQuery$data} from '../__generated__/TimelineQuery.graphql';

type PostProps = {
  readonly selected?: boolean;
  readonly data: TimelineQuery$data['forYou']['edges'][0]['node'];
};

function TimelinePost(props: PostProps) {
  const {selected = false, data} = props;

  const videoRef = useRef<HTMLVideoElement>();

  const router = useRouter();

  const [playing, setPlaying] = useState(selected);

  useEffect(() => {
    setPlaying(selected);
  }, [selected]);

  useEffect(() => {
    document.onkeydown = (event) => {
      event.preventDefault();

      if (!selected) return;
      if (event.key !== ' ') return;

      setPlaying((playing) => !playing);
    };
  }, []);

  useEffect(() => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [playing]);

  return (
    <Flex gap='0.5rem' padding='1.5rem 0' borderBottom='1px solid #cecece'>
      <Link href={`/${data.profile.username}`}>
        <a>
          <Image
            src={data.profile.avatar}
            aria-label={`${data.profile.username}'s avatar`}
            height='4rem'
            width='4rem'
            borderRadius='50%'
          />
        </a>
      </Link>

      <Flex direction='column' gap='0.5rem'>
        <Heading fontSize='1.5rem' lineHeight='0.8'>
          {data.profile.username}{' '}
          <chakra.span fontSize='1rem' fontWeight={400}>
            {data.profile.displayName}
          </chakra.span>
        </Heading>

        <Text fontSize='1rem'>
          {data.title}{' '}
          <chakra.span fontWeight={600}>{data.description}</chakra.span>
        </Text>

        <Flex gap='0.5rem'>
          <chakra.video
            onClick={() => setPlaying((playing) => !playing)}
            ref={videoRef}
            borderRadius='0.5rem'
            sx={{
              width: 'calc((100vh / 100 * 76) / 16 * 9)',
              height: 'calc(100vh / 100 * 76)',
            }}
          >
            <chakra.source src={data.video} type='video/mp4' />
            Use an updated browser to play TicoTeco videos.
          </chakra.video>

          <Flex direction='column' justify='end' gap='0.5rem'>
            <ActionButton label='Like' icon={FiHeart} />
            <ActionButton
              label='Comments'
              icon={FiMessageCircle}
              onClick={() => router.push(`/post/${data.id}`)}
            />
            <ActionButton label='Share' icon={FiShare2} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

type ActionButtonProps = {
  readonly label: string;
  readonly icon: IconType;
  readonly onClick?: () => void;
};

function ActionButton(props: ActionButtonProps) {
  const {icon: Icon, label, onClick} = props;

  return (
    <IconButton
      aria-label={label}
      borderRadius='50%'
      height='fit-content'
      onClick={onClick}
      sx={{padding: '1rem'}}
    >
      <Icon fill='#000' size='1.3rem' />
    </IconButton>
  );
}

export default TimelinePost;
