const buildNewModule = (node, Module) => {
	const key = `${utils.randomString()}_${Module.name.replace(/[^A-Z]+/g, "")}`;
	if (node.dataset.module) {
		node.dataset.module += '+' + key;
	} else {
		node.dataset.module = key;
	};
	MODULES[key] = new Module(node, MODULES);
};

async function initMain() {
	console.log("\n-- initMain");
	try {
		if (DOM.catalog) {
			buildNewModule( 
				DOM.catalog, 
				CatalogModal
			);
		};
		if (DOM.magicText.length > 0) {
			DOM.magicText.forEach(
				textNode=> buildNewModule(
					textNode,
					MagicText
				)
			);
			// buildNewModule(
			// 	DOM.magicText,
			// 	MagicText
			// );
		};
	} catch (err) {
		console.log(err);
	} finally {
		return;
	};
};