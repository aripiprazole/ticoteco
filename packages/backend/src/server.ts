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

import Koa, {Request} from 'koa';
import Router from '@koa/router';

import {graphqlHTTP, OptionsData} from 'koa-graphql';

import {createSchema} from '@/schema';
import TicoTecoContext from '@/graphql/TicoTecoContext';
import UserModel from '@/users/infra/UserModel';
import {TicoTecoAppData} from '@/app';

const setupGraphQLConnection = (appData: TicoTecoAppData) =>
  async (_request: Request): Promise<OptionsData> =>
    ({
      schema: createSchema(appData),
      graphiql: true,
      pretty: true,
      context: <TicoTecoContext>{
        user: new UserModel({
          displayName: 'Gabrielle',
          username: 'devgabi',
        }),
      },
    });

export function createServer(appData: TicoTecoAppData): Koa {
  const app = new Koa();
  const router = new Router();

  router.all('/graphql', graphqlHTTP(setupGraphQLConnection(appData)));

  app.use(router.routes());

  return app;
}
