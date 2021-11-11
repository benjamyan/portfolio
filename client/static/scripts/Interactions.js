const Timelines = {
	magicbox: new gsap.timeline({
		defaults: {
			duration: 1,
			ease: "power4.out"
		}
	})
};
const Interactions = {
	placard: {},
	catalog: {},
	magicbox: {
		tl: new gsap.timeline({
			duration: 5,
			delay: 0.15
		})
	},
	textSwap: {
		/**
		 * https://greensock.com/splittext/
		 * https://codepen.io/collection/KiEhr
		 * https://codepen.io/GreenSock/pen/bGEqbaQ
		 * 
		 * https://freefrontend.com/javascript-text-effects/
		 * 
		 * Rolling text upwards: https://codepen.io/gabrielcojea/pen/GRpZbZL
		 * Staggering text: https://codepen.io/alphardex/pen/BayEGXB
		 * Truly justified text block: https://codepen.io/reubenlillie/pen/xemGmd
		 * 3js text transform to shape: https://codepen.io/zadvorsky/pen/BKJQep
		 */
		conceal(node) {
			// console.log("conceal")
			// console.log(node)
			node.innerHTML = ''
			node.remove();
		},
		reveal(node) {
			// console.log("reveal")
			// console.log(node)
		},
		complete(node, nextText) {
			const self = this;
			Array.from(
					node.querySelectorAll('h1, h2, h3, h4, h5, p')
				).forEach(
					(textNode) => self.conceal(textNode)
				);
			Object.values(nextText).forEach(
				text => node.innerHTML += text
			)
			// for (const tag in nextText) {
			// 	const currentTextTagNode = node.querySelector(tag) || false;
			// 	if (currentTextTagNode) {
			// 		currentTextTagNode.innerHTML = (
			// 			nextText[tag].replace(`<${tag}>`, '').replace(`</${tag}>`, '')
			// 		);
			// 	} else {
			// 		node.innerHTML += nextText[tag]
			// 	}
			// }
		}
	}
};
const Transitions = {
	_universalPage() {
		// console.log("universal")
		const { textSwap } = Interactions;
		const { body } = window._byd.pages.initialData.index;
		if (_byd.pages.activePage.length > 1) {
			const nextPageData = body[_byd.pages.activePage.at(-1)];
			textSwap.complete(
				DOM.headline,
				nextPageData.headline
			);
		}
	},
	_initial(state, { oldIndex, newIndex }) {
		// console.log("initial")
		const magicbox = ()=> {
			if (state) {
				utils.applyStyles(
					DOM.magicbox, { 
						width: '450px',
						height: '400px',
						top: ((DOM.headline.offsetTop) / 3 * 2) + 'px',
						left: (DOM.headline.offsetLeft / 2) + 'px'
					});
				_tl.magicbox
					.from(DOM.magicbox, {
						width: 0, delay: 0.2
					})
					.from(DOM.magicbox, {
						left: 450
					}, '<');
			} else {
				_tl.magicbox
					.to(DOM.magicbox, {
						duration: 0.75, left: 450
					})
					.to(DOM.magicbox, {
						duration: 0.75, width: 0
					}, '<')
					.then( ()=> {
						DOM.magicbox.removeAttribute('style');
						_tl.magicbox.clear(true);
					});
			}
		}
		// this._universalPage();
		magicbox();
	},
	_portfolio(state, { oldIndex, newIndex }) {
		// console.log("portfolio")
		const magicbox = () => {
			if (state) {
				utils.applyStyles(
					DOM.magicbox, {
						width: '0vw',
						height: '70vh',
						top: '15vh',
						left: '15vw',
					});
				_tl.magicbox
					.to(DOM.magicbox, {
						width: '70vw', delay: 0.2
					})
					.then(() => {
						utils.applyStyles(
							DOM.magicbox,
							{ left: '0', right: '0' }
						);
					});
			} else {
				if (oldIndex < newIndex) {
					_tl.magicbox
						.to(DOM.magicbox, {
							duration: 0.75, left: '', right: '15vw'
						})
						.to(DOM.magicbox, {
							duration: 0.75, width: 0
						}, '<')
						.then(
							() => _tl.magicbox.clear()
						);
				} else {
					utils.applyStyles(
						DOM.magicbox,
						{ left: '15vw', right:'' }
					);
					_tl.magicbox
						.to(DOM.magicbox, {
							width: '0vw', delay: 0.2
						})
						.then(
							() => _tl.magicbox.clear()
						);
				}
			}
		}
		magicbox();
		if (state) {
			DOM.navigation.catalog.style.display = 'block';
		} else {
			DOM.navigation.catalog.style.display = '';
		}
	},
	_contact() {
		// console.log("contact")
		// this._universalPage()
	},
	_about() {
		console.log("about")
	},
	async init() {
		const self = this;
		try {
			_tl = { ...Timelines };
			await utils.delayPromise(
				() => (
					self._initial(true, {
						oldIndex: -1,
						newIndex: 0
					})
				), 1000);
		} catch (err) {
			console.log(err)
		} finally {
			Context.active.nav = false;
		}
	},
	async walkthrough(oldPage, newPage) {
		try {
			const order = _byd.pages.walkthroughOrder;
			const pages = {
				oldIndex: order.indexOf(oldPage),
				newIndex: order.indexOf(newPage)
			};
			if (!!oldPage) {
				await utils.delayPromise(
					() => (
						this[`_${oldPage}`](false, pages)
					), 500);
			}
			await utils.delayPromise(
				() => (
					this[`_${newPage}`](true, pages)
					// this._universalPage()
				), 1000);
		} catch (err) {
			console.log(err)
		} finally {
			Context.active.nav = false;
		}
		return true;
	},
	portfolio() {
		console.log("project")
	}
};
