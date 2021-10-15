const CatalogModal = function(node) {
	const self = this;
	this.nodes = {
		wrapper: node,
		list: node.querySelector('*[data-keyname="project-list"]'),
		image: node.querySelector('*[data-keyname="project-image"]'),
		frame: false
	};
	this.state = {
		modal: false,
		project: false
	};
	//
	const transitions = {};
	const modalFrameHtml = `
		<div
			data-catalog="modal"
			style="position:absolute;top:0;left:0;width:100%;height:100%;">
				<article></article>
		</div>
	`;
	const updateHrefInModal = ()=> {
		self.nodes.frame.href = '';
	};
	const listenToCatalogLinks = ()=> {
		self.nodes.links = Array.from(self.nodes.list.getElementsByTagName('a'));
		return self.nodes.links.forEach(
			link => link.addEventListener('click', self.openProject)
		);
	};
	function onModalStateChange() {

	};
	//
	this.addProjectNode = function(data) {
		console.log("open CatalogModal");
		self.nodes.frame.querySelector
	}
	this.removeProjectNode = function(data) {

	}
	this.toggleProject = function(event) {
		console.log("open CatalogModal");
		event.preventDefault();
		console.log(self.state.project)
		console.log(event.target)
	}
	this.hideProject = function() {
		console.log("close CatalogModal");
		// TODO
	}
	this.destory = function () {
		console.log("destroy CatalogModal");
		// TODO
	}
	this._init = function () {
		try {
			// console.log("\ninit CatalogModal");
			listenToCatalogLinks();
			self.nodes.image.insertAdjacentHTML(
				'beforeend', modalFrameHtml
			);
			self.nodes.frame = 
				self.nodes.image.querySelector('div[data-catalog="modal"]');
			return (
				self.state.modal = true,
				self.state.project = false
			);
		} catch (err) {
			console.log(err)
		}
	}()
};