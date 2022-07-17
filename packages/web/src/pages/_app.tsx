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

import Cookies from 'cookies';

import {GlobalStyle} from '@ticoteco/ui';

import buildRelayEnvironment, {AUTHORIZATION_KEY} from '@/relay';
import {AuthProvider} from '@/providers/AuthProvider';

export type TicoTecoAppProps = {
  readonly authorization: string;
};

function App({
  Component,
  pageProps,
  authorization,
}: AppProps & TicoTecoAppProps) {
  return (
    <RelayEnvironmentProvider
      environment={buildRelayEnvironment(authorization)}
    >
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </RelayEnvironmentProvider>
  );
}

App.getInitialProps = async ({ctx}: AppContext): Promise<TicoTecoAppProps> => {
  const cookies = new Cookies(ctx.req, ctx.res);

  return {authorization: cookies.get(AUTHORIZATION_KEY)};
};

export default App;
