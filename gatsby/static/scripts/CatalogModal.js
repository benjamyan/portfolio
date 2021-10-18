const CatalogModal = function(node) {
	const self = this;
	this.nodes = {
		wrapper: node,
		overlay: false,
		list: node.querySelector('*[data-catalog="list"]'),
		image: node.querySelector('*[data-catalog="image"]'),
		links: Array.from(node.getElementsByTagName('a')),
		frame: {
			wrapper: false,
			article: false,
			content: {}
		}
	};
	this.state = {
		project: false,
		setProject: (val)=> self.state.project = val
	};
	const _nodes = self.nodes;
	const _state = self.state;
	const { setProject } = _state;
	//
	const transition = {
		fadeIn(targetEl, cb=null) {
			// console.log('- transition.fadeIn');
			//
			targetEl.style.display = 'block';
			gsap.to(targetEl, {
				duration: 0.5,
				delay: 0.1,
				opacity: 1,
				ease: "sine.out",
				onComplete: !!cb && cb
			});
		},
		fadeOut(targetEl, cb=null) {
			gsap.to(targetEl, {
				duration: 0.5,
				opacity: 0,
				ease: "sine.out",
				onComplete: !!cb && cb
			});
		},
		clearSizeChange(targetEl) {

		},
		fadeOutNodeGetSmol(targetEl) {
			const onCompleteFunc = () => {
				targetEl.setAttribute(
					'style', `display: none !important;`
				);
			}
			return gsap.to(targetEl, {
				duration: 1,
				opacity: 0,
				transform: 'scale(0.975)',
				ease: "sine.out",
				onComplete: onCompleteFunc
			})
		},
		fadeInModalGetBig(targetEl) {
			// console.log('- transition.fadeIn')
			//
			// targetEl.setAttribute(
			// 	'style', 
			// 	(`
			// 		display: block;
			// 		width: ${targetEl.offsetWidth}px;
			// 	`).trim()
			// );
			// targetEl.dataset.origwidth = targetEl.offsetWidth;
			gsap.to( targetEl, {
				duration: 0.5,
				opacity: 1,
				// width: `${window.width - 100}px`,
				// height: `${window.height - 150}px`
			});
		},
		fadeOutModalShrinkBack() {

		}
	};
	const listenToCatalogLinks = ()=> {
		// _nodes.links = ;
		return _nodes.links.forEach(
			link => link.addEventListener('click', self.changeActive)
		);
	};
	const listenToScrollStickImage = ()=> {
		/**
		const bound = {
			top: 100,
			bottom: 500
		};
		const funcToWatch = ()=> {
			if (isInViewport) {
				stickElementToScreen()
				if (boundaryIsHit) {
					stopToWhereBoundaryEnds()
				}
			}
		}
		targetElement.addEventListener(
			'scrolling/swiping?',
			funcToWatch
		);
		*/
	};
	function onModalStateChange() {

	};
	//
	this.addNode = function(nodeDataGroup=[]) {
		// console.log('- addNode');
		const newNodeForFrame = (node)=> {
			const newNode = _nodes.frame.article.cloneNode();
			newNode.dataset.projectname = node.slug;
			newNode.style.display = 'none !important';
			newNode.innerHTML = 
				window._byd.renderDump.ref[node.slug].querySelector('main').innerHTML;
			return newNode;
		};
		for (let i = 0; i < nodeDataGroup.length; i++) {
			const NODE = nodeDataGroup[i];
			const SLUG = NODE.slug;
			const newNode = newNodeForFrame(NODE);
			_nodes.frame.wrapper.insertAdjacentHTML(
				'beforeend', newNode.outerHTML
			);
			_nodes.frame.content[SLUG] =
				_nodes.frame.wrapper.querySelector(`[data-projectname=${SLUG}]`);
			_nodes.frame.content[SLUG].setAttribute(
				'style', 'opacity:0;display:none;'
			);
		}
	}
	this.removeNode = function(data) {
		console.log("- removeNode");
	}
	this.toggleModal = function(slug) {
		// console.log("- toggleModal");
		const { frame, image } = _nodes;
		if (!_state.project) {
			// console.log("- - modal closed");
			// if the modal is closed
			//
			utils.scroll.disable(document.body);
			transition.fadeIn(frame.content[slug]);
			Array.from(image.children)
				.forEach(child => {
					if (child !== frame.wrapper) {
						transition.fadeOut(
							child,
							() => child.style.pointerEvents = 'none'
						)
					}
				});
			_nodes.wrapper.classList.add('active');
			_nodes.overlay.addEventListener(
				'click', self.toggleModal
			);
			setProject(slug);
		} else {
			// console.log("- - modal open");
			// if the modal is open
			//
			utils.scroll.enable(document.body);
			transition.fadeOut(
				frame.content[_state.project]
			);
			Array.from(image.children)
				.forEach(child => {
					if (child !== frame.wrapper) {
						transition.fadeIn(
							child, 
							()=> {
								child.removeAttribute('style')
							}
						);
					}
				});
			_nodes.wrapper.classList.remove('active');
			setProject(false);
		}
	}
	this.changeActive = function(event) {
		// console.log("- changeActive");
		event.preventDefault();
		try {
			const linkSlug = event.target.href.split('/').at(-1);
			if (!_state.project) { // if a project was not active
				return self.toggleModal(linkSlug);
			};
			// setProject(linkSlug);
		} catch (err) {
			console.log(err)
			// setProject(false);
		}
	}
	this.destory = function() {
		console.log("- destroy");
		// TODO
	}
	this._init = function() {
		console.log("-- CatalogModal");
		try {
			_nodes.wrapper.insertAdjacentHTML(
				'afterbegin',
				`<div class="catalog-overlay"></div>`
			);
			_nodes.overlay =
				_nodes.wrapper.querySelector('.catalog-overlay');
			_nodes.image.insertAdjacentHTML(
				'beforeend', `
					<div 
						data-catalog="modal"
						style="position:absolute;top:0;left:0;width:100%;height:100%;">
							<article></article>
					</div>
				`);
			_nodes.frame.wrapper = 
				_nodes.image.querySelector('div[data-catalog="modal"]');
			_nodes.frame.article =
				_nodes.frame.wrapper.firstElementChild;
		} catch (err) {
			console.log(err);
		} finally {
			setProject(false);
			listenToCatalogLinks();
		}
	}()
};