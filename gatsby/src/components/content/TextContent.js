import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichtextResolver, settingsResolver } from '../..';

const TextWrapper = styled.div`
	${ (props)=> props.settings }
`;

export default function TextContent({ sbCopy, settings = '' }) {
	return (
    <TextWrapper 
      className={'text-content'} 
      settings={ settingsResolver(settings) }>
        { RichtextResolver(sbCopy) }
		</TextWrapper>
	);
};

TextContent.propTypes = {
	sbCopy: PropTypes.object,
  settings: PropTypes.string
};

export const storyblok = [
  {
    name: 'atomic_content_text_content',
    display_name: 'Text Block',
    id: 1843317,
    schema: {
      sbCopy: {
        type: 'richtext',
        pos: 0,
        customize_toolbar: true,
        toolbar: [
          'bold',
          'italic',
          'strike',
          'underline',
          'paragraph',
          'h1',
          'h2',
          'h5',
          'h4',
          'h3',
          'list',
          'olist',
          'quote',
          'link'
        ],
        display_name: 'Richtext editor'
      }
    },
    is_root: false,
    preview_tmpl: '{{copy.content[0].content[0].text}}...',
    is_nestable: true,
    real_name: 'Text Block',
    component_group_uuid: 'b3789d13-e842-4ae2-b945-c0c69789198e',
    component_group_name: 'Atomic'
  }
];
