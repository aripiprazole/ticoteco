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

import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem 0.5rem;
  background: #fefefe;
  border-bottom: 1px solid #e6e6e6;
`;

export const Logo = styled.span`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  
  font-size: 1.5rem;
`;

export const Nav = styled.nav`
  max-width: 80rem;
  width: 100%;
  margin: auto;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
