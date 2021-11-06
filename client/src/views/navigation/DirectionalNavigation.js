import React from 'react';
import styled from 'styled-components';

const Navigate = styled.nav`
	position: absolute;
	bottom: 0;
	right: 0;
	width: 300px;
	height: 70px;
	> ul {
		width: 100%;
		height: 100%;
		li {
			width: 50%;
			height: 100%;
			display: inline-block;
			line-height: 70px;
			text-align: center;
			background-color: blue;
			&::before {
				color: white;
				font-size: 30px;
			}
			&[data-navigate='-1']::before {
				content: '<'
			}
			&[data-navigate='1']::before {
				content: '>'
			}
		}
	}
`;

export default function DirectionalNavigation({ ...props }) {
	return (
		<Navigate id="directional" {...props}>
			<ul>
				<li data-navigate="-1" />
				<li data-navigate="1" />
			</ul>
		</Navigate>
	)
}
