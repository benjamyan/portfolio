const MagicText = function(ref) {
	const self = this;
	self.nodes = {};
	this.destory = function() {
		console.log("destroy MagicText");
	};
	this.init = function() {
		console.log("init MagicText");
		console.log(ref)
	}();
}