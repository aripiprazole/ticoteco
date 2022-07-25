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

import {model, Schema, Types} from 'mongoose';

import ProfileModel, {profileSchema} from '@/profile/ProfileModel';

export const userSchema = new Schema<UserModel>({
  firebaseUid: {type: String, required: true},
  profile: {type: profileSchema, required: true},
});

type UserModel = {
  readonly _id: Types.ObjectId;
  readonly firebaseUid: string;
  readonly profile: ProfileModel;
};

const UserModel = model<UserModel>('User', userSchema);

export default UserModel;
