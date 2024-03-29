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
import {AppProps} from 'next/app';

import {ChakraProvider} from '@chakra-ui/react';

import 'firebaseui/dist/firebaseui.css';

import theme from '../theme';
import initAuth from '../auth/initAuth';
import RelayProvider from '../relay/RelayProvider';
import {useMaybeAuthUser} from '../auth/authHooks';

initAuth();

function App(props: AppProps) {
  const {_user, _idToken} = props.pageProps;

  const authUser = useMaybeAuthUser();
  const [idToken, setIdToken] = useState(_idToken);

  useEffect(() => {
    authUser?.getIdToken()?.then(setIdToken);
  }, [authUser]);

  return (
    <ChakraProvider theme={theme}>
      <RelayProvider preloadedUser={_user} idToken={idToken} {...props} />
    </ChakraProvider>
  );
}

export default App;
