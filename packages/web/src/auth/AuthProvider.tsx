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

import React, {ReactNode, useEffect, useState} from 'react';
import {graphql, useRelayEnvironment} from 'react-relay';

import {fetchQuery} from 'relay-runtime';

import {AuthContext, TicoTecoUser} from './AuthContext';

import {AuthProviderQuery} from '../__generated__/AuthProviderQuery.graphql';
import {useMaybeAuthUser} from './authHooks';

export const authProviderQuery = graphql`
  query AuthProviderQuery {
    me {
      id
      profile {
        id
        avatar
        username
        displayName
      }
    }
  }
`;

export type AuthProviderProps = {
  preloadedUser: TicoTecoUser | null;
  children: ReactNode | undefined;
};

export function AuthProvider(props: AuthProviderProps) {
  const {preloadedUser, children} = props;

  const environment = useRelayEnvironment();
  const authUser = useMaybeAuthUser();

  const [user, setUser] = useState<TicoTecoUser | null>(preloadedUser);

  useEffect(() => {
    if (!authUser) return;

    const observable = fetchQuery<AuthProviderQuery>(
      environment,
      authProviderQuery,
      {},
    );

    observable.subscribe({
      next: (data) => {
        setUser(data.me);
      },
    });
  }, [authUser]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
