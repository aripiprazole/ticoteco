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

import {useFormik} from 'formik';

import {
  Button,
  chakra,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import * as Yup from 'yup';

import VideoInputs from './VideoInputs';
import DataInputs from './DataInputs';

import UploadForm from './UploadForm';

function Upload() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const formik = useFormik<UploadForm>({
    validationSchema: Yup.object({
      title: Yup.string().required().min(4).max(32),
      description: Yup.string().min(0).max(32),
      video: Yup.mixed().required(),
    }),
    initialValues: {
      title: '',
      description: '',
      video: null,
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

        <ModalContent maxHeight='40rem' maxWidth='50rem'>
          <chakra.form>
            <ModalHeader>Upload a video</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <HStack gap='1rem' height='20rem' align='start'>
                <VideoInputs formik={formik} />

                <DataInputs formik={formik} />
              </HStack>
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