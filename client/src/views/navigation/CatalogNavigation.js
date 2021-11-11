import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { styles } from '../../';

const Navigate = styled.nav`
	display: none;
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	margin: 0 auto;
	padding-top: 40vh;
	z-index: 2;
	> a {
		${styles.fonts.playfair}
		font-size: 6em;
		font-weight: 900;
		font-style: italic;
		line-height: 1;
		width: fit-content;
		display: block;
		margin: 0 auto 150px;
	}
`;

export default function CatalogNavigation({ ...props }) {
	return (
		<Navigate id="catalog" {...props}>
			<Link to="/surfair">Surf Air</Link>
			<Link to="/something-else-here">Something else Here</Link>
			<Link to="/mycology">MyCology</Link>
		</Navigate>
	)
}
