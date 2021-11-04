// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
console.log('*\n* gatsby-ssr\n*');
//
// eslint-disable-next-line
const React = require("react");
// const path = require("path");
const _byd = GATSBY_BYD;

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) => {
	// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#onRenderBody
	// console.log('\n-- onRenderBody');
	//
	try {
		//
		// HEAD
		// const globalStyling = require(
		// 	path.resolve(__dirname + '/src/helpers/styles')
		// )
		// console.log(globalStyling)
		// setHeadComponents([
		// 	<style></style>
		// ]);
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
			<base href={ baseUrl } key={'idk-why-this-needs-a-key'} />
		]);
		//
		// POST BODY
		let scripts;
		if (_byd.ENV === 'prod') {
			scripts = <script type="text/javascript" src="scripts/main.js" />;
		} else {
			scripts = _byd.SCRIPTS.map(
				(script, i)=> (
					<script type="text/javascript" src={`scripts/${script}`} key={ `_script_${i}` } />
				)
			);
		};
		setPostBodyComponents(scripts);
	} catch (err) {
		console.log(err);
	};
};