/** https://greensock.com/docs/v3/Plugins/ScrollTrigger/
 * 
new StickyElement.bind( null, {
	yStart: 0,
	yEnd: 1,
	endEl: 'contact',
	cb: ()=> {
		DOM.placard.style.top = (window.pageYOffset / 7.5 + 25) + 'px';
	},
	cbEvent: 'onUpdate'
});
 * 
@param yBound <Number>
- Tolerence for the element being stuck to dom
-- 0 to 1 value; ie 0 = top, 1 = bottom, 0.5 = dead center
-- Relevent to the Y position the element is at on the DOM
*/
const StickyElement = function ({...props}, ref) {
	const self = this;
	const { 
		yStart = 0, 
		yEnd = 0, 
		endEl = '',
		cb = {}
	} = props;
	this.nodes = {
		wrapper: ref,
		end: endEl.length > 0 ? document.getElementById(endEl) : false
	};
	const _nodes = self.nodes;
	const TriggerOpts = function() {
		const temp = {
			trigger: _nodes.wrapper
		};
		if (_nodes.end) {
			temp.endTrigger = _nodes.end;
		}
		return temp
	}()
	const PositionOpts = function() {
		const temp = {};
		temp.start = (()=> {
			switch (yStart) {
				case 0: return 'top center';
				case 0.5: return 'center center';
				case 1: return 'bottom center';
				default: return 'center center';
			}
		})();
		temp.end = (()=> {
			switch (yEnd) {
				case 0: return 'top bottom';
				case 0.5: return 'center bottom';
				case 1: return 'bottom bottom';
				default: return 'center bottom';
			}
		})();
		return temp;
	}()
	const OnEventOpts = function() {
		const temp = {};
		if (Object.entries(cb).length > 0) {
			for (const name in cb) {
				temp[name] = utils.debounce(cb[name], 20)
			}
		}
		return temp;
	}()
	const DefaultOpts = function() {
		return {
			markers: false,
			pin: true,
			pinSpacing: true
		}
	}()
	this.destroy = function() {

	}
	this._init = function() {
		// console.log("-- StickyElement");
		try {
			const options = {
				...TriggerOpts,
				...PositionOpts,
				...OnEventOpts,
				...DefaultOpts
			};
			ScrollTrigger.create(options);
		} catch (err) {
			console.log(err)
			return;
		}
	}()
}