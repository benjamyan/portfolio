// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
console.log('*\n* gatsby-ssr\n*');
//
// eslint-disable-next-line
const _byd = GATSBY_BYD;
const React = require("react");

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
				case 'serve': 	return _links.SERVE;
				case 'dev': 	return _links.DEV;
				case 'staging':	return _links.STAGE;
				case 'prod': 	return _links.PROD;
				default: 	return _links.PROD;
			};
		}();
		setPreBodyComponents([
			<base href={ baseUrl } />
		]);
		//
		// POST BODY
		let scripts;
		if (_byd.ENV === 'prod') {
			scripts = <script type="text/javascript" src="scripts/main.js" />;
		} else {
			scripts = _byd.SCRIPTS.map(
				script => (
					<script type="text/javascript" src={`scripts/${script}`} />
				)
			);
		};
		setPostBodyComponents(scripts);
	} catch (err) {
		console.log(err);
	};
};