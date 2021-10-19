/** https://greensock.com/docs/v3/Plugins/ScrollTrigger/
 * 
@param yBound <Number>
- Tolerence for the element being stuck to dom
-- 0 to 1 value; ie 0 = top, 1 = bottom, 0.5 = dead center
-- Relevent to the Y position the element is at on the DOM
*/
const StickyElement = function (yBound=0, endPoint, ref) {
	const self = this;
	this.nodes = {
		wrapper: ref,
		end: document.getElementById(endPoint)
	};
	// this.notes = {
	// 	bound: (1 - yBound),
	// 	start: ref.offsetTop ,
	// 	end: document.getElementById(endPoint).offsetTop
	// };
	// this.state = {
	// 	stick: false,
	// 	setStick: ()=> self.state.stick = !self.state.stick,
	// 	top: window.pageYOffset,
	// 	setTop: () => self.state.top = window.pageYOffset
	// };
	const _nodes = self.nodes;
	// const _notes = self.notes;
	// const _state = self.state;
	// const { setStick } = _state;
	this.destroy = function() {

	}
	this._init = function() {
		// console.log("-- StickyElement");
		ScrollTrigger.create({
			trigger: _nodes.wrapper,
			endTrigger: _nodes.end,
			start: 'center center',
			end: 'center bottom',
			markers: false,
			pin: true,
			pinSpacing: true
		});
	}()
}