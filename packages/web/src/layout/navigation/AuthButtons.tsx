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
import Link from 'next/link';

import {Box, Button, chakra, Flex, Image} from '@chakra-ui/react';

import {useMaybeUser} from '../../auth/AuthContext';

import Upload from './upload/Upload';

function AuthButtons() {
  const user = useMaybeUser();

  if (!user) {
    return (
      <Box>
        <Link href='/login'>
          <Button>Login</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Flex gap='1rem'>
      <Upload />

      <Link href='/[username]' as={`/${user.profile.username}`}>
        <chakra.a>
          <Image
            aria-label={`${user.profile.username}'s avatar`}
            src={user.profile.avatar}
            cursor='pointer'
            height='2.4rem'
            width='2.4rem'
            border='1px solid #1c1c1c'
            borderRadius='50%'
          />
        </chakra.a>
      </Link>
    </Flex>
  );
}

export default AuthButtons;
