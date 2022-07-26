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

import {FiUpload} from 'react-icons/fi';

import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import {useFormik} from 'formik';

import * as Yup from 'yup';

type UploadForm = {
  readonly title: string;
  readonly description: string;
}

function Upload() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const formik = useFormik<UploadForm>({
    validationSchema: Yup.object({
      title: Yup.string().required().min(4).max(32),
      description: Yup.string().min(0).max(32),
    }),
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (values) => {
      console.log('success', values);
    },
  });

  return (
    <>
      <IconButton
        aria-label='Upload video'
        icon={<FiUpload size='1.2rem' />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <chakra.form>
            <ModalHeader>Upload a video</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack gap='0.5rem'>
                <FormControl isInvalid={Boolean(formik.errors.title)}>
                  <FormLabel>Title</FormLabel>

                  <Input
                    name='title'
                    title='Title'
                    placeholder='Title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.title && (
                    <FormErrorMessage>
                      {formik.errors.title}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={Boolean(formik.errors.description)}>
                  <FormLabel>Description</FormLabel>

                  <Input
                    name='description'
                    title='Description'
                    placeholder='Description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.description && (
                    <FormErrorMessage>
                      {formik.errors.description}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button ml='auto' type='submit'>Upload</Button>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Upload;
