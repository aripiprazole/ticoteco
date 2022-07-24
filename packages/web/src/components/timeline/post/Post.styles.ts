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
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  
  h4 {
    font-weight: normal;
  }
`;

export const PostPreview = styled.img`
  --preview-width: 20rem;
  
  width: var(--preview-width);
  height: calc(var(--preview-width) / 9 * 16);
  
  border-radius: 0.5rem;
`;

export const PostActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  justify-content: end;
`;

export const ActionButton = styled.button`
  outline: none;
  border: none;
  border-radius: 50%;
  
  background: #e1e1e1;
  padding: 1rem;
  
  font-size: 1.5rem;
  
  cursor: pointer;
  
  display: flex;
  align-items: center;
`;

export const Like = styled(ActionButton)``;

export const Comment = styled(ActionButton)``;

export const Share = styled(ActionButton)``;

export const PostVideo = styled.div`
  display: flex;
  gap: 0.5rem;
`;
