// console.log('*\n* gatsby-config\n*');
/*
https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
https://www.gatsbyjs.com/plugins/gatsby-plugin-minify/
https://www.gatsbyjs.com/plugins/gatsby-plugin-typescript
https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap
https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/
https://www.gatsbyjs.com/plugins/gatsby-plugin-create-client-paths/
https://guides.github.com/features/mastering-markdown/
*/
module.exports = {
	siteMetadata: {
		author: `@benjamyan`,
		title: `benyan.dev`,
		description: `Portfolio site of Benjamin Yannella.`,
		clientScripts: [
			'plugins.js',
			'utils.js',
			'initial.js',
			'Navigation.js',
			'StickyElement.js',
			'CatalogModal.js',
			'MagicText.js',
			'KillWidows.js',
			'CustomKerning.js',
			'app.js'
		]
	},
	flags: {
		DEV_SSR: true
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-image`,
		`gatsby-transformer-transformer`,
		{
			resolve: `gatsby-plugin-page-creator`,
			options: {
				path: `${__dirname}/src/pages`,
				ignore: [ 
					`_styles/*.js`,
					`_styles/*/*.js`,
					`_static/*.js`,
					`_static/*/*.js`
				]
			}
		},
		{
			resolve: `gatsby-remark-custom-markup`,
			options: {
				// Options here
			}
		},
		{
			// https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/
			resolve: `gatsby-transformer-remark`,
			options: {
				// footnotes: true,
				gfm: true,
				plugins: [
					`gatsby-remark-custom-markup`
				]
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'scripts',
				path: `${__dirname}/static/scripts/`,
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'content',
				path: `${__dirname}/static/content/`,
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `static/media/icon.png`
			}
		},
		// {
		//   resolve: `gatsby-plugin-minify`,
		//   options: {
		//     removeAttributeQuotes: true,
		//     collapseWhitespace: true,
		//     minifyCSS: true,
		//     minifyJS: true,
		//     removeComments: true,
		//     removeEmptyAttributes: true,
		//     removeScriptTypeAttributes: true,
		//     removeStyleLinkTypeAttributes: true,
		//     processConditionalComments: true
		//   }
		// }
	]
};