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
import {useLazyLoadQuery, graphql} from 'react-relay';

import {Box, Heading, HStack, Image, VStack} from '@chakra-ui/react';

import {ProfileQuery} from '../../__generated__/ProfileQuery.graphql';

import ProfileVideos from './ProfileVideos';

const ProfileQuery = graphql`
  query ProfileQuery($username: String!) {
    profile(username: $username) {
      id
      username
      displayName
      avatar
    }
  }
`;

export type ProfileProps = {
  readonly username: string;
}

function Profile(props: ProfileProps) {
  const {username} = props;

  return (
    <React.Suspense fallback="Loading...">
      <Content username={username} />
    </React.Suspense>
  );
}

type ContentProps = {
  readonly username: string;
};

function Content(props: ContentProps) {
  const {profile} = useLazyLoadQuery<ProfileQuery>(ProfileQuery, {
    username: props.username,
  });

  console.log('profile', profile);

  if (!profile) {
    return null;
  }

  return (
    <VStack padding='1rem 0'>
      <HStack width='100%' gap='1rem'>
        <Image
          src={profile.avatar}
          width='100'
          height='100'
          borderRadius='50%'
        />

        <Box height='100%'>
          <VStack justify='start' align='start'>
            <Heading as='h2' fontSize='22'>{profile.username}</Heading>

            <Heading as='h4' fontSize='18'>{profile.displayName}</Heading>
          </VStack>
        </Box>
      </HStack>

      <React.Suspense>
        <ProfileVideos profile={profile} />
      </React.Suspense>
    </VStack>
  );
}

export default Profile;
