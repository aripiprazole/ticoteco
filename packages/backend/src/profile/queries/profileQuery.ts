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

import ProfileType from '../ProfileType';
import ProfileModel from '../ProfileModel';

type ProfileArguments = {
  readonly username: string;
};

type ProfileQuery = GraphQLFieldConfig<any, TicoTecoContext, ProfileArguments>;

export const profileQuery: ProfileQuery = {
  type: ProfileType,
  args: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username of the profile',
    },
  },
  description: 'Get the profile of the queried user',
  resolve: async (_root, args) => {
    const {username} = args;

    return ProfileModel.findOne({username});
  },
};
