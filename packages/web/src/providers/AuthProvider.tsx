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

import React, {PropsWithChildren, useState} from 'react';

import cookieCutter from 'cookie-cutter';

import {AuthContext} from '@/authentication/AuthContext';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from '@firebase/auth';

import '@/config/firebase';
import {AUTHORIZATION_KEY} from '@/relay';

export function AuthProvider({children}: PropsWithChildren) {
  const auth = getAuth();
  const [user, setUser] = useState<UserCredential>();

  async function login() {
    const credential = await signInWithPopup(auth, new GoogleAuthProvider());

    setUser(credential);

    cookieCutter.set(AUTHORIZATION_KEY, await credential.user.getIdToken());
  }

  return (
    <AuthContext.Provider value={{user, login}}>
      {children}
    </AuthContext.Provider>
  );
}
