import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Navigate = styled.nav`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	margin: 0 auto;
`;

export default function CatalogNavigation({ ...props }) {
	return (
		<Navigate id="catalog" {...props}>
			<Link to="/surf-air">Surf Air</Link>
			<Link to="/something-else-here">Something else Here</Link>
			<Link to="/mycology">MyCology</Link>
		</Navigate>
	)
}
