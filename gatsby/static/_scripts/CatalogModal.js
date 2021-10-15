const CatalogModal = function(node) {
	const self = this;
	this.nodes = {
		wrapper: node,
		list: node.querySelector('*[data-keyname="project-list"]'),
		image: node.querySelector('*[data-keyname="project-image"]'),
		frame: {},
		links: [],
		articles: {}
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
			link => link.addEventListener('click', self.toggleProject)
		);
	};
	function onModalStateChange() {

	};
	//
	this.addProjectNode = function(data=[]) {
		const buildAndAppendNodeToFrame = (node)=> {
			const newNode = self.nodes.frame.article.cloneNode();
			newNode.dataset.projectname = node.slug;
			newNode.style.display = 'none !important';
			newNode.innerHTML = window._byd.renderedPages[node.slug].innerHTML;
			return newNode
		}
		return data.forEach(
			node => {
				const newNode = buildAndAppendNodeToFrame(node);
				self.nodes.frame.wrapper.insertAdjacentHTML(
					'beforeend', newNode.outerHTML
				);
				self.nodes.articles[node.slug] =
					self.nodes.frame.wrapper.querySelector(`[data-projectname=${node.slug}]`);
				return self.nodes.articles[node.slug].setAttribute(
					'style', 'display:none !important;'
				);
			}
		);
	}
	this.removeProjectNode = function(data) {
		
	}
	this.toggleProject = function(event) {
		console.log("open CatalogModal");
		event.preventDefault();
		console.log(self.state.project)
		console.log(event.target)
	}
	this.destory = function () {
		console.log("destroy CatalogModal");
		// TODO
	}
	this._init = function () {
		try {
			listenToCatalogLinks();
			self.nodes.image.insertAdjacentHTML(
				'beforeend', modalFrameHtml
			);
			self.nodes.frame.wrapper = 
				self.nodes.image.querySelector('div[data-catalog="modal"]');
			self.nodes.frame.article =
				self.nodes.frame.wrapper.firstElementChild;
		} catch (err) {
			console.log(err);
		} finally {
			return (
				self.state.modal = true,
				self.state.project = false
			);
		}
	}()
};