import React from 'react';
import styled from 'styled-components';
import { Error } from '../..';
import PropTypes from 'prop-types';

const ImageMediaStyle = styled.img.attrs(
  (props) => ({
    src: props.src,
    alt: props.alt,
  }),
)`
    max-width: 100%;
`;

export default function ImageMedia({ image }) {
  if (image.filename) {
    return (
      <ImageMediaStyle
        src={image.filename}
        alt={image.alt}
      />
    );
  }
  return <Error message="Image file not present." />;
}

ImageMedia.propTypes = {
  image: PropTypes.object.isRequired,
};

export const storyblok = [
  {
    name: 'misc_single_image_media',
    display_name: 'Image media asset',
    id: 1843318,
    schema: {
      image: {
        type: 'asset',
        filetypes: ['images']
      }
    },
    is_root: false,
    is_nestable: true,
    real_name: 'Image media asset',
    component_group_uuid: 'af0b2c67-a839-4e1d-a1bc-98393ae16875',
    component_group_name: 'Misc.'
  }
];
