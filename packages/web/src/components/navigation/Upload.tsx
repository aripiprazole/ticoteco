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

import React, {useRef} from 'react';

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
  HStack,
  Flex,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';

import {useFormik} from 'formik';

import * as Yup from 'yup';

type UploadForm = {
  readonly title: string;
  readonly description: string;
  readonly video: File | null;
}

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

type DataInputsProps = {
  readonly formik: ReturnType<typeof useFormik<UploadForm>>;
};

function VideoInputs(props: DataInputsProps) {
  const {formik} = props;

  const inputRef = useRef<HTMLInputElement>();

  return (
    <Flex
      padding='0 1.5rem'
      height='100%'
      border='2px dashed #cecece'
      borderRadius='1rem'
      align='center'
      justify='center'
    >
      <VStack>
        <Heading as='h3' fontSize='1.2rem'>
          Select video to upload
        </Heading>

        <chakra.span fontSize='0.85rem' color='#5c5c5c'>
          Only MP4
        </chakra.span>

        <Button onClick={() => inputRef.current.click()}>
          Select file
        </Button>

        <Input
          hidden
          ref={inputRef}
          type='file'
          name='video'
          onChange={formik.handleChange}
        />
      </VStack>
    </Flex>
  );
}

function DataInputs(props: DataInputsProps) {
  const {formik} = props;

  return (
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
  );
}

export default Upload;
