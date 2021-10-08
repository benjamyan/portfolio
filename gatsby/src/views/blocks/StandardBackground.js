import React from 'react';
import styled from 'styled-components';
import { settingsResolver } from '../..';
import { MediaContent } from '../../components/content';
import PropTypes from 'prop-types';

const StandardBackgroundStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -999;
    overflow: hidden;
    ${ (props) => props.backgroundSettings}
`;
const BackgroundMediaContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  img, video,
  * img, * video {
      min-width: 100%;
      max-height: unset;
  }
`;

const BackgroundMedia = ({ media }) => {
  return (
    <BackgroundMediaContainer>
      <MediaContent {...media} />
    </BackgroundMediaContainer>
  );
};

export default function StandardBackground({ background }) {
	const {
		media,
    backgroundSettings = ''
	} = background;
	return (
    <StandardBackgroundStyle backgroundSettings={ settingsResolver(backgroundSettings) }>
			{ media.length > 0 && 
				<BackgroundMedia media={media[0]} />
			}
			<div />
		</StandardBackgroundStyle>
	);
}

BackgroundMedia.propTypes = {
  media: PropTypes.object.isRequired,
};
StandardBackground.propTypes = {
  background: PropTypes.object.isRequired,
};

export const storyblok = [
  {
    name: 'views_blocks_standard_background',
    display_name: 'Background content',
    id: 1843324,
    schema: {
      media: {
        type: 'bloks',
        maximum: '1',
        restrict_components: true,
        required: false,
        component_whitelist: ['atomic_content_media_content']
      }
    },
    is_root: false,
    is_nestable: true,
    real_name: 'Background content',
    component_group_uuid: 'eee899c0-2dac-47c4-ac65-32fbd8147882',
    component_group_name: 'Views'
  }
];
