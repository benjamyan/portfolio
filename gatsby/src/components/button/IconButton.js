import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { settingsResolver } from '../..';

const StyledIconButton = styled.div`
	width: 35px;
	${ (props)=> props.settings }
`;
const WrappingLink = styled.a`
	width: auto;
`;
const IconImage = styled.img`
	width: auto;
	object-fit: contain;
`;

export default function IconButton({ icon, link, settings }) {
	return (
		<StyledIconButton settings={ settingsResolver(settings) }>
			<WrappingLink href={ link.url } target={'_blank'}>
				<IconImage src={ icon.filename } alt={ icon.alt } />
			</WrappingLink>
		</StyledIconButton>
	);
};

IconButton.propTypes = {
	link: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	icon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]).isRequired,
	settings: PropTypes.string
};
