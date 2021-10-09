const MODULES = {};
const DOM = {
	magicText: document.querySelectorAll('*[data-magictext]')
};

const buildNewModule = (node='', module=Function)=> {
	MODULES[node] = [];
	Array.from(DOM[node]).forEach(
		node=> MODULES[node].push( module(node) )
	);
};

async function main() {
	if (DOM.magicText) {
		buildNewModule(
			'magicText',
			(data)=> new MagicText(data)
		);
	};
	return true;
};

main()
	.then(
		()=> console.log("DOM Loaded")
	).catch(
		err=> console.log(err)
	);