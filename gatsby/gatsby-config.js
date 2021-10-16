// console.log('*\n* gatsby-config\n*');
/*
https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
https://www.gatsbyjs.com/plugins/gatsby-plugin-minify/
https://www.gatsbyjs.com/plugins/gatsby-plugin-typescript
https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap
https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/
https://www.gatsbyjs.com/plugins/gatsby-plugin-create-client-paths/
*/
module.exports = {
  siteMetadata: {
    title: `SurfAir Gatsby StoryBlok`,
    description: `no`,
    author: `@benjamyan`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [ 
          `_templates/*.js`, 
          `_templates/*/*.js`,
          `_static/*.js`,
          `_static/*/*.js`
        ]
      }
    }, 
    // {
    //   resolve: `gatsby-plugin-page-creator`,
    //   options: {
    //     path: `${__dirname}/static`,
    //     ignore: [
    //       `_scripts/*`,
    //       `_scripts/*.js`,
    //       `_scripts/*/*.js`,
    //       `_plugin/*`,
    //       `_plugin/*.js`,
    //       `_plugin/*/*.js`
    //     ]
    //   }
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: `${__dirname}/static/_scripts/`,
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
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        spaceId: process.env.SPACE_ID,
        oauthToken: process.env.OAUTH_TOKEN,
        accessToken: '4Y80bAwp8vMrx8KBD46Epgtt',
        // accessToken: process.env.PREVIEW_TOKEN,
        version: 'draft',
        resolveRelations: [
          'global_components.reference'
        ]
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