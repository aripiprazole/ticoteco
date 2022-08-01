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
import {
  useQueryLoader,
  usePreloadedQuery,
  PreloadedQuery,
  graphql,
} from 'react-relay';

import {Box} from '@chakra-ui/react';

import TimelinePost from './TimelinePost';

import {TimelineQuery} from '../../__generated__/TimelineQuery.graphql';

const TimelineQuery = graphql`
  query TimelineQuery($after: String) {
    forYou(first: 3, after: $after) {
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
          profile {
            id
            avatar
            username
            displayName
          }
        }
      }
    }
  }
`;

type CurrentPostProps = {
  readonly queryRef: PreloadedQuery<TimelineQuery>;
  readonly setAfterPost: (afterPost: string) => void;
};

function CurrentPosts(props: CurrentPostProps) {
  const {queryRef, setAfterPost} = props;

  const {forYou} = usePreloadedQuery(TimelineQuery, queryRef);

  return (
    <div>
      {forYou.edges.map(({node, cursor}) => (
        <TimelinePost data={node} key={cursor} />
      ))}

      <button
        onClick={() => {
          setAfterPost(forYou.pageInfo.endCursor);
        }}
      >
        Next video...
      </button>
    </div>
  );
}

function Timeline() {
  const [queryRef, loadQuery] = useQueryLoader<TimelineQuery>(TimelineQuery);

  const [afterPost, setAfterPost] = useState<string>();

  useEffect(() => {
    // Fetches initial posts to make the timeline fluid for the initial view
    loadQuery({after: afterPost});
  }, [afterPost]);

  return (
    <Box>
      {queryRef && (
        <React.Suspense fallback='Loading...'>
          <CurrentPosts queryRef={queryRef} setAfterPost={setAfterPost} />
        </React.Suspense>
      )}
    </Box>
  );
}

export default Timeline;
