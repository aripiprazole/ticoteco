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

import React, {PropsWithChildren, useEffect, useState} from 'react';
import {useRelayEnvironment} from 'react-relay';

import {fetchQuery} from 'relay-runtime';

import graphql from 'babel-plugin-relay/macro';

import useCookieState from '../hooks/useCookieState.js';

import {AuthContext, AuthenticatedUser} from './AuthContext.js';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from '@firebase/auth';

import '../firebase.js';
import {AUTHORIZATION_KEY} from '../relay.js';

import {AuthProviderQuery} from '../__generated__/AuthProviderQuery.graphql.js';

const AuthProviderQuery = graphql`
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

export function AuthProvider({children}: PropsWithChildren) {
  const auth = getAuth();

  const environment = useRelayEnvironment();

  const [authKey, setAuthKey] = useCookieState(AUTHORIZATION_KEY);
  const [user, setUser] = useState<AuthenticatedUser>();

  useEffect(() => {
    fetchQuery<AuthProviderQuery>(environment, AuthProviderQuery, {})
        .subscribe({
          next: (data) => {
            setUser(data.me);
          },
        });
  }, [authKey]);

  async function login() {
    const credential = await signInWithPopup(auth, new GoogleAuthProvider());

    setAuthKey(await credential.user.getIdToken());
  }

  return (
    <AuthContext.Provider value={{user, login}}>
      {children}
    </AuthContext.Provider>
  );
}
