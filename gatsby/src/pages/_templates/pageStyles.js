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
				overflow: hidden;
				* {
					// transition: 0.35s;
				}
				div[${catalog.list}] {
					h2:not(:last-of-type) {
						padding-bottom: 150px;
					}
				}
				div[${catalog.image}] {
					transition: 0.25s;
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
					// > * {
					// 	transition: 0.35s;
					// }
				}
				&.active {
					.catalog-overlay {
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						z-index: 10;
						background-color: rgba(0,0,0,0.5);
					}
					div[${catalog.image}] {
						width: calc(100vw - 150px);
						height: calc(100vh - 100px);
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
	`);
}()

export {
	homepage
}