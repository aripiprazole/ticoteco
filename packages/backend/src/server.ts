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
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import graphqlUploadKoa from 'graphql-upload/graphqlUploadKoa.mjs';

import {graphqlHTTP, OptionsData} from 'koa-graphql';

import schema from '@/graphql/schema';
import {TicoTecoAppData} from '@/app';
import TicoTecoContext from '@/graphql/TicoTecoContext';
import findCurrentUser from '@/users/findCurrentUser';

export function createServer(appData: TicoTecoAppData): Koa {
  async function setupGraphQLConnection(
      request: Request,
  ): Promise<OptionsData> {
    const currentUser = await findCurrentUser(appData)(request);

    return {
      schema,
      graphiql: true,
      pretty: true,
      context: <TicoTecoContext>{
        user: currentUser,
      },
    };
  }

  const app = new Koa();
  const router = new Router();

  router.all('/graphql', graphqlHTTP(setupGraphQLConnection));

  app.use(graphqlUploadKoa({maxFileSize: 10000000, maxFiles: 10}));
  app.use(cors());
  app.use(bodyparser());
  app.use(router.routes());

  return app;
}
