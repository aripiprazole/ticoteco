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

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {graphql, useLazyLoadQuery, useMutation} from 'react-relay';

import {useFormik} from 'formik';

import {
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

import {PostQuery} from '../__generated__/PostQuery.graphql';
import {PostUpdateMutation} from '../__generated__/PostUpdateMutation.graphql';
import {PostDeleteMutation} from '../__generated__/PostDeleteMutation.graphql';

import {useMaybeUser} from '../auth/AuthContext';
import PostComment from './PostComment';
import PostAddComment from './PostAddComment';

const PostQuery = graphql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      description
      video
      comments {
        id
        content
        profile {
          id
          avatar
          username
        }
      }
      profile {
        id
        avatar
        displayName
        username
      }
    }
  }
`;

const PostUpdateMutation = graphql`
  mutation PostUpdateMutation($input: UpdatePostInput!) {
    updatePost(input: $input) {
      post {
        id
        title
        description
        video
        profile {
          id
          avatar
          username
          displayName
        }
      }
    }
  }
`;

const PostDeleteMutation = graphql`
  mutation PostDeleteMutation($input: DeletePostInput!) {
    deletePost(input: $input) {
      clientMutationId
    }
  }
`;

export type PostProps = {
  readonly postId: string;
};

function Post(props: PostProps) {
  const {postId} = props;

  const router = useRouter();
  const user = useMaybeUser();

  const videoRef = useRef<HTMLVideoElement>();

  const [editing, setEditing] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [updatePost, isUpdating] =
    useMutation<PostUpdateMutation>(PostUpdateMutation);
  const [deletePost, isDeleting] =
    useMutation<PostDeleteMutation>(PostDeleteMutation);
  const {post} = useLazyLoadQuery<PostQuery>(PostQuery, {id: postId});

  const formik = useFormik({
    initialValues: {
      title: post?.title ?? '',
      description: post?.description ?? '',
    },
    onSubmit: (values) => {
      updatePost({
        variables: {
          input: {
            id: post.id,
            title: values.title,
            description: values.description,
          },
        },
        onCompleted: () => {
          setEditing(false);
        },
      });
    },
  });

  useEffect(() => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [playing]);

  const isOwner = user?.profile?.id === post.profile.id;
  const diff =
    formik.values.title !== post.title ||
    formik.values.description !== post.description;

  function handleDeletePost() {
    deletePost({
      variables: {
        input: {id: post.id},
      },
      onCompleted: () => {
        router.push('/');
      },
    });
  }

  function handleEditPost() {
    if (!isOwner) return;
    if (diff) return;

    setEditing((editing) => !editing);
  }

  return (
    <HStack width='100%' height='100%' wrap='wrap'>
      <Flex
        background='#111'
        minWidth={{
          sm: '100%',
          md: 'calc(100% / 16 * 9)',
        }}
        height='100%'
        justify='center'
      >
        <chakra.video
          onClick={() => setPlaying((playing) => !playing)}
          ref={videoRef}
          sx={{
            width: 'calc(100% / 16 * 9)',
            height: '100%',
          }}
        >
          <chakra.source src={post.video} type='video/mp4' />
          Use an updated browser to play TicoTeco videos.
        </chakra.video>
      </Flex>

      <Flex direction='column' flex='1' height='100%' style={{margin: '0'}}>
        <HStack
          as='form'
          justify='space-between'
          padding='3rem 1.5rem'
          borderBottom='1px solid #ccc'
          background='#fff'
          {...({onSubmit: formik.handleSubmit} as any)}
        >
          <HStack
            width='100%'
            height='100%'
            mt='0.5rem'
            style={{margin: '0'}}
            justify='start'
            align='start'
          >
            <Link href={`/${post.profile.username}`}>
              <chakra.a>
                <Image
                  cursor='pointer'
                  src={post.profile.avatar}
                  aria-label={`${post.profile.username}'s avatar`}
                  height='4rem'
                  width='4rem'
                  borderRadius='50%'
                />
              </chakra.a>
            </Link>

            <VStack align='start' gap='0.5rem' width='100%'>
              <Heading fontSize='1.5rem' lineHeight='0.8'>
                {post.profile.username}{' '}
                <chakra.span fontSize='1rem' fontWeight={400}>
                  {post.profile.displayName}
                </chakra.span>
              </Heading>

              {editing ? (
                <VStack gap='0.5rem' width='80%'>
                  <Input
                    id='title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />

                  <Input
                    id='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </VStack>
              ) : (
                <Text fontSize='1rem'>
                  {post.title}{' '}
                  <chakra.span fontWeight={600}>{post.description}</chakra.span>
                </Text>
              )}
            </VStack>
          </HStack>

          <HStack gap='0.5rem'>
            {isOwner && (
              <IconButton
                aria-label='Edit post'
                colorScheme={editing ? 'red' : null}
                icon={<FiEdit />}
                onClick={handleEditPost}
              />
            )}

            {isOwner && (
              <IconButton
                aria-label='Delete post'
                colorScheme='red'
                icon={<FiTrash />}
                disabled={isDeleting}
                onClick={handleDeletePost}
              />
            )}

            {diff && (
              <Button type='submit' colorScheme='green' disabled={isUpdating}>
                Submit
              </Button>
            )}
          </HStack>
        </HStack>

        {post.comments.map((comment) => (
          <PostComment data={comment} key={comment.id} />
        ))}

        {user && <PostAddComment postId={post.id} />}
      </Flex>
    </HStack>
  );
}

export default Post;
