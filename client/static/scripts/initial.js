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
		const addSingleModule = (singleNode, SingleModule)=> {
			const moduleName = SingleModule.name;
			const moduleKey =
				`${utils.randomString()}_${moduleName.replace(/[^A-Z]+/g, "")}`;
			if (singleNode.dataset && singleNode.dataset.module) {
				singleNode.dataset.module += '++' + moduleKey;
			} else {
				singleNode.dataset.module = moduleKey;
			};
			if (!this.directory[moduleName]) {
				this.directory[moduleName] = [];
			};
			this[moduleKey] = new Module(singleNode, Modules);
			this.directory[moduleName].push(moduleKey);
			return moduleKey;
		}
		try {
			if (Array.isArray(node)) {
				for (let i = 0; i < node.length; i++) {
					addSingleModule(node[i], Module)
				}
			} else if (typeof node == 'object' ) {
				const nodeArr = Object.values(node);
				for (let i = 0; i < nodeArr.length; i++) {
					addSingleModule(nodeArr[i], Module)
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
	// isInit: true,
	active: {
		nav: false,
		page: 'initial',
		view: 'walkthrough'
	},
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
	pages({ _byd }) {
		let oldActiveData = [..._byd.pages.activePage];
		return utils.watchObject(
			_byd.pages,
			()=> {
				const activePage = _byd.pages.activePage;
				if (oldActiveData.length !== activePage.length) {
					const newPage = activePage.at(-1);
					oldActiveData.push(newPage);
					Transitions[_byd.pages.activeView](oldActiveData.at(-2), newPage);
					Context.active.page = newPage;
					DOM.main.dataset.page = newPage;
				}
			}
		);
	},
	init() {
		// window._byd.proxies['pageData'] = this.pageData(window);
		window._byd.proxies['pages'] = this.pages(window);
	}
};
const setActivePage = (str) => _byd.proxies.pages.activePage.push(str);
