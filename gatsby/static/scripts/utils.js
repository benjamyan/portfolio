/********************************************
 * Utility functions ************************
 *******************************************/
const utils = {
	randomString() {
		return Math.random().toString(36).slice(2);
	},
	watchObject(object, onChange) {
		const handler = {
			get(target, property, receiver) {
				try {
					return new Proxy(target[property], handler);
				} catch (err) {
					return Reflect.get(target, property, receiver);
				}
			},
			defineProperty(target, property, descriptor) {
				onChange();
				return Reflect.defineProperty(target, property, descriptor);
			},
			deleteProperty(target, property) {
				onChange();
				return Reflect.deleteProperty(target, property);
			}
		};
		return new Proxy(object, handler);
	},
	scroll: {
		disable: function(targetEl = (document.body)) {
			// https://www.geeksforgeeks.org/how-to-disable-scrolling-temporarily-using-javascript/
			//
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
			targetEl.onscroll = function () {
				window.scrollTo(scrollLeft, scrollTop);
			};
		},
		enable: function (targetEl = (document.body)) {
			targetEl.onscroll = function () { };
		}
	}
};

function disableScroll() {
	
}

function enableScroll() {
	window.onscroll = function () { };
}
