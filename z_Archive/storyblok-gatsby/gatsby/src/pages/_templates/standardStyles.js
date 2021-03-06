const homepage = function(){
	const page = {
		placard: `#pagePlacard`,
		catalog: {
			list: `data-catalog='list'`,
			image: `data-catalog='image'`,
			modal: `data-catalog='modal'`
		}
	}
	const _catalog = page.catalog;
	return (`
		main {
			#pagePlacard {
				width: 40vw;
				top: 50px;
				right: 50px;
				z-index: 6 !important;
			}
			> #introduction {
				
			}
			> #catalog {
				padding-bottom: 0;
				div[${_catalog.list}] {
					h2:not(:last-of-type) {
						padding-bottom: 150px;
					}
				}
				div[${_catalog.image}] {
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
						div[${_catalog.image}] {
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
							div[${_catalog.modal}] {
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