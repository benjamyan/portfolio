import styled from 'styled-components';

const StyledHeaderNavigation = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	img {
		display: none;
		width: 35px;
	}
	nav {
		padding: 15px;
		ul {
			list-style: none;
			display: flex;
			justify-content: space-between;
			li {
				list-style-type: none;
				padding: 5px 20px;
				margin: 0;
				background: black;
				p {
					font-size: 12px;
					font-weight: 600;
					letter-spacing: 3px;
					text-transform: uppercase;
					color: white;
					white-space: nowrap;
				}
			}
		}
	}
`;

export {
	StyledHeaderNavigation
}