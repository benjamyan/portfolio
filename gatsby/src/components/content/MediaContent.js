import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { settingsResolver } from '../..';
import { ImageMedia, VideoMedia } from '../';

const MediaContentStyled = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    video, img {
		width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }
    ${ ({overlay})=> ( overlay && `
		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			opacity: 0.${ overlay };
			background-color: var(--main-color);
		}
	`)}
    ${ ({settings})=> settings }
`;
const MediaContentAsset = ({ asset }) => {
	if (asset.video && asset.video.length > 0) {
		return <VideoMedia video={asset.video} />
	};
	if (asset.image && typeof asset.image === 'object') {
		return <ImageMedia image={asset.image} />
	};
	return <></>;
};

export default function MediaContent({ sbAsset, settings, overlay, htmlAttrs }) {
	try {
		if (sbAsset.length > 0) {
			return (
				<MediaContentStyled 
					{ ...htmlAttrs }
					settings={ settingsResolver(settings) }
					overlay={ overlay }
					className={'media-content'}>
						<MediaContentAsset asset={sbAsset[0]} />
				</MediaContentStyled>
			);
		};
		return <></>;
	} catch (err) {
		console.log(err);
		return <></>
	}
}

MediaContentAsset.propTypes = {
	asset: PropTypes.object
};
MediaContent.propTypes = {
	sbAsset: PropTypes.arrayOf(PropTypes.object).isRequired,
	settings: PropTypes.string,
	overlay: PropTypes.string,
	htmlAttrs: PropTypes.object
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
