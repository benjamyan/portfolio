const Interactions = {
	placard: {},
	headline: {
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
		swap(node, nextText) {
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
}
const PageTransitions = {
	_universalPage() {
		// console.log("universal")
		const { headline } = Interactions;
		const { body } = window._byd.pages.initialData.index;
		if (_byd.pages.activePage.length > 1) {
			const nextPageData = body[_byd.pages.activePage.at(-1)];
			console.log(nextPageData)
			headline.swap(
				DOM.headline,
				nextPageData.headline
			);
		}
	},
	initial() {
		console.log("initial")
		this._universalPage()
	},
	portfolio() {
		console.log("portfolio")
		this._universalPage()
	},
	contact() {
		console.log("contact")
		this._universalPage()
	},
	about() {
		console.log("about")
	},
	project() {
		console.log("project")
	}
}
