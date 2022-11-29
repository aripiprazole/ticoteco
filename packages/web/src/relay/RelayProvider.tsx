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

import React, {useMemo} from 'react';
import {NextComponentType, NextPageContext} from 'next';

import {RelayEnvironmentProvider, useRelayEnvironment} from 'react-relay';

import buildRelayEnvironment from './environment';
import {EkkoPreloadedQuery} from './preloadQuery';
import {AuthProvider} from '../auth/AuthProvider';

export type PreloadedQueryProps = {
  initialQueryRef: EkkoPreloadedQuery;
  [name: string]: any;
};

export type RelayProviderProps = {
  Component: NextComponentType<NextPageContext, any, any>;
  idToken: string;
  pageProps: PreloadedQueryProps;
};

function RelayProvider(props: RelayProviderProps) {
  const {Component, idToken} = props;

  const environment = useMemo(() => {
    return buildRelayEnvironment(idToken);
  }, [idToken]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Hydrate {...props}>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </Hydrate>
    </RelayEnvironmentProvider>
  );
}

function Hydrate(props: RelayProviderProps) {
  const {Component, pageProps} = props;

  const environment = useRelayEnvironment();

  const hydratedProps = useMemo(() => {
    if (!pageProps.initialQueryRef) return pageProps;

    const {initialQueryRef} = pageProps;
    const {params, variables, response} = initialQueryRef;

    const queryId = params.id || params.text;

    const hydratedQueryRef = {
      environment,
      fetchKey: queryId,
      fetchPolicy: 'store-or-network',
      isDisposed: false,
      name: params.name,
      kind: 'PreloadedQuery',
      variables,
    };

    environment
      .getNetwork()
      // @ts-ignore - seems to be a private untyped api
      .responseCache?.set(queryId, variables, response);

    return {...pageProps, initialQueryRef: hydratedQueryRef};
  }, [pageProps, environment]);

  return <Component {...hydratedProps} />;
}

export default RelayProvider;
