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

import {
  GraphQLResponse,
  GraphQLTaggedNode,
  UploadableMap,
  Variables,
} from 'relay-runtime';
import {GetServerSidePropsContext} from 'next/types';
import {AuthUser} from 'next-firebase-auth';

import fetchGraphQL from './fetchGraphQL';

export type EkkoPreloadedQuery = {
  params: any;
  variables: Variables;
  response: GraphQLResponse;
};

function getRequestEsm(request: any): any {
  return request.default ?? request;
}

export default async function preloadQuery(
  ctx: GetServerSidePropsContext<any>,
  user: AuthUser,
  request: GraphQLTaggedNode,
  variables: Variables = {},
  uploadables?: UploadableMap | null,
) {
  const {params} = getRequestEsm(request);

  const idToken = await user?.getIdToken();

  const response = await fetchGraphQL(
    idToken,
    params,
    variables,
    {},
    uploadables,
  );

  return {params, variables, response};
}
