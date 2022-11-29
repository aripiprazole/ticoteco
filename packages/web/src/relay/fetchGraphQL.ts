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
  CacheConfig,
  GraphQLResponse,
  RequestParameters,
  UploadableMap,
  Variables,
} from 'relay-runtime';

import axios from 'axios';

export const GRAPHQL_API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? 'http://localhost:8000';

const api = axios.create({
  baseURL: GRAPHQL_API_URL,
});

const fetchGraphQL = async (
  idToken: string,
  query: RequestParameters,
  variables: Variables,
  _cacheConfig: CacheConfig,
  uploadables?: UploadableMap | null,
): Promise<GraphQLResponse> => {
  let body: any;

  if (!uploadables) {
    body = {query: query.text, variables};
  } else {
    const formData = new FormData();

    const requestText = query?.text?.replace(/\n/g, '');

    const operations = JSON.stringify({
      query: requestText,
      variables,
    });

    formData.append('operations', operations);

    const map: Record<number, string[]> = {};

    const prefix = 'variables';

    Object.keys(uploadables).forEach((field: string) => {
      const file = uploadables[field];

      map[0] = [`${prefix}.${field}`];
      formData.append('map', JSON.stringify(map));
      formData.append('0', file);
    });

    formData.append('map', JSON.stringify(map));

    body = formData;
  }

  const response = await api.post('/graphql', body, {
    headers: idToken ? {Authorization: idToken} : {},
  });

  // Get the response as JSON
  return response.data;
};

export default fetchGraphQL;
