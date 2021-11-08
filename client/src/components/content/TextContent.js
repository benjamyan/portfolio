import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextWrapper = styled.div`
	> *:not(:last-child) {
		margin-bottom: 25px;
	}
`;

export default function TextContent({ text, id, className, htmlAttrs={} }) {
	let finalText = '';
	for (const item in text) {
		if (item == 'h1' || item == 'h2' || item == 'h3' || item == 'h4' || item == 'h5' || item == 'p') {
			finalText = finalText + text[item]
		}
	}
	return (
		<TextWrapper 
			{...htmlAttrs}
			id={ id }
			className={'text_content', className}
			dangerouslySetInnerHTML={{ __html: finalText }} 
		/>
	);
};

TextContent.propTypes = {
	text: PropTypes.object,
	className: PropTypes.string,
	htmlAttrs: PropTypes.object
};
