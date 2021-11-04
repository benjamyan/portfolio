import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextWrapper = styled.div``;

export default function TextContent({ sbCopy, settings = '', htmlAttrs={} }) {
	return (
    <TextWrapper 
      {...htmlAttrs}
      className={'text_content'}
      settings={ settingsResolver(settings) }>
        { RichtextResolver(sbCopy) }
		</TextWrapper>
	);
};

TextContent.propTypes = {
	sbCopy: PropTypes.object,
  settings: PropTypes.string,
  htmlAttrs: PropTypes.object
};
