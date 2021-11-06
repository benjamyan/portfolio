import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: unset;
	z-index: 100;
	.mobile {
		display: none;
	}
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
					margin: 30px 0 0;
				}
				p {
					font-size: 14px;
					font-weight: 600;
					letter-spacing: 2px;
					color: white;
					text-transform: lowercase;
					white-space: nowrap;
				}
				* {
					pointer-events: none;
				}
			}
		}
	}
`;

export default function HeaderNavigation({ ...props }) {
	try {
		return (
			<HeaderWrapper id="header" { ...props }>
				<div className={ 'mobile' } />
				<nav>
					<ul>
						<li data-navigate="portfolio"><p>portfolio</p></li>
						<li data-navigate="about"><p>about me</p></li>
						<li data-navigate="contact"><p>contact</p></li>
					</ul>
				</nav>
			</HeaderWrapper>
		);
	} catch (err) {
		console.log(err);
		return <></>;
	};
};
