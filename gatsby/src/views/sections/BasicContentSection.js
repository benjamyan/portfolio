import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { StandardContent, StandardBackground } from '../blocks';

const BasicContentSectionStyle = styled.section`
	position: relative;
	width: 100%;
	height: auto;
	min-height: 100vh;
	padding: 100px 0;
	> * {
		height: 100%;
	}
`;
const StyledContent = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	margin: 0 auto;
`;

export default function BasicContentSection({ content, background }) {
	return (
		<BasicContentSectionStyle>
			<StyledContent>
				{ content.length > 0
					&& <StandardContent content={content}/>
				}
			</StyledContent>
			{ background.length > 0
				&& <StandardBackground background={background[0]} />
			}
		</BasicContentSectionStyle>
	);
};

BasicContentSection.propTypes = {
settings: PropTypes.object,
content: PropTypes.array.isRequired,
background: PropTypes.array,
};

export const storyblok = [
{
name: 'containers_sections_basic_content_section',
display_name: 'Single-column content section',
id: 1843327,
schema: {
	name: {
	type: 'text',
	pos: 0,
	required: true
	},
	background: {
	type: 'bloks',
	restrict_components: true,
	component_whitelist: [
		'views_blocks_standard_background'
	],
	pos: 2,
	maximum: '1',
	description: 'Background media for this specific section. Only one media type allowed; if more than one is present, it will default to last entered.'
	},
	content: {
	type: 'bloks',
	restrict_components: true,
	component_whitelist: [
		'views_blocks_multi_column_content',
		'atomic_content_text_content',
		'atomic_content_media_content',
		'atomic_button_basic_button',
		'atomic_content_list_content'
	],
	pos: 3
	},
	tab1: {
	type: 'tab',
	display_name: 'Content',
	keys: [
		'section_content',
		'content'
	]
	},
	tab2: {
	type: 'tab',
	display_name: 'Background',
	keys: [
		'section_background',
		'background'
	]
	}
},
preview_field: 'name',
is_root: false,
is_nestable: true,
real_name: 'Single-column content section',
component_group_uuid: 'ff1ca82b-ccb7-4009-8189-0d4bc0fbfbab',
component_group_name: 'Containers'
}
];
