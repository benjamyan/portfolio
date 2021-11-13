const Timelines = {
	_default: {
		// paused: true,
		defaults: {
			duration: 1,
			ease: "power4.out"
		}
	},
	magicbox: new gsap.timeline({
		defaults: {
			duration: 1,
			ease: "power4.out"
		}
	}),
	pageIn: new gsap.timeline({
		// ...this._defaults
		paused: true,
		smoothChildTiming: true,
		// autoRemoveChildren: true,
		defaults: {
			duration: 1,
			ease: "power4.out"
		}
	}),
	pageOut: new gsap.timeline({
		paused: true,
		defaults: {
			duration: 1,
			ease: "power4.out"
		}
	}),
	new(params={}) {
		const _tlParams = { 
			..._tl._default,
			...params
		};
		return new gsap.timeline(_tlParams)
	},
	longest() {		
		// Object.values(this)
		// 	.sort((a, b)=> {
		// 		return a - b
		// 	});
		let longestTl = 0;
		for (const tl of Object.values(this)) {
			if (typeof tl == 'object' && tl._dur > longestTl) {
				longestTl = tl._dur
			}
		}
		return longestTl
	}
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
			
			Array.from(
					node.querySelectorAll('h1, h2, h3, h4, h5, p')
				).forEach(
					(textNode, i) => {
						let delay = i / 20;
						if (i % 2 === 0) {
							delay -= 0.1;
						} else {
							delay += 0.05;
						}
						let letterOut = document.createElement("span");
						letterOut.textContent = letter;
						letterOut.style.transitionDelay = `${delay}s`;
						letterOut.classList.add("out");
						span.append(letterOut);
						// textNode.innerHTML = ''
						// textNode.remove();
					}
				);
		},
		reveal(node) {
			// console.log("reveal")
			// console.log(node)
		},
		complete(node, nextText) {
			let letters = node.textContent.split("");
			node.textContent = "";
			letters.forEach((letter, i) => {
				i += 1;
				let span = document.createElement("span");
				let delay = i / 20;
				if (i % 2 === 0) {
					delay -= 0.1;
				} else {
					delay += 0.05;
				}
				let letterOut = document.createElement("span");
				letterOut.textContent = letter;
				letterOut.style.transitionDelay = `${delay}s`;
				letterOut.classList.add("out");
				span.append(letterOut);
				let letterIn = document.createElement("span");
				letterIn.textContent = nextText;
				letterIn.style.transitionDelay = `${delay}s`;
				letterIn.classList.add("in");
				span.append(letterIn);
				node.append(span);
			});

			// const self = this;
			// Array.from(
			// 		node.querySelectorAll('h1, h2, h3, h4, h5, p')
			// 	).forEach(
			// 		(textNode) => self.conceal(textNode)
			// 	);
			// Object.values(nextText).forEach(
			// 	text => node.innerHTML += text
			// )

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
		const getMagicboxStyles = () => {
			const _h1 = DOM.headline.querySelector('h1');
			const textWidth = utils.getTextWidth(_h1);
			return {
				width: (textWidth + (Context.offset * 3)) + 'px',
				height: `${_h1.offsetHeight * 2}px`,
				top: `${DOM.headline.offsetTop - (Context.offset / 2)}px`,
				left: `0px`
			}
		}
		const magicbox = ()=> {
			const boxStyles = getMagicboxStyles();
			let magicboxAnimation;
			if (state) {
				magicboxAnimation = 
					_tl.new({ delay: 0.5 })
						.from(DOM.magicbox, {
							width: 0
						})
						// .from(DOM.magicbox, {
						//  	left: boxStyles.width
						// }, '<');
						.to(DOM.magicbox, {
							width: boxStyles.width,
							onStart: () => {
								// _tl.pageIn.pause()
								utils.applyStyles(
									DOM.magicbox, { ...getMagicboxStyles() }
								);
								// _tl.pageIn.play()
							},
							onComplete: () => _tl.pageIn.clear(true)
						}, '<');
				_tl.pageIn.add(magicboxAnimation, 0);
			} else {
				magicboxAnimation =
					new gsap.timeline()
						.to(DOM.magicbox, {
							duration: 0.75, left: parseInt(boxStyles.width)
						})
						.to(DOM.magicbox, {
							duration: 0.75, width: 0
						}, '<')
						.then( ()=> {
							DOM.magicbox.removeAttribute('style');
							// _tl.magicbox.clear(true);
						})
						.catch(
							err=> console.log(err)
						);
				_tl.pageOut.add(magicboxAnimation, '<');
			};
		}
		try {
			magicbox();
			return {
				time: (
					state ? 
						_tl.pageIn.duration() : 
						_tl.pageOut.duration()
				),
				main: function() {
					if (state) {
						_tl.pageIn.play();
						window.onresize = function () {
							utils.applyStyles(
								DOM.magicbox, getMagicboxStyles()
							);
						};
					} else {
						_tl.pageOut.play();
						window.onresize = null;
					};
				}
			}
		} catch (err) {
			console.log(err)
			return err;
		}
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
		try {
			_self = this;
			_tl = Timelines;
			const initial = 
				_self._initial(true, {
					oldIndex: -1, newIndex: 0
				});
			console.log(initial)
			await utils.delayPromise(
				() => ( 
					initial.main() 
				), initial.time);
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
					this[`_${newPage}`](true, pages),
					this._universalPage()
				), 1000);
		} catch (err) {
			console.log(err)
		} finally {
			Context.active.nav = false;
		}
		return true;
	},
	async portfolio() {
		console.log("project")
	}
};
