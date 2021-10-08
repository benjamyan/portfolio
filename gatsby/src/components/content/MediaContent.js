import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ImageMedia, VideoMedia } from '../media';

const MediaContentStyled = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    video, img {
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }
`;
const MediaContentAsset = ({ asset }) => {
  if (asset.video && asset.video.length > 0) {
    return <VideoMedia video={asset.video} />;
  }
  return <ImageMedia image={asset.image} />;
};

export default function MediaContent({ sbAsset }) {
  return (
    <MediaContentStyled className={'media-content'}>
      <MediaContentAsset asset={sbAsset[0]} />
    </MediaContentStyled>
  );
}

MediaContent.propTypes = {
  sbAsset: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const storyblok = [
  {
    name: 'atomic_content_media_content',
    display_name: 'Media Block',
    id: 1843316,
    schema: {
      sbAsset: {
        type: 'bloks',
        keys: [
          'image',
          'video'
        ],
        restrict_components: true,
        component_whitelist: [
          'misc_single_image_media',
          'misc_single_video_url'
        ],
        maximum: 1,
        display_name: 'Media asset',
        pos: 1,
        required: true
      }
    },
    preview_field: 'image',
    is_root: false,
    is_nestable: true,
    component_group_uuid: 'b3789d13-e842-4ae2-b945-c0c69789198e',
    component_group_name: 'Atomic'
  }
];
