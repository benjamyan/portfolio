import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { styles } from '../../';

const StyledStandardButton = styled.div`
	position: relative;
	width: 260px;
	width: -moz-fit-content;
	width: fit-content;
	min-width: 200px;
	height: 40px;
	border: 2px solid #000;
	vertical-align: top;
	color: #fff;
	background-color: transparent;
	> a {
		display: inline-block;
		width: 100%;
		padding: 0 15px;
		text-align: center;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 1.5px;
		line-height: 35px;
		color: black;
		vertical-align: top;
		border: none;
		cursor: pointer;
		${ styles.fonts.robotoMono }
	}
`;

export default function StandardButton({ text, link, target, className }) {
	return (
		<StyledStandardButton className={`${className} standard_button`}>
			<a href={link} target={target}>{text}</a>
		</StyledStandardButton>
	);
}

StandardButton.propTypes = {
	copy: PropTypes.string,
	link: PropTypes.string,
	target: PropTypes.string,
};
