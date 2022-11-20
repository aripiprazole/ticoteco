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

import Timeline from './Timeline';
import Layout from '../layout/Layout';
import {TimelineQuery} from '../__generated__/TimelineQuery.graphql';
import {PreloadedQuery} from 'react-relay';

export type TimelinePageProps = {
  initialQueryRef?: PreloadedQuery<TimelineQuery>;
};

function TimelinePage(props: TimelinePageProps) {
  const {initialQueryRef} = props;

  return (
    <Layout>
      <Head>
        <title>TicoTeco - Timeline</title>
      </Head>

      <Timeline initialQueryRef={initialQueryRef} />
    </Layout>
  );
}

export default TimelinePage;
