const CatalogModal = function(node) {
	const self = this;
	this.nodes = {
		wrapper: node,
		list: node.querySelector('*[data-keyname="project-list"]'),
		image: node.querySelector('*[data-keyname="project-image"]'),
		frame: {
			wrapper: false,
			article: false
		},
		articles: {},
		links: []
	};
	this.state = {
		modal: false,
		setModal: (bool='')=> {
			if (typeof bool === 'boolean') {
				return self.state.modal = bool;
			}
			return !self.state.modal
		},
		project: false,
		setProject: (str)=> self.state.project = str
	};
	const { 
		modal, setModal,
		project, setProject
	} = self.state;
	//
	const transition = {
		fadeInGetBig(targetEl) {
			console.log(targetEl.style)
			// targetEl.setAttribute(
			// 	'style',
			// 	(`
			// 		width: ${targetEl.offsetWidth}px;
			// 	`).trim()
			// )
			gsap.to( targetEl, {
				duration: 0.5,
				opacity: 1,
				width: `${window.width - 100}px`,
				height: `${window.height - 150}px`,
				onStart: function() {
					console.log('onstart')
					targetEl.style.display = '';
					targetEl.style.width = targetEl.offsetWidth + 'px';
					targetEl.style.height = targetEl.offsetHeight + 'px';
				}
			})
		},
		backToOriginalSize() {

		},
		fadeOutGetSmol(targetEl) {
			const onCompleteFunc = ()=> {
				console.log('oncomplete')
				targetEl.style.display = 'none !important';
			}
			return gsap.to(targetEl, {
				duration: 0.5,
				opacity: 0,
				transform: 'scale(0.9)',
				onComplete: onCompleteFunc
			})
		}
	};
	const listenToCatalogLinks = ()=> {
		self.nodes.links = Array.from(self.nodes.list.getElementsByTagName('a'));
		return self.nodes.links.forEach(
			link => link.addEventListener('click', self.changeActive)
		);
	};
	function onModalStateChange() {

	};
	//
	this.addNode = function(data=[]) {
		const buildNodeForFrame = (node)=> {
			const newNode = self.nodes.frame.article.cloneNode();
			newNode.dataset.projectname = node.slug;
			newNode.style.display = 'none !important';
			newNode.innerHTML = window._byd.renderedPages[node.slug].innerHTML;
			return newNode
		}
		return data.forEach(
			node => {
				const newNode = buildNodeForFrame(node);
				self.nodes.frame.wrapper.insertAdjacentHTML(
					'beforeend', newNode.outerHTML
				);
				self.nodes.articles[node.slug] =
					self.nodes.frame.wrapper.querySelector(`[data-projectname=${node.slug}]`);
				self.nodes.articles[node.slug].setAttribute(
					'style', 'opacity:0;display:none;'
				);
			}
		);
	}
	this.removeNode = function(data) {
		console.log("removeNode");
	}
	this.toggleModal = function(slug) {
		console.log("toggleModal");
		transition.fadeInGetBig(
			self.nodes.articles[slug]
		);
		Array.from(self.nodes.image.children)
			.forEach(child => {
				if (child !== self.nodes.frame.wrapper) {
					return transition.fadeOutGetSmol(child)
				}
			});
	}
	this.changeActive = function(event) {
		// console.log("open CatalogModal");
		event.preventDefault();
		try {
			// const setProjectState = (str) => self.state.project = str;
			const linkSlug = event.target.href.split('/').at(-1);
			if (!project) { // if a project was not active
				return self.toggleModal();
			};
			return setProject(linkSlug);
		} catch (err) {
			console.log(err)
			return setProject(false);
		}
	}
	this.destory = function () {
		console.log("destroy CatalogModal");
		// TODO
	}
	this._init = function () {
		try {
			listenToCatalogLinks();
			self.nodes.image.insertAdjacentHTML(
				'beforeend', `
					<div data-catalog="modal"
						style="position:absolute;top:0;left:0;width:100%;height:100%;">
							<article></article>
					</div>
				`);
			self.nodes.frame.wrapper = 
				self.nodes.image.querySelector('div[data-catalog="modal"]');
			self.nodes.frame.article =
				self.nodes.frame.wrapper.firstElementChild;
		} catch (err) {
			console.log(err);
		} finally {
			return (
				setModal(true),
				setProject(false)
			);
		}
	}()
};