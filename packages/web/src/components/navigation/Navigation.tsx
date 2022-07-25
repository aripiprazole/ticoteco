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
import {FiBox} from 'react-icons/fi';

import {Box, Flex} from '@chakra-ui/react';

import Search from './search/Search';
import AuthButtons from './AuthButtons';

export function Navigation() {
  return (
    <Box
      background='#fefefe'
      padding='1rem 0.5rem'
      borderBottom='1px solid #e6e6e6'
    >
      <Flex
        as='nav'
        margin='auto'
        width='100%'
        maxWidth='80rem'
        justify='space-between'
        align='center'
      >
        <Flex gap='0.2rem' align='center' fontSize='1.5rem'>
          <FiBox /> {/* TODO: create ticoteco's logo */}
          ticoteco
        </Flex>

        <Search />

        <AuthButtons />
      </Flex>
    </Box>
  );
}
