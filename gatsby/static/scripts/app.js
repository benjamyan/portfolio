const MODULES = {};
const DOM = {
	justifyText: document.querySelectorAll('*[data-justifytext]')
};

const buildNewModule = (name='', nodes={}, module=Function)=> {
	MODULES[name] = [];
	Array.from(nodes).forEach(
		node=> MODULES[name].push( module(node) )
	);
};

async function main() {
	if (DOM.justifyText) {
		buildNewModule(
			'justifyText',
			DOM.justifyText,
			(data)=> new MagicText(data)
		);
	}
	return true;
};

main()
	.then(
		()=> console.log("DOM Loaded")
	).catch(
		err=> console.log(err)
	);