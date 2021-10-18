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
	directory: {},
	add(node, Module) {
		const moduleName = Module.name;
		const moduleKey =
			`_${utils.randomString()}_${moduleName.replace(/[^A-Z]+/g, "")}`;
		if (node.dataset.module) {
			node.dataset.module += '++' + moduleKey;
		} else {
			node.dataset.module = moduleKey;
		};
		if (!this.directory[moduleName]) {
			this.directory[moduleName] = [];
		};
		this[moduleKey] = new Module(node, modules);
		this.directory[moduleName].push(moduleKey);
		return moduleKey;
	},
	remove(moduleKey) {
		return (
			delete this[moduleKey],
			delete this.directory[moduleName]
		);
	}
};
/********************************************
 * Some state stuff *************************
 *******************************************/
let context = {
	isInit: true,
	win: {}
};
/********************************************
 * Proxy watchers ***************************
 *******************************************/
const proxies = {
	pageData({ _byd }) {
		let oldData = [ ..._byd.pageData ];
		const isolateNewData = (newData)=> {
			return newData.map(
				(item, i) => !oldData[i] ? item : false
			).filter(Boolean);
		};
		const updateModules = (catalogModule)=> {
			const newData = [..._byd.pageData];
			catalogModule.forEach(
				(catalog) => {
					const isolatedData = isolateNewData(newData);
					return (
						oldData = newData,
						modules[catalog].addNode(isolatedData)
					);
				}
			);
			return context.win.pageData = newData
		};
		return utils.watchObject(
			_byd.pageData, () => {
				if (!modules.directory.CatalogModal) {
					modules.directory.CatalogModal = []
				}
				const catalogModule = modules.directory.CatalogModal;
				if (catalogModule.length > 0) {
					if (oldData.length !== _byd.pageData.length) {
						return updateModules(catalogModule)
					}
				}
			}
		);
	},
	init() {
		window._byd.proxies['pageData'] = this.pageData(window);
	}
};
