const defaultContainerStyling = `
	p, a, button {
		color: black;
		z-index: 1;
		* {
			vertical-align: unset;
		}
	}
	hr {
		position: relative;
		display: block;
		width: 100%;
		height: 10px;
		border: none;
	}
`;
const bigHeadline = `
	h1 {
		font-size: 10vw;
		line-height: calc(12vw + 2.5px);
		padding: 0;
		// margin-top: calc(-2.5vw + 1.25px);
		margin-left: -0.5vw;
		z-index: -1;
		&:not(:last-of-type) {
			padding: 0 0 6vh 0;
		}
	}
`;
const floatingBox = `
	&& {
		width: auto;
		height: 100%;
		display: block;
		padding: 25px 40px 75px 75px;
		border: 2px solid #333;
		background-color: white;
		h1, h2, h3, h4, h5 p {
			display: block;
		}
	}
`;
const contentList = `
	position: relative;
	width: 100%;
	h1, h2, h3, h4, h5, p {
		color: #000;
		padding-bottom: 150px;
		span {
			color: #000;
			-webkit-text-stroke-color: #000
		}
	}
`;
const defaultItem = `
	position: relative;
	width: 100%;
	height: 100%;
`;

export {
	defaultContainerStyling,
	floatingBox,
	bigHeadline,
	contentList,
	defaultItem
}