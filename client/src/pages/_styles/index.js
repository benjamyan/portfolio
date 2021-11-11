import { styles } from '../..';
const page = {
	headline: `#headline`,
	placard: `#placard`,
	magicbox: `#magicbox`,
	catalog: `#catalog`
};

export default (`
		width: 100%;
		height: 100vh;
		margin: 0 auto;
		overflow: hidden;
		background-color: rgb(${styles.colors.yellowWhite});
		&[data-page='initial'] {
			${page.magicbox} {
				// width: 450px;
				// height: 400px;
				z-index: 0;
			}
		}
		&[data-page='portfolio'] {
			${page.headline} {
				h2 {
					${styles.fonts.archivo}
					font-weight: 500;
					font-style: normal;
					color: transparent;
					-webkit-text-stroke: 2px black;
				}
			}
			${page.magicbox} {
				margin: 0 auto;
				z-index: 1;
			}
		}
		&[data-page='contact'] {}
		&[data-page='about'] {}
	`);