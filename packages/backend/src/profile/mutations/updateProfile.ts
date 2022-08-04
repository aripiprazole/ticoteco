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

import {GraphQLNonNull, GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import TicoTecoContext from '../../graphql/TicoTecoContext';

import * as Yup from 'yup';

import ProfileType from '../ProfileType';
import ProfileModel from '../ProfileModel';

export type UpdateProfileArgs = {
  readonly username: string;
  readonly displayName: string;
};

const updateProfileSchema = Yup.object({
  username: Yup.string().required().min(4).max(32),
  displayName: Yup.string().min(0).max(32),
});

export const updateProfileMutation = mutationWithClientMutationId({
  name: 'UpdateProfile',
  inputFields: {
    username: {type: new GraphQLNonNull(GraphQLString)},
    displayName: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: () => ({
    profile: {
      type: new GraphQLNonNull(ProfileType),
      resolve: ({profile}) => profile,
    },
  }),
  mutateAndGetPayload: async (
    args: UpdateProfileArgs,
    ctx: TicoTecoContext,
  ) => {
    const {username, displayName} = args;

    await updateProfileSchema.validate(args);

    const profile = await ProfileModel.findById(ctx.user.profile);
    profile.username = username;
    profile.displayName = displayName;
    await profile.save();

    return {profile};
  },
});
