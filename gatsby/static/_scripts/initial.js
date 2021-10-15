/********************************************
 * DOM nodes of interest ********************
 *******************************************/
const DOM = {
	main: document.getElementById('___gatsby'),
	header: document.getElementById('bydHeaderNav'),
	catalog: document.getElementById('catalog'),
	magicText: Array.from(document.querySelectorAll('*[data-magictext]'))
};
/********************************************
 * Page modules *****************************
 *******************************************/
const modules = {
	_directory: {},
	_add(node, Module) {
		const moduleName = Module.name;
		const moduleKey = (
			utils.randomString() 
				+ '_' 
				+ moduleName.replace(/[^A-Z]+/g, "")
		).trim();
		if (node.dataset.module) {
			node.dataset.module += '++' + moduleKey;
		} else {
			node.dataset.module = moduleKey;
		};
		if (!this._directory[moduleName]) {
			this._directory[moduleName] = [];
		};
		return (
			this[moduleKey] = new Module(node, modules),
			this._directory[moduleName].push(moduleKey)
		);
	},
	_remove(moduleKey) {
		return (
			delete this[moduleKey],
			delete this._directory[moduleName]
		);
	}
};