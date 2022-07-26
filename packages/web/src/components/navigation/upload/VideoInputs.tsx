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

import {useFormik} from 'formik';

import {Button, chakra, Flex, Heading, Input, VStack} from '@chakra-ui/react';

import UploadForm from './UploadForm';

type VideoInputsProps = {
  readonly formik: ReturnType<typeof useFormik<UploadForm>>;
};

function VideoInputs(props: VideoInputsProps) {
  const {formik} = props;

  const inputRef = useRef<HTMLInputElement>();

  const isUploaded = formik.values.video !== null;

  return (
    <Flex
      padding='0 1.5rem'
      height='100%'
      border='2px dashed #cecece'
      borderColor={isUploaded ? 'lightskyblue' : '#cecece'}
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

        <Button
          colorScheme={isUploaded ? 'blue' : 'gray'}
          onClick={() => inputRef.current.click()}
        >
          {isUploaded ? 'Change video' : 'Select video'}
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

export default VideoInputs;
