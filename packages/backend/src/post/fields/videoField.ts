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

import {GraphQLFieldConfig} from 'graphql/type';
import {GraphQLNonNull, GraphQLString} from 'graphql';
import TicoTecoContext from '../../graphql/TicoTecoContext';

export const videoField: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(GraphQLString),
  resolve: async (post, _, ctx: TicoTecoContext) => {
    const today = new Date();

    const [video] = await ctx.bucket.file(`posts/${post._id}.mp4`).get();
    const [publicUrl] = await video.getSignedUrl({
      action: 'read',
      expires: today.setDate(today.getDate() + 1),
    });

    return publicUrl;
  },
};
