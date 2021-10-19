const initialModules = ()=> {
	proxies.init();
	modules.add(DOM.header, Navigation);
	modules.add(DOM.main, CustomKerning);
	modules.add(DOM.main, KillWidows);
}

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
	} finally {
		return context.isInit = false;
	};
};