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

import {useFormik} from 'formik';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

import UploadForm from './UploadForm';

export type DataInputsProps = {
  readonly formik: ReturnType<typeof useFormik<UploadForm>>;
};

function DataInputs(props: DataInputsProps) {
  const {formik} = props;

  return (
    <VStack gap='0.5rem' flex='1'>
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

export default DataInputs;
