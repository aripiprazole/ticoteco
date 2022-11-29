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

import {GetServerSideProps} from 'next';
import {AuthUser, withAuthUserTokenSSR} from 'next-firebase-auth';
import {ParsedUrlQuery} from 'querystring';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next/types';
import preloadQuery from '../relay/preloadQuery';
import {authProviderQuery} from './AuthProvider';

export type TicoTecoGetServerSideProps<
  P extends {[key: string]: any} = {[key: string]: any},
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D> & {user: AuthUser},
) => Promise<GetServerSidePropsResult<P>>;

function withTicoTecoUser(f: TicoTecoGetServerSideProps): GetServerSideProps {
  return withAuthUserTokenSSR()(async (ctx) => {
    const user = ctx.AuthUser;
    const result = await f({user, ...ctx});
    const props = result['props'];

    if (!props) return result;

    return {
      props: {
        _idToken: await user.getIdToken(),
        _user: await preloadTicoTecoUser(ctx, user),
        ...props,
      },
    };
  });
}

async function preloadTicoTecoUser(ctx, user) {
  const {response} = await preloadQuery(ctx, user, authProviderQuery);

  // @ts-ignore
  return response?.data?.me;
}

export default withTicoTecoUser;
