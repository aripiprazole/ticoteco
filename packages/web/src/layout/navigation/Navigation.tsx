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

import {Box, Flex, Image} from '@chakra-ui/react';

import Search from './Search';
import AuthButtons from './AuthButtons';

function Navigation() {
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
        <Image alt='TikTok' src='/tiktok.png' height='3rem' />

        <Search />

        <AuthButtons />
      </Flex>
    </Box>
  );
}

export default Navigation;
