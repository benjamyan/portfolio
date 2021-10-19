// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
console.log('*\n* gatsby-ssr\n*');
//
const React = require("react");
const _byd = __BYD__;

exports.onRenderBody = ({ setPreBodyComponents, setPostBodyComponents }) => {
	// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#onRenderBody
	// console.log('\n-- onRenderBody');
	//
	try {
		//
		// PRE BODY
		const baseUrl = function () {
			const _links = _byd.LINKS;
			switch (_byd.ENV) {
				case 'serving': 	return _links.SERVE;
				case 'development': return _links.DEV;
				case 'staging': 	return _links.STAGE;
				case 'production': return _links.DEV;
				default: return _links.DEV;
				// case 'production': 	return _links.PROD;
				// default: return _links.PROD;
			};
		}();
		setPreBodyComponents([
			<base href={ baseUrl } />
		]);
		//
		// POST BODY
		let scripts;
		if (_byd.ENV !== 'production') {
			scripts = _byd.SCRIPTS.map(
				script => (
					<script type="text/javascript" src={`scripts/${script}`} />
				)
			);
		} else {
			scripts = <script type="text/javascript" src="scripts/main.js" />;
		};
		setPostBodyComponents(scripts);
	} catch (err) {
		console.log(err);
	};
};