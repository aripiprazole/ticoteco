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

import React, {useEffect, useState} from 'react';
import {PreloadedQuery, usePreloadedQuery, useQueryLoader} from 'react-relay';

import graphql from 'babel-plugin-relay/macro';

import {HStack} from '@chakra-ui/react';

import {ProfileQuery$data} from '../../__generated__/ProfileQuery.graphql';

import ProfilePost from './ProfilePost';
import {
  ProfileVideosQuery,
} from '../../__generated__/ProfileVideosQuery.graphql';

const ProfileVideosQuery = graphql`
  query ProfileVideosQuery(
    $username: String!,
    $first: Int!,
    $after: String,
  ) {
    profile(username: $username) {
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            title
            description
            preview
            video
          }
        }
      }
    }
  }
`;

type CurrentPostsProps = {
  readonly preloadedQuery: PreloadedQuery<ProfileVideosQuery>;
  readonly setAfterPost: (afterPost: string) => void;
};

function CurrentPosts(props: CurrentPostsProps) {
  const {preloadedQuery} = props;

  const query = usePreloadedQuery(ProfileVideosQuery, preloadedQuery);

  return (
    <HStack flexWrap='wrap'>
      {query.profile.posts.edges.map(({node, cursor}) => (
        <ProfilePost data={node as any} key={cursor} />
      ))}
    </HStack>
  );
}

type ProfileVideoProps = {
  readonly profile: ProfileQuery$data['profile'];
};

function ProfileVideos(props: ProfileVideoProps) {
  const {profile} = props;

  const [afterPost, setAfterPost] = useState<string>();

  const [preloadedQuery, loadQuery] = useQueryLoader<ProfileVideosQuery>(
      ProfileVideosQuery,
  );

  useEffect(() => {
    loadQuery({
      username: profile.username,
      first: 15,
      after: afterPost,
    });
  }, [afterPost]);

  if (!preloadedQuery) {
    return null;
  }

  return (
    <React.Suspense fallback="Loading posts..">
      <CurrentPosts
        preloadedQuery={preloadedQuery}
        setAfterPost={setAfterPost}
      />
    </React.Suspense>
  );
}

export default ProfileVideos;
