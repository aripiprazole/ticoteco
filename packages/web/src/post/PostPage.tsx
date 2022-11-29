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
import Head from 'next/head';
import {PreloadedQuery} from 'react-relay';

import {Box} from '@chakra-ui/react';

import Post from './Post';

import {PostQuery} from '../__generated__/PostQuery.graphql';

export type PostPageProps = {
  readonly initialQueryRef: PreloadedQuery<PostQuery>;
};

function PostPage(props: PostPageProps) {
  const {initialQueryRef} = props;

  return (
    <Box height='100%'>
      <Head>
        <title children={`TicoTeco - Loading...`} />
      </Head>

      <React.Suspense fallback='Loading...'>
        <Post initialQueryRef={initialQueryRef} />
      </React.Suspense>
    </Box>
  );
}

export default PostPage;
