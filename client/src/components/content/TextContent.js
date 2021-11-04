import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { atomic } from '../../';

const TextWrapper = styled.div`
	> *:not(:last-child) {
		margin-bottom: 25px;
	}
`;

export default function TextContent({ text, htmlAttrs={} }) {
	console.log(text)
	return (
		<TextWrapper 
			{...htmlAttrs}
			className={'text_content'}>
				{ text.h4 &&
					<h4>{ text.h4 }</h4>	
				}
				{text.h5 &&
					<h5>{text.h5}</h5>
				}
				{text.p &&
					<p>{text.p}</p>
				}
				{ text.btn &&
					<atomic.StandardButton { ...text.btn } />
				}
		</TextWrapper>
	);
};

TextContent.propTypes = {
	sbCopy: PropTypes.object,
	settings: PropTypes.string,
	htmlAttrs: PropTypes.object
};
