import React from 'react';
import styled from 'styled-components';
import { styles } from './';
import { utils, ComponentResolver, settingsResolver } from '../..';
import PropTypes from 'prop-types';

const StyledStandardContent = styled.div`
    h1, h2, h3, h4, h5 {
        padding-bottom: 10px;
    }
    p {
        padding-bottom: 20px;
    }
    *:last-child {
        padding-bottom: 0;
    }
	${ (props)=> props.theme === 'card' && `
		${ styles.contentBlockCardView }
	`}
	${ (props) => props.settings }
`;

function ResolvedContent({ content }) {
	return content.map( 
		(item)=> (
			<ComponentResolver componentProps={item} key={utils.getRandomString()} />
		)
	);
};

export default function StandardContent({ ...contentProps }) {
	const {
		content = [], 
		contentTheme = '',
		contentSettings = ''
	} = contentProps;
	if (Array.isArray(content) && content.length > 0) {
		return (
			<StyledStandardContent 
				className={'standard-content'} 
				theme={ contentTheme }
				settings={ settingsResolver(contentSettings) }>
					<ResolvedContent content={ content } />
			</StyledStandardContent>
		);
	};
	return <></>;
};

StandardContent.propTypes = {
  content: PropTypes.array,
  contentTheme: PropTypes.string,
  contentSettings: PropTypes.string
};

export const storyblok = [
  {
    name: 'views_blocks_standard_content',
    display_name: 'Standard content',
    id: 1843325,
    schema: {
      content: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: [
          'atomic_content_text_content',
          'atomic_content_media_content',
          'atomic_button_basic_button'
        ],
        required: true,
        pos: 0
      }
    },
    is_root: false,
    is_nestable: true,
    real_name: 'Standard content',
    component_group_uuid: 'eee899c0-2dac-47c4-ac65-32fbd8147882',
    component_group_name: 'Views'
  },
  {
    name: 'views_blocks_single_column_content',
    display_name: 'Standard content',
    id: 1843325,
    schema: {
      name: {
        type: 'text',
        pos: 0
      },
      settings: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['settings'],
        pos: 1
      },
      content: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: [
          'atomic_content_text_content',
          'atomic_content_media_content',
          'atomic_button_basic_button'
        ],
        pos: 2
      },
      tab1: {
        type: 'tab',
        display_name: 'Content',
        keys: ['content'],
        pos: 3
      },
      tab2: {
        type: 'tab',
        display_name: 'Background',
        keys: ['background'],
        pos: 4
      },
      background: {
        type: 'bloks',
        restrict_components: true,
        maximum: '1',
        component_whitelist: ['views_blocks_standard_background'],
        pos: 5
      }
    },
    preview_field: 'name',
    is_root: false,
    is_nestable: true,
    real_name: 'Standard content',
    component_group_uuid: 'eee899c0-2dac-47c4-ac65-32fbd8147882',
    component_group_name: 'Views'
  }
];
