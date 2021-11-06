// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
console.log('*\n* gatsby-node\n*');
//
require('dotenv').config();
const path  = require("path");
const SingleFile = require('webpack-merge-and-include-globally');
const config = require('./gatsby-config');
const _byd = {
    env: process.env.BUILD_ENV,
    area: process.env.BUILD_ENV === 'prod' ? 'prod' : 'dev',
    pages: {},
    scripts: config.siteMetadata.clientScripts
};

/* createPages
exports.createPages = async function({ actions, graphql }) {
    console.log("\n-- createPages");
    //
    const { createPage } = actions;
    const DATA = await graphql(`
            query MyQuery {
                allMarkdownRemark {
                    nodes {
                        html
                        frontmatter {
                            slug
                            template
                            name
                            title
                            theme
                            image
                            description
                        }
                    }
                }
            }
        `).then(
            ({data}) => {
                const initial = JSON.parse(
                    JSON.stringify(data.allMarkdownRemark.nodes)
                );
                return Array.from(Object.values(initial))
            }
        ).catch( 
            (err)=> console.log(err) 
        );
    function FinalDataItem({ frontmatter }) {
        return {
            title: frontmatter.title || '!title',
            description: frontmatter.description || '!description',
            image: frontmatter.image || '!image',
            theme: frontmatter.theme || '!theme',
            slug: frontmatter.slug || '!slug',
            link: function() {
                if (_byd.env === 'development') {
                    return (process.env.DEV_URL + frontmatter.slug) || '!link';
                }
                return (process.env.PROD_URL + frontmatter.slug) || '!link';
            }()
        };
    };
    try {
        for (let i = 0; i < DATA.length; i++) {
            if (DATA[i].html !== '') {
                const node = DATA[i];
                const TEMPLATE = function () {
                    switch (node.frontmatter.template) {
                        case 'index':
                            return `./src/pages/index.js`;
                        case 'project':
                            return `./src/pages/templates/project.js`;
                        default:
                            return `./src/pages/404.js`;
                    };
                }();
                if (i === 0) {
                    DATA.forEach(
                        (item) => _byd.pages[item.name] = new FinalDataItem(item)
                    );
                };
                createPage({
                    path: node.frontmatter.slug,
                    component: path.resolve(TEMPLATE),
                    context: {
                        markdown: node,
                        pages: _byd.pages,
                        location: _byd.area
                    }
                });
            }
        }
    } catch (err) {
        console.log(err)
        return;
    }
};
*/
exports.onCreatePage = ({ page, actions }) => {
    // console.log(`-- onCreatePage -> ${page.path}`);
    /*
    Overrides the default 404 page so gatsby serves up a rendered page in storyblok
    *
    Make this env dependent. If in prod, just serve a normal 404 page.
    */
    // if (_byd.buildEnv === 'dev' && page.path === `/404/`) {
    //     const { createPage } = actions;
    //     page.matchPath = `/*`;
    //     createPage(page);
    // };
};
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    console.log("\n-- onCreateWebpackConfig");
    if (_byd.env === 'production') {
        const filesToConcat = config.siteMetadata.clientScripts.map(
            (script) => path.resolve(`${__dirname}/static/scripts/`, script)
        );
        actions.setWebpackConfig({
            plugins: [
                new SingleFile({
                    files: { // Concat our client scripts into single file
                        "scripts/main.js": [ ...filesToConcat ]
                    }
                })
            ]
        })
    };
    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                GATSBY_BYD: {
                    ENV: JSON.stringify(_byd.env),
                    AREA: JSON.stringify(_byd.area),
                    SCRIPTS: JSON.stringify(_byd.scripts),
                    PAGES: JSON.stringify(_byd.pages),
                    LINKS: {
                        SERVE: JSON.stringify(process.env.SERVE_URL),
                        DEV: JSON.stringify(process.env.DEV_URL),
                        STAGE: JSON.stringify(process.env.STAGE_URL),
                        PROD: JSON.stringify(process.env.PROD_URL)
                    }
                }
            })
        ]
    });
};
