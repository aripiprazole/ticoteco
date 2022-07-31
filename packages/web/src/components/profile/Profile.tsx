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

import graphql from 'babel-plugin-relay/macro';

import {Box, Image, VStack} from '@chakra-ui/react';
import {useLazyLoadQuery} from 'react-relay';
//
// const ProfileQuery = graphql`
//   query ProfileQuery($username: String!) {
//     profile(username: $username) {
//       id
//       username
//       displayName
//     }
//   }
// `;
//
// const ProfileVideos = graphql`
//   query ProfileVideosQuery($username: String!, $first: Int!, $after: String) {
//     profile(username: $username) {
//       posts(first: $first, after: $after) {
//         pageInfo {
//           hasNextPage
//           hasPreviousPage
//           startCursor
//           endCursor
//         }
//         edges {
//           cursor
//           node {
//             id
//             title
//             description
//             preview
//             video
//           }
//         }
//       }
//     }
//   }
// `;

export type ProfileProps = {
  readonly username: string;
}

function Profile(props: ProfileProps) {
  // const query = useLazyLoadQuery(ProfileQuery, {});

  return <Content profile={{}} />;
}

type ContentProps = {
  readonly profile: any;
};

function Content(props: ContentProps) {
  const {profile} = props;

  return (
    <VStack>
      <VStack>
        <Image src={profile.avatar} />
      </VStack>
    </VStack>
  );
}

export default Profile;
