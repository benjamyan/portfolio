const setup = {
	modules() {
		proxies.init();
		modules.add(DOM.header, Navigation);
		modules.add(DOM.main, CustomKerning);
		modules.add(DOM.main, KillWidows);
	},
	killWidows() {
		// DOM.noWidowText.forEach(
		// 	text => utils.killWidows(text)
		// );
	},
	pagePlacard() {
		const stickyOpts = {
			yStart: 0,
			yEnd: 1,
			cb: {
				onUpdate: () => (
					DOM.placard.style.top = ((window.pageYOffset / 7.5) + 25) + 'px'
				)
			}
		};
		DOM.main.insertAdjacentHTML(
			'beforeend',
			`<div id="pagePlacardEnd" style="position:absolute;width:1px;height:1px;bottom:-50px;left:-50px;"></div>`
		);
		stickyOpts.endEl = 'pagePlacardEnd';
		modules.add(
			DOM.placard,
			StickyElement.bind(
				null, stickyOpts
			)
		);
	},
	sectionIntro() {
		// const headlineWrapper = DOM.intro.querySelector('[data-magictext="headline"] > div');
		// const headlineH1 = headlineWrapper.querySelector('h1');
		// headlineWrapper.insertAdjacentHTML(
		// 	'afterbegin', 
		// 	`<div class="headline_wrapper">${ headlineH1.outerHTML }</div>`
		// );
		// headlineH1.remove();
	},
	sectionCatalog() {
		
	}
};
/********************************************
 * Entry point - called from gatsby-browser *
 *******************************************/
async function initMain() {
	// console.log("\n-- initMain");
	try {
		context.win = { ...window._byd };
		setup.killWidows();
		setup.modules();
		setup.pagePlacard();
		// setup.sectionIntro();
		if (DOM.catalog) {
			modules.add(DOM.catalog, CatalogModal);
		};
		if (DOM.magicText.length > 0) {
			DOM.magicText.forEach(
				textNode=> modules.add( textNode, MagicText )
			);
		};
	} catch (err) {
		console.log(err);
		return;
	} finally {
		return context.isInit = false;
	};
};