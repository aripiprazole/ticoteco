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

import Comment from '../Comment';
import GraphQLProfile from '../../profile/types/GraphQLProfile';
import User from '../../user/User';
import Profile from '../../profile/Profile';

const GraphQLComment = new GraphQLObjectType<Comment>({
  name: 'Comment',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (comment) => comment._id.toString(),
    },

    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (comment) => comment.content,
    },

    profile: {
      type: new GraphQLNonNull(GraphQLProfile),
      resolve: async (comment) => {
        const user = await User.findById(comment.user);
        const profile = await Profile.findById(user.profile);

        return profile;
      },
    },
  }),
});

export default GraphQLComment;
