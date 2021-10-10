console.log('*\n* gatsby-config\n*');
//
// require('dotenv').config();
// const storyblokOauthToken = (' ' + process.env.GATSBY_OAUTH_TOKEN).slice(1);
// const GatsbySourceStoryblok = {
//   oauthToken: storyblokOauthToken,
//   accessToken: '4Y80bAwp8vMrx8KBD46Epgtt',
//   // spaceId: process.env.GATSBY_SPACE_ID,
//   // oauthToken: process.env.GATSBY_OAUTH_TOKEN,
//   // accessTokenTest: process.env.GATSBY_PREVIEW_TOKEN,
//   version: 'draft',
//   resolveRelations: [
//     'global_reference.reference'
//   ],
//   gatsbyApi: {
//     _headers: {
//       post: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json; charset=UTF-8'
//       }
//     },
//     ancestry: 'ancestry'
//   }
// };
//
module.exports = {
  siteMetadata: {
    title: `SurfAir Gatsby StoryBlok`,
    description: `no`,
    author: `@benjamyan`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: `${__dirname}/static/scripts/`,
      }
    }, // !! everything below was added default by storyblok
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
        version: 'draft'
      }
    }
  ]
};