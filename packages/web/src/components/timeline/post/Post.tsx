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
import {IconType} from 'react-icons';

import {
  Box,
  chakra,
  Flex,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

import {TimelineQuery$data} from '@/__generated__/TimelineQuery.graphql';

export type PostProps = {
  readonly data: TimelineQuery$data['forYou']['edges'][0]['node'];
}

export function Post(props: PostProps) {
  const {data} = props;

  return (
    <Box>
      <Text>
        {data.title}{' '}
        <chakra.span fontWeight={600}>{data.description}</chakra.span>
      </Text>

      <Flex gap='0.5rem'>
        <Image
          src={data.preview}
          borderRadius='0.5rem'
          sx={{
            width: '20rem',
            height: 'calc(20rem / 9 * 16)',
          }}
        />

        <Flex direction='column' justify='end' gap='0.5rem'>
          <ActionButton label='Like' icon={FiHeart} />
          <ActionButton label='Comments' icon={FiMessageCircle} />
          <ActionButton label='Share' icon={FiShare2} />
        </Flex>
      </Flex>
    </Box>
  );
}

type ActionButtonProps = {label: string; icon: IconType};

function ActionButton(props: ActionButtonProps) {
  const {icon: Icon, label} = props;

  return (
    <IconButton
      aria-label={label}
      borderRadius='50%'
      height='fit-content'
      sx={{padding: '1rem'}}
    >
      <Icon fill='#000' size='1.3rem' />
    </IconButton>
  );
}
