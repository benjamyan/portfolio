import React from 'react';
import styled from 'styled-components';
import { ComponentResolver, utils } from '../..';

const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: unset;
	z-index: 100;
	// img {
	// 	display: none;
	// 	width: 35px;
	// }
	nav {
		padding: 25px 0px 0px 10px;
		ul {
			list-style: none;
			li {
				list-style-type: none;
				width: auto;
				width: max-content;
				padding: 14px 70px 14px 20px;
				background: black;
				&:not(:first-child) {
					margin: 35px 0 0;
				}
				p {
					font-size: 15px;
					font-weight: 600;
					letter-spacing: 2px;
					color: white;
					text-transform: lowercase;
					white-space: nowrap;
				}
			}
		}
	}
`;

const headerContent = (body)=> {
	return body.map(
		(item) => <ComponentResolver componentProps={item} key={utils.getRandomString()} />
	);
};

export default function HeaderNavigation({ content }) {
	// console.log("-- HeaderNavigation");
	content = JSON.parse(content);
	try {
		return (
			<HeaderWrapper id="bydHeaderNav">
				{ headerContent(content.body) }
			</HeaderWrapper>
		);
	} catch (err) {
		console.log(err);
		return <></>;
	};
};
