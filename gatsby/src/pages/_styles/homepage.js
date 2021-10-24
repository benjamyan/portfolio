import { styles } from '../../';
const page = {
	placard: `#pagePlacard`,
	catalog: {
		headline: `data-catalog='headline'`,
		list: `data-catalog='list'`,
		image: `data-catalog='image'`,
		modal: `data-catalog='modal'`
	}
};
const placardStyles = `
	width: 30vw;
	top: 50px;
	right: 50px;
	z-index: 6 !important;
	background-color: white;
	> div {
		padding: 35px 35px 50px 75px;
		background-color: #${styles.colors.yellow.hex};
		.standard_button {
			background-color: #${styles.colors.yellowWhite.hex};
		}
	}
`;
const introStyles = `
	div[data-magictext='headline'] {
		position: relative;
		width: 90%;
		margin: 0 auto;
		> * {
			margin-right: auto;
			text-align: left;
			color: black;
			-webkit-text-stroke-color: black;
		}
		.headline_wrapper-h1 {
			width: auto;
			display: inline-block;
			padding: 125px 125px 125px 75px;
			background-color: #${styles.colors.yellow.hex};
			h1 {
				line-height: 1;
			}
		}
		h3 {
			margin-top: -125px;
			margin-left: 50px;
			> span:first-of-type {
				${styles.textH2}
				margin-right: 20px;
			}
		}
	}
`;
const catalogStyles = `
	padding-bottom: 0;
	div[${page.catalog.list}] {
		position: relative;
		z-index: 1;
		h2 {
			${styles.fonts.playfair}
			font-size: calc(7vw + (20 - 7) * ((99vw - 300px) / (1900 - 300)));
			line-height: 1;
			font-weight: 900;
			font-style: italic;
		}
		h2:not(:last-of-type) {
			padding-bottom: 150px;
		}
	}
	div[${page.catalog.image}] {
		width: 80vw;
		height: 80vh;
		top: 17.5vh;
		bottom: unset;
		right: 0;
		left: 0;
		margin: 0 auto;
		z-index: 0;
		> div:first-of-type {
			opacity: 1;
			background-color: rgba(9,179,175,0.75);
		}
	}
	&.active {
		.catalog-overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 9;
			background-color: rgba(0,0,0,0.5);
		}
		.pin-spacer {
			z-index: 10 !important;
			div[${page.catalog.image}] {
				width: calc(100vw - 100px) !important;
				height: calc(100vh - 100px) !important;
				max-width: unset !important;
				max-height: unset !important;
				left: 0 !important;
				margin: 0 auto !important;
				top: 51px !important;
				overflow: hidden;
				z-index: 11;
				background: white;
				div[${page.catalog.modal}] {
					overflow-y: scroll;
				}
			}
		}
	}
`;

export default (`
		main {
			background-color: #${styles.colors.yellowWhite.hex};
			#pagePlacard 	{ ${ placardStyles } }
			> #introduction { ${ introStyles } }
			> #catalog 		{ ${ catalogStyles } }
		}
	`);