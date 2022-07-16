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

import {Schema, model, connect} from 'mongoose';

type User = {
  readonly name: string,
  readonly email: string,
  readonly avatar?: string,
};

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  avatar: String,
});

const User = model<User>('User', userSchema);

export async function connectToMongo() {
  await connect(process.env.MONGO_URI);

  const user = new User({
    name: 'Gabrielle',
    email: 'contact@devgabi.me',
    avatar: 'https://avatars1.githubusercontent.com/u/527098?s=460&v=4',
  });

  user.save();
}
