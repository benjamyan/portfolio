const Navigation = function (node) {
	this.nodes = {
		wrapper: node,
		navItems: Array.from(
			node.querySelectorAll(`[data-navigate]`)
		),
		mobileTrigger: node.querySelector('.mobile-trigger') || false
	};
	this.state = {
		// active: false,
		type: node.dataset.navigation || 'explicit'
	};
	const self = this;
	const getImplicitDestination = (order, desired)=> {
		const { activePage } = _byd.pages;
		const activePageIndex = (
			order.findIndex(page => page === activePage.at(-1))
		);
		return (
			order[activePageIndex + parseInt(desired)]
		);
	};
	const navigateWalkthrough = (destination) => {
		// console.log("navigateWalkthrough")
		/**
		 * This uses our proxy to call new pages to the viewport
		 * Changing the activePage proxystring will initiate our page change
		 */
		try {
			// _byd.proxies.pages.activePage.push(destination);
			setActivePage(destination)
			// return PageTransition[destination]();
		} catch (err) {
			console.log(err)
			return err
		}
		return true;
	};
	const navigatePortfolio = (destination)=> {
		console.log("navigatePortfolio")
		try {
			console.log(destination)
		} catch (err) {
			console.log(err)
		}
	};
	this.destroy = function () {
		// console.log('Navigation destroy')
		// TODO
	};
	this.navigate = function({ target }) {
		// console.log('Navigation navite');
		/**
		 * The purpose of this function is to get the nxt page, and route accordingly
		 */
		try {
			if (!Context.active.nav) {
				Context.active.nav = true;
				// self.state.active = true;
				const { activeView } = _byd.pages;
				const destination = function () {
					// check for data-navigate attr on element
					let targetDest = target.dataset.navigate || false;
					if (self.state.type === 'implicit') {
						// if nav type is implicit, get the next page in order
						targetDest = getImplicitDestination(
							_byd.pages[`${activeView}Order`], targetDest
						);
					}
					return targetDest || false
				}();
				if (!!destination) {
					activeView === 'walkthrough' ?
						navigateWalkthrough(destination)
						: navigatePortfolio(destination);
				} else throw '!destination';
			} else throw 'nav-in-progress';
		} catch (err) {
			console.log(err)
			switch (err) {
				case '!destination':
					return false;
				case 'nav-in-progress':
					return false;
				default: 
					//
			}
		} finally {
			// self.state.active = false;
		}
		return true
	};
	this._init = function () {
		// console.log('Navigation init')
		try {
			const { navItems } = self.nodes;
			for (let i = 0; i < navItems.length; i++) {
				navItems[i].addEventListener('click', self.navigate)
			}
			// self.nodes.navItems.forEach(
			// 	navItem => navItem.addEventListener('click', self.navigate)
			// )
		} catch (err) {
			console.log(err)
		}
	}();
}
