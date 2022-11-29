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

import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {AuthUserContext} from 'next-firebase-auth';
import fetchGraphQL from './fetchGraphQL';

function buildRelayEnvironment(authUser: AuthUserContext): Environment {
  return new Environment({
    network: Network.create((query, variables, cacheConfig, uploadables) => {
      return fetchGraphQL(authUser, query, variables, cacheConfig, uploadables);
    }),
    store: new Store(new RecordSource()),
    isServer: typeof window === 'undefined',
  });
}

export default buildRelayEnvironment;
