const defaultTextStyling = `
	h1 {
		color: #09b3af;
		* {
			color: #09b3af;
			-webkit-text-stroke-color: #09b3af;
		}
	}
	h2 {
		color: black;
		* {
			color: black;
			-webkit-text-stroke-color: black;
		}
	}
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
		margin-top: calc(-2.5vw + 1.25px);
		margin-left: -0.5vw;
		z-index: -1;
		&:not(:last-of-type) {
			padding: 0 0 6vh 0;
		}
	}
`;
const floatingBox = `
	&& {
		min-width: 300px;
		height: 100%;
		display: block;
		padding: 4vw 5vw;
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
	}
`;

export {
	defaultTextStyling,
	floatingBox,
	bigHeadline,
	contentList
}