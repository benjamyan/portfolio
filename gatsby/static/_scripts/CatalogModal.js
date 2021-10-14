const CatalogModal = function(ref) {
	const self = this;
	self.nodes = {
		wrapper: ref,
		list: ref.querySelector('*[data-keyname="project-list"]'),
		image: ref.querySelector('*[data-keyname="project-image"]'),
		frame: false
	};
	const updateHrefInModal = ()=> {
		self.nodes.frame.href = '';
	}
	function listenToCatalogLinks() {

	}
	function buildIndividualProjectModal() {
		// console.log("CatalogModal buildProjectModal");
		self.nodes.image.insertAdjacentHTML(
			'beforeend', 
			`<iframe 
				class="catalog-modal"
				style="position:absolute;top:0;left:0;width:100%;height:100%;">
			</iframe>`
		);
		self.nodes.frame = self.nodes.image.querySelector('.catalog-modal');
	};
	this.openProject = function() {
		console.log("open CatalogModal");
		// TODO
	};
	this.updateProject = function() {
		console.log("update CatalogModal");
		// TODO
	};
	this.closeProject = function() {
		console.log("close CatalogModal");
		// TODO
	};
	this.scrubModal = function() {

	};
	this._init = function () {
		try {
			console.log("\ninit CatalogModal");
			isInit = true;
			return buildIndividualProjectModal();
		} catch (err) {
			console.log(err)
		}
	}();
	this._destory = function () {
		console.log("destroy CatalogModal");
		// TODO
	};
}