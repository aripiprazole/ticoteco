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

import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import graphqlUpload from 'graphql-upload-cjs';

import graphqlUploadKoa = graphqlUpload.graphqlUploadKoa;

import {graphqlHTTP, Options} from 'koa-graphql';

import {Logger} from 'tslog';

import schema from './graphql/schema.js';
import {TicoTecoAppData} from './app.js';
import TicoTecoContext from './graphql/TicoTecoContext.js';
import findCurrentUser from './user/findCurrentUser.js';

const log = new Logger({name: '@ticoteco/backend/server'});

export function createServer(appData: TicoTecoAppData): Koa {
  const app = new Koa();
  const router = new Router();

  const setupGraphql: Options = async (req) => {
    const firebase = appData.firebase;
    const bucket = firebase.storage().bucket(process.env.STORAGE_BUCKET);

    const currentUser = await findCurrentUser(appData)(req);

    return {
      schema,
      graphiql: true,
      pretty: true,
      context: <TicoTecoContext>{
        user: currentUser,
        firebase: firebase,
        bucket,
      },
    };
  };

  const handleErrors: Router.Middleware = async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      log.fatal(err);

      throw err;
    }
  };

  router.use(handleErrors);
  router.all('/graphql', graphqlHTTP(setupGraphql));

  app.use(cors());
  app.use(graphqlUploadKoa({maxFileSize: 10000000, maxFiles: 10}));
  app.use(bodyparser());
  app.use(router.routes());

  return app;
}
