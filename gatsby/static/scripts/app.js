const initPagePlacard = ()=> {
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
};
const initialModules = ()=> {
	initPagePlacard();
	proxies.init();
	modules.add(DOM.header, Navigation);
	modules.add(DOM.main, CustomKerning);
	modules.add(DOM.main, KillWidows);
};

/********************************************
 * Entry point - called from gatsby-browser *
 *******************************************/
async function initMain() {
	// console.log("\n-- initMain");
	try {
		context.win = { ...window._byd };
		initialModules();
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