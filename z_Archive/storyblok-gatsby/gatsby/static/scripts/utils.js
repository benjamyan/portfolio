/********************************************
 * Utility functions ************************
 *******************************************/
const utils = {
	randomString() {
		return Math.random().toString(36).slice(2);
	},
	debounce(func, timeFrame) {
		// https://stackoverflow.com/questions/12009367/javascript-event-handling-scroll-event-with-a-delay
		//
		// clearTimeout(method._tId);
		// method._tId = setTimeout(function () {
		// 	method();
		// }, delay);
		//
		let lastTime = 0;
		return function() {
			const NOW = new Date();
			if (NOW - lastTime >= timeFrame) {
				func();
				lastTime = NOW;
			}
		};
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
	killWidows(text) {
		text.innerHTML = text.innerHTML.replace(/\s(?=[^\s]*$)/g, "&nbsp;")
	},
	getSlug(str) {
		return str.split('/').at(-1)
	},
	scroll: {
		disable: function(targetEl = document.body) {
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
