window.MODULES = {};
window.DOM = {
	main: document.getElementById('___gatsby'),
	catalog: document.getElementById('catalog'),
	catalogList: document.querySelector('*[data-keyname="project-list"]'),
	catalogImage: document.querySelector('*[data-keyname="project-image"]'),
	magicText: Array.from(document.querySelectorAll('*[data-magictext]'))
};

const buildNewModule = (node='', module=Function)=> {
	MODULES[node] = [];
	return Array.from(DOM[node]).forEach(
		node=> MODULES[node].push( module(node) )
	);
};

async function initFront() {
	console.log("\nSTART initFront");
	try {
		if (window.DOM.catalog) {
			window.MODULES.catalog = new CatalogModal(window.DOM.catalog, DOM)
		};
		/*
		if (DOM.magicText.length > 0) {
			buildNewModule(
				'magicText',
				(data) => new MagicText(data)
			);
		};
		*/
	} catch (err) {
		console.log(err);
	} finally {
		return;
	};
};