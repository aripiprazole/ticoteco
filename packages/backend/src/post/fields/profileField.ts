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
import {GraphQLNonNull} from 'graphql';
import ProfileType from '../../profile/ProfileType';
import UserModel from '../../user/UserModel';
import ProfileModel from '../../profile/ProfileModel';

export const profileField: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(ProfileType),
  resolve: async (post) => {
    const user = await UserModel.findById(post.user);
    const profile = await ProfileModel.findById(user.profile);

    return profile;
  },
};
