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

import {graphql} from 'graphql/graphql';

import schema from '@/graphql/schema';
import User from '@/users/User';
import Profile from '@/profile/Profile';

describe('meQuery tests', () => {
  it('should return the current user', async () => {
    const query = `
      query MeQuery {
        me {
          id,
          profile {
            id,
            avatar
            username
            displayName
          }
        }
      }
    `;

    const currentUser = new User({
      profile: new Profile({
        avatarUrl: 'https://avatars0.githubusercontent.com/u/527098?s=460&v=4',
        username: 'devgabi',
        displayName: 'Gabrielle Guimarães',
      }),
    });

    const result = await graphql({
      schema,
      source: query,
      rootValue: {},
      variableValues: {},
      contextValue: {
        user: currentUser,
      },
    });

    expect(result.data.me).toEqual({
      id: currentUser._id.toString(),
      profile: {
        id: currentUser.profile._id.toString(),
        avatar: currentUser.profile.avatarUrl,
        username: currentUser.profile.username,
        displayName: currentUser.profile.displayName,
      },
    });
  });
});