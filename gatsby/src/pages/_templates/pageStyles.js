const homepage = function(){
	const catalog = {
		placard: `data-catalog='placard'`,
		list: `data-catalog='list'`,
		image: `data-catalog='image'`,
		modal: `data-catalog='modal'`
	};
	return (`
		main {
			> #catalog {
				// overflow: hidden;
				padding-bottom: 0;
				div[${catalog.list}] {
					h2:not(:last-of-type) {
						padding-bottom: 150px;
					}
				}
				div[${catalog.image}] {
					width: 80vw;
					height: 80vh;
					top: 17.5vh;
					bottom: unset;
					right: 0;
					left: 0;
					margin: 0 auto;
					> div:first-of-type {
						opacity: 1;
						background-color: rgba(9,179,175,0.75);
					}
				}
				div[${catalog.placard}] {
					top: 30%;
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
					div[${catalog.list}],
					div[${catalog.placard}] {
						// z-index: -2;
					}
					.pin-spacer {
						z-index: 10 !important;
						div[${catalog.image}] {
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
							div[${catalog.modal}] {
								overflow-y: scroll;
							}
						}
					}
				}
			}
		}
	`);
}()

export {
	homepage
}