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
import {AppContext, AppProps} from 'next/app';

import {RelayEnvironmentProvider} from 'react-relay';

import {ChakraProvider} from '@chakra-ui/react';

import Cookies from 'cookies';

import {theme} from '@ticoteco/ui';

import 'firebaseui/dist/firebaseui.css';

import buildRelayEnvironment, {AUTHORIZATION_KEY} from '../relay';
import initAuth from '../auth/initAuth';

export type TicoTecoAppProps = {
  readonly authorization?: string | null;
};

initAuth();

function App({
  Component,
  pageProps,
  authorization,
}: AppProps & TicoTecoAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RelayEnvironmentProvider
        environment={buildRelayEnvironment(authorization)}
      >
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </ChakraProvider>
  );
}

App.getInitialProps = async ({ctx}: AppContext): Promise<TicoTecoAppProps> => {
  if (!ctx.req || !ctx.res) return {authorization: null};

  const cookies = new Cookies(ctx.req, ctx.res);
  const authorization = cookies.get(AUTHORIZATION_KEY);

  if (!authorization) return {authorization: null};

  return {authorization};
};

export default App;
