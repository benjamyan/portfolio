const JustifyTextNode = function(ref) {
	const self = this;
	self.nodes = {};
	this.destory = function() {
		console.log("destroy JustifyTextNode");
	};
	this.init = function() {
		console.log("init JustifyTextNode");
		console.log(ref)
	}();
}