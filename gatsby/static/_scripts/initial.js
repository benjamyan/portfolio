const MODULES = {};
const DOM = {
	main: document.getElementById('___gatsby'),
	catalog: document.getElementById('catalog'),
	magicText: Array.from(document.querySelectorAll('*[data-magictext]'))
};
const utils = {
	randomString() {
		return Math.random().toString(36).slice(2);
	}
};