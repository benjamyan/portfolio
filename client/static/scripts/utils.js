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
	applyStyles(element, stylePairs={}) {
		try {
			for (const value in stylePairs) {
				element.style[value] = stylePairs[value];
			}
		} catch (err) {
			console.log(err)
			return err
		}
		return true
	},
	delayPromise(callback, duration) {
		let promise = new Promise((a, b) => { resolve = a; reject = b; });
		setTimeout(() => (
			callback(), resolve(true)
		), duration);
		return promise;
	},
	getTextWidth(element, noElementParams={}) {
		/**
		 * @param element <ElementNode>
		 * The given DOM element to calculate
		 * @param noElementParams <Object>
		 * If the first param is falsy, you can provide text 
		 * and font params to use instead
			* @param text <String>
			* innerText to be used
			* @param font <String>
			* "italic 19pt verdana"
		*/
		const textWidthByCanvas = (text, font, letterSpacing=null)=> {
			const canvas = (
				textWidthByCanvas.canvas ||
				(textWidthByCanvas.canvas = document.createElement("canvas"))
			);
			const canvasContext = canvas.getContext("2d");
			canvasContext.font = font;
			const textWidthValue = (canvasContext.measureText(text)).width;
			if (typeof letterSpacing !== null) {
				const letterSpacingValue = parseInt(letterSpacing) * text.split('').length;
				return textWidthValue + letterSpacingValue
			} else {
				return textWidthValue
			}
		};
		try {
			if (!!element) {
				// if an element is provided
				//
				const elStyles = getComputedStyle(element);
				const fontValues = `${elStyles.fontStyle} ${elStyles.fontWeight} ${elStyles.fontSize} ${elStyles.fontFamily}`;
				return (
					textWidthByCanvas( 
						element.innerText,
						fontValues,
						elStyles.letterSpacing
					)
				)
			} else if (!!noElementParams.text && !!noElementParams.font) {
				// if no elemnt is passed and fallback params are provided
				//
				const { text, font } = noElementParams;
				if (!text || !font) {
					throw '!text-or-!font';
				}
				return textWidthByCanvas(text, font);
			} else throw '!element-!params';
		} catch (err) {
			console.log(err)
			return err
		}
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
