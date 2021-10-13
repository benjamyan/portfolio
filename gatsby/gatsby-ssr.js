// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
console.log('*\n* gatsby-ssr\n*');
//
const React = require("react");

exports.onRenderBody = ({ setPreBodyComponents, setPostBodyComponents }) => {
	// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#onRenderBody
	console.log('\n-- onRenderBody');
	//
	try {
		const baseUrl = function () {
			switch (global.SB_ENV) {
				case 'serving':
					return global.SERVE_URL;
				case 'development':
					return global.DEV_URL;
				case 'staging':
					return global.STAGE_URL;
				case 'production':
					return global.PROD_URL;
				default:
					return global.PROD_URL;
			};
		}();
		//
		setPreBodyComponents([
			<base href={ baseUrl } />
		]);
		setPostBodyComponents([
			<script type="text/javascript" src="../scripts/MagicText.js" />,
			<script type="text/javascript" src="../scripts/app.js"></script>
		]);
	} catch (err) {
		console.log(err);
	};
};