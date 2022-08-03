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

import {extendTheme, Theme} from '@chakra-ui/react';

const theme: Partial<Theme> = {
  styles: {
    global: () => ({
      '*': {
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
      },

      'html, body, #root, #__next': {
        height: '100%',
        width: '100%',
        minWidth: '25rem',
        fontSize: '14px',
      },

      'html, body, #root': {
        background: '#f3f3f3',
      },

      '*, input, button, select, textarea, optgroup, option': {
        fontFamily:
          "-apple-system, 'Montserrat', BlinkMacSystemFont," +
          " 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell'," +
          " 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },

      'button': {
        border: 'none',
        outline: 'none',
      },

      'a': {
        textDecoration: 'none',
      },

      'ul, li': {
        listStyle: 'none',
      },
    }),
  },
};

export default extendTheme(theme);
