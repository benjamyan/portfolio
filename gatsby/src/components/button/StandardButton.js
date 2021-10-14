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
	border-radius: 7.5px;
	border: 2px solid #000;
	vertical-align: top;
	color: #fff;
	background-color: transparent;
	a {
		display: inline-block;
		width: 100%;
		padding: 0 15px;
		text-align: center;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 1px;
		line-height: 35px;
		color: black;
		vertical-align: top;
		border: none;
		cursor: pointer;
		${ (props)=> props.fontFamily }
	}
`;

export default function StandardButton({ copy, link, target }) {
	return (
		<StyledStandardButton fontFamily={ styles.fonts.robotoMono.trim() }>
			<a href={link} target={target}>
				{ copy }
			</a>
		</StyledStandardButton>
	);
}

StandardButton.propTypes = {
	copy: PropTypes.string,
	link: PropTypes.string,
	target: PropTypes.string,
};

export const storyblok = [
	{
		name: 'atomic_button_basic_button',
		display_name: 'Basic CTA button',
		id: 1843312,
		schema: {
			link: {
				type: 'text',
				pos: 1,
				description: 'Link for the button. Can be internal, external, or an anchor tag. If you are using an external link, be sure to use the whole link.',
				default_value: '#',
				required: true
			},
			target: {
				type: 'option',
				pos: 2,
				description: 'Link behavior',
				default_value: '_blank',
				use_uuid: true,
				exclude_empty_option: true,
				options: [
				{
					value: '_blank',
					name: 'Open in new tab'
				},
				{
					value: '_self',
					name: 'Open in same tab'
				}
				],
				required: true
			},
			copy: {
				type: 'text',
				pos: 3,
				required: true,
				description: 'The copy that the user will see.',
				default_value: '#',
				display_name: 'Button copy'
			}
		},
		preview_field: 'copy',
		preview_tmpl: '{{copy}} - {{link}}',
		is_root: false,
		is_nestable: true,
		real_name: 'Basic CTA button',
		component_group_uuid: 'b3789d13-e842-4ae2-b945-c0c69789198e',
		component_group_name: 'Atomic'
	}
];
