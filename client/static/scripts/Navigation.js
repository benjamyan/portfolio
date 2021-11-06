const Navigation = function (node) {
	this.nodes = {
		wrapper: node,
		navItems: Array.from(
			node.querySelectorAll(`[data-navigate]`)
		),
		mobileTrigger: node.querySelector('.mobile-trigger') || false
	};
	this.state = {
		active: false,
		type: node.dataset.navigation || 'explicit'
	};
	const self = this;
	const getImplicitDestination = (order, desired)=> {
		const { activePage } = _byd.pages;
		const activePageIndex = (
			order.findIndex(page => page === activePage)
		);
		return (
			order[activePageIndex + parseInt(desired)]
		);
	};
	const navigateWalkthrough = (destination) => {
		console.log("navigateWalkthrough")
		try {
			const { headline } = Interactions;
			console.log(destination)
			headline.swap(DOM.headline)
		} catch (err) {
			console.log(err)
		}
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
		try {
			self.state.active = true;
			const { activeView } = _byd.pages;
			const viewOrder = _byd.pages[`${activeView}_order`];
			const destination = function() {
				let targetDest = target.dataset.navigate || false;
				if (self.state.type === 'implicit') {
					targetDest = getImplicitDestination(viewOrder, targetDest)
				}
				return targetDest || false
			}();
			if (!!destination) {
				viewOrder.includes(destination) ?
					navigateWalkthrough(destination)
					: navigatePortfolio(destination)
			} else throw '!destination'
		} catch (err) {
			console.log(err)
			return err
		} finally {
			self.state.active = false;
		}
		return true
	};
	this._init = function () {
		// console.log('Navigation init')
		try {
			self.nodes.navItems.forEach(
				navItem => navItem.addEventListener('click', self.navigate)
			)
		} catch (err) {
			console.log(err)
		}
	}();
}