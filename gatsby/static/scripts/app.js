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
			(data)=> new JustifyText(data)
		);
	}
	return true;
};

main()
	.then(
		()=> console.log("Loaded")
	).catch(
		err=> console.log(err)
	);