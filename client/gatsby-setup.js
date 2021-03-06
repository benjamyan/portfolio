/**
 * This file is dedicated to any extended functionality pertaining strictly to gatsby
 * Can include utilities, lists, and anything else pertinent to the build process
 */
const scripts = [
	'plugins.js',
	'utils.js',
	'initial.js',
	'Interactivity.js',
	'Navigation.js',
	'CatalogModal.js',
	'app.js'
]
const walkthroughOrder = [
	'initial',
	'portfolio',
	'contact'
]
const catalogOrder = [
	'surfair',
	'something-else-here',
	'mycology'
]
const templates = {
	index: `./src/pages/templates/index.js`,
	project: `./src/pages/templates/project.js`
}
const utils = function() {
	global.randomStr = () => {
		return Math.random().toString(36).slice(2);
	}
}

module.exports = {
	utils,
	scripts,
	templates,
	walkthroughOrder,
	catalogOrder
};
