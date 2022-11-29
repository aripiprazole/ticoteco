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
import {graphql, useMutation} from 'react-relay';

import {useFormik} from 'formik';

import {Button, chakra, Input} from '@chakra-ui/react';

import {PostAddCommentMutation} from '../__generated__/PostAddCommentMutation.graphql';

export const postAddCommentMutation = graphql`
  mutation PostAddCommentMutation($input: CommentPostInput!) {
    commentPost(input: $input) {
      post {
        id
        comments {
          id
          content
          profile {
            id
            avatar
            username
            displayName
          }
        }
      }
    }
  }
`;

export type PostAddCommentProps = {
  readonly postId: string;
};

function PostAddComment(props: PostAddCommentProps) {
  const {postId} = props;

  const [comment, isCommenting] = useMutation<PostAddCommentMutation>(
    postAddCommentMutation,
  );

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values) => {
      comment({
        variables: {
          input: {
            id: postId,
            content: values.content,
          },
        },
      });
    },
  });

  return (
    <chakra.form
      borderTop='1px solid #ccc'
      display='flex'
      gap='0.5rem'
      mt='auto'
      padding='3rem 1.5rem'
      background='#fff'
      onSubmit={formik.handleSubmit}
      sx={{
        flexDirection: 'column',
      }}
    >
      <Input
        id='content'
        placeholder='Write your comment...'
        height='4rem'
        value={formik.values.content}
        onChange={formik.handleChange}
      />

      <Button type='submit' colorScheme='green' disabled={isCommenting}>
        Comment
      </Button>
    </chakra.form>
  );
}

export default PostAddComment;
