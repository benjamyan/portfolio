// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
console.log('*\n* gatsby-ssr\n*');
//
// eslint-disable-next-line
require('./gatsby-setup').utils();
const React = require("react");
const _byd = GATSBY_BYD;

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) => {
	// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#onRenderBody
	// console.log('\n-- onRenderBody');
	//
	try {
		/*#region -- preBody*/
		const base = function() {
			const _links = _byd.LINKS;
			let locationUrl = '';
			switch (_byd.ENV) {
				case 'serve': 
					locationUrl = _links.SERVE;
					break;
				case 'dev': 
					locationUrl = _links.DEV;
					break;
				case 'staging': 
					locationUrl = _links.STAGE;
					break;
				case 'prod': 
					locationUrl = _links.PROD;
					break;
				default: 
					locationUrl = _links.PROD;
			};
			return (
				<base href={locationUrl} key={'_ssr_base'} />
			)
		}()
		// const staticVariables = function() {
		// 	const varList = ['env', 'area', 'pages'];
		// 	const variables = varList.map(
		// 		variable => (
		// 			<meta
		// 				name={variable}
		// 				content={_byd[variable.toUpperCase()]}
		// 				key={'_ssr_param_' + global.randomStr()}
		// 			/>
		// 		)
		// 	);
		// 	return (
		// 		<div>
		// 			{...variables }
		// 		</div>
		// 	)
		// }
		setPreBodyComponents([base]);
		/*#endregion*/
		
		/*#region -- postBody*/
		const scripts = function() {
			if (_byd.ENV !== 'prod') {
				return _byd.SCRIPTS.map(
					(script, i) => (
						<script
							type="text/javascript"
							src={`scripts/${script}`}
							key={`_ssr_script-${i}_${global.randomStr()}`}
						/>
					)
				);
			}
			return [
				<script
					type="text/javascript"
					src="scripts/main.js"
					key={`_ssr_script}`}
				/>
			];
		}()
		setPostBodyComponents(scripts);
		/*#endregion*/
	} catch (err) {
		console.log(err);
	};
};