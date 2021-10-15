/********************************************
 * Entry point - called from gatsby-browser *
 *******************************************/
async function initMain() {
	// console.log("\n-- initMain");
	try {
		context.win = { ...window._byd };
		proxies._init();
		modules._add( DOM.header, Navigation );
		modules._add( DOM.main, CustomKerning );
		if (DOM.catalog) {
			modules._add(DOM.catalog, CatalogModal);
		};
		if (DOM.magicText.length > 0) {
			DOM.magicText.forEach(
				textNode=> modules._add( textNode, MagicText )
			);
		};
	} catch (err) {
		console.log(err);
	} finally {
		return;
	};
};