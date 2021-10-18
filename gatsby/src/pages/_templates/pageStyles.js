const homepage = `
	main {
		section {
			div[data-keyname='project-list'] {
				h2:not(:last-of-type) {
					padding-bottom: 150px;
				}
			}
			div[data-keyname='project-image'] {
				height: auto;
				&.active {
					width: calc(100vw - 200px);
					height: 100%;
					overflow: scroll;
					div[data-catalog='modal'] {

					}
				}
			}
		}
	}
`;

export {
	homepage
}