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

import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';

import UserModel from './UserModel';

import ProfileType from '../profile/ProfileType';
import ProfileModel from '../profile/ProfileModel';

const UserType = new GraphQLObjectType<UserModel>({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user._id.toString(),
    },
    profile: {
      type: new GraphQLNonNull(ProfileType),
      resolve: (user) => ProfileModel.findById(user.profile),
    },
  }),
});

export default UserType;
