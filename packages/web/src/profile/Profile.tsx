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

import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useLazyLoadQuery, graphql, useMutation} from 'react-relay';
import {FiEdit} from 'react-icons/fi';

import {useFormik} from 'formik';

import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  VStack,
} from '@chakra-ui/react';

import {ProfileQuery} from '../__generated__/ProfileQuery.graphql';
import {ProfileUpdateMutation} from '../__generated__/ProfileUpdateMutation.graphql';

import ProfileVideos from './ProfileVideos';
import {useMaybeUser} from '../auth/AuthContext';

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

const ProfileUpdateMutation = graphql`
  mutation ProfileUpdateMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      profile {
        id
        displayName
        username
        avatar
      }
    }
  }
`;

export type ProfileProps = {
  readonly username: string;
};

function Profile(props: ProfileProps) {
  const {username} = props;

  return (
    <React.Suspense fallback='Loading...'>
      <Content username={username} />
    </React.Suspense>
  );
}

type ContentProps = {
  readonly username: string;
};

function Content(props: ContentProps) {
  const user = useMaybeUser();
  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const [commitMutation, isFlying] = useMutation<ProfileUpdateMutation>(
    ProfileUpdateMutation,
  );

  const {profile} = useLazyLoadQuery<ProfileQuery>(ProfileQuery, {
    username: props.username,
  });

  const formik = useFormik({
    initialValues: {
      username: profile?.username ?? '',
      displayName: profile?.displayName ?? '',
    },
    onSubmit: (values) => {
      commitMutation({
        variables: {
          input: {
            username: values.username,
            displayName: values.displayName,
          },
        },
        onCompleted: () => {
          setEditing(false);

          if (values.username !== user?.profile?.username) {
            router.push(`/${values.username}`);
          }
        },
      });
    },
  });

  if (!profile) return null;

  const isOwner = user?.profile?.id === profile.id;
  const diff =
    formik.values.displayName !== profile.displayName ||
    formik.values.username !== profile.username;

  function edit() {
    if (!isOwner) return;
    if (diff) return;

    setEditing((editing) => !editing);
  }

  return (
    <VStack padding='1rem 0'>
      <HStack
        as='form'
        width='100%'
        justify='space-between'
        align='start'
        {...({onSubmit: formik.handleSubmit} as any)}
      >
        <HStack width='100%' gap='1rem' align='start'>
          <Image
            src={profile.avatar}
            width='100'
            height='100'
            borderRadius='50%'
          />

          <Box height='100%'>
            <VStack justify='start' align='start'>
              {editing ? (
                <Input
                  id='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              ) : (
                <Heading as='h2' fontSize='22'>
                  {profile.username}
                </Heading>
              )}

              {editing ? (
                <Input
                  id='displayName'
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                />
              ) : (
                <Heading as='h4' fontSize='18'>
                  {profile.displayName}
                </Heading>
              )}
            </VStack>
          </Box>
        </HStack>

        <HStack gap='0.5rem'>
          <IconButton
            aria-label='Edit profile'
            colorScheme={editing ? 'red' : null}
            icon={<FiEdit />}
            onClick={edit}
          />

          {diff && (
            <Button type='submit' colorScheme='green' disabled={isFlying}>
              Submit
            </Button>
          )}
        </HStack>
      </HStack>

      <React.Suspense>
        <ProfileVideos profile={profile} />
      </React.Suspense>
    </VStack>
  );
}

export default Profile;
