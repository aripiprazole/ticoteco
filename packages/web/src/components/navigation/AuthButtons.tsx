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

import React from 'react';

import {Box, Button, Flex, Image} from '@chakra-ui/react';

import {useAuth} from '../../auth/AuthContext';

import Upload from './upload/Upload';

function AuthButtons() {
  const {user, login} = useAuth();

  if (!user) {
    return (
      <Box>
        <Button onClick={login}>Login</Button>
      </Box>
    );
  }

  return (
    <Flex gap='1rem'>
      <Upload />

      <Image
        aria-label={`${user.profile.username}'s avatar`}
        src={user.profile.avatar}
        cursor='pointer'
        height='2.4rem'
        width='2.4rem'
        border='1px solid #1c1c1c'
        borderRadius='50%'
      />
    </Flex>
  );
}

export default AuthButtons;
