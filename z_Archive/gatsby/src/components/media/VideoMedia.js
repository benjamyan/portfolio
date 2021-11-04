import React from 'react';
import PropTypes from 'prop-types';
import { getRandomString } from '../../helpers/utils';

const videoBlock = {
	youtube() {
		// TODO
	},
	vimeo() {
		// TODO
	},
	html(content, settings) {
		const VIDEO_SETTINGS = {
			autoplay: settings.media.start,
			loop: settings.media.loop,
			muted: (function () {
				if (settings.media.start) {
					return true;
				}
				return settings.media.mute;
			}()),
			controls: settings.media.controls
		};
		return (
			<video
				autoPlay={VIDEO_SETTINGS.autoplay}
				loop={VIDEO_SETTINGS.loop}
				muted={VIDEO_SETTINGS.muted}
				controls={VIDEO_SETTINGS.controls}
				src={ content.mp4 || content.ogg || content.webm }
				playsInline
				style={{ width: '100%' }}
			>
				<track
					src={content.subtitles ? content.subtitles : `${getRandomString()}.vtt`}
					kind="subtitles"
					srcLang="en"
					label="English"
				/>
				Sorry, your browser doesn't support embedded videos.
			</video>
		);
	}
};

export default function VideoMedia(props) {
	/*
	TODO :
	run a check for the type of extension held within props.content src key
	*/
	return (
		<>{ videoBlock.html(props.content, props.settings) }</>
	);
}

VideoMedia.propTypes = {
	content: PropTypes.object,
	settings: PropTypes.object,
};

export const storyblok = [
	{
		name: 'misc_single_video_url',
		display_name: 'Video URL',
		id: 1843319,
		schema: {
			video: {
				type: 'multilink',
				required: true
			}
		},
		is_root: false,
		is_nestable: true,
		real_name: 'Video URL',
		component_group_uuid: 'af0b2c67-a839-4e1d-a1bc-98393ae16875',
		component_group_name: 'Misc.'
	}
];
