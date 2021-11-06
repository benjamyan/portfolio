const setup = {
	_References() {
		DOM.header = document.getElementById('header');
		DOM.main = document.getElementById('main');
		DOM.text = Array.from(
			document.querySelectorAll('h2, h3, h4, h5, p, a, span')
		);
		DOM.headline = document.getElementById('headline');
		DOM.placard = document.getElementById('placard');
		DOM.navigation = Array.from(
			document.querySelectorAll('[data-navigation]')
		);
	},
	_Modules() {
		Modules.add(DOM.navigation, Navigation)
	},
	_typography() {
		// customTypographyChanges()
		// DOM.text.forEach(
		// 	text => utils.killWidows(text)
		// );
	},
	async initial() {
		try {
			// Proxies.init();
			this._References()
			this._Modules()
		} catch (err) {
			console.log(err)
			return err
		} finally {
			Context.win = { ...window._byd };
			return true
		}
	}
};
/********************************************
 * Entry point - called from gatsby-browser *
 *******************************************/
async function initMain() {
	try {
		await setup.initial();
	} catch (err) {
		console.log(err);
	} finally {
		Context.isInit = false;
		return true
	};
};