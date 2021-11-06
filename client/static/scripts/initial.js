/********************************************
 * DOM nodes of interest ********************
 *******************************************/
const DOM = {};
/********************************************
 * Page Modules *****************************
 *******************************************/
const Modules = {
	directory: {},
	add(node, Module) {
		const addSingleModule = (node, Module)=> {
			const moduleName = Module.name;
			const moduleKey =
				`${utils.randomString()}_${moduleName.replace(/[^A-Z]+/g, "")}`;
			if (node.dataset && node.dataset.module) {
				node.dataset.module += '++' + moduleKey;
			} else {
				node.dataset.module = moduleKey;
			};
			if (!this.directory[moduleName]) {
				this.directory[moduleName] = [];
			};
			this[moduleKey] = new Module(node, Modules);
			this.directory[moduleName].push(moduleKey);
			return moduleKey;
		}
		try {
			if (Array.isArray(node)) {
				for (let i = 0; i < node.length; i++) {
					addSingleModule(node[i], Module)
				}
			} else {
				addSingleModule(node, Module)
			}
			return true
		} catch (err) {
			console.log(err)
		}
	},
	remove(moduleKey) {
		try {
			delete this[moduleKey],
			delete this.directory[moduleName]
			return true
		} catch (err) {
			console.log(err)
		}
	}
};
/********************************************
 * Some state stuff *************************
 *******************************************/
const Context = {
	isInit: true,
	win: {}
};
/********************************************
 * Proxy watchers ***************************
 *******************************************/
const Proxies = {
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
						Modules[catalog].addNode(isolatedData)
					);
				}
			);
			return Context.win.pageData = newData
		};
		return utils.watchObject(
			_byd.pageData, 
			() => {
				if (!Modules.directory.CatalogModal) {
					Modules.directory.CatalogModal = []
				}
				const catalogModule = Modules.directory.CatalogModal;
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
