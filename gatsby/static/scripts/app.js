const MODULES = {};
const DOM = {
	main: document.getElementById('___gatsby'),
	magicText: Array.from(document.querySelectorAll('*[data-magictext]')) || []
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
		if (DOM.magicText.length > 0) {
			buildNewModule(
				'magicText',
				(data) => new MagicText(data)
			);
		};
		return true;
	} catch (err) {
		console.log(err);
	};
};