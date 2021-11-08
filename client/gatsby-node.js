// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
console.log('*\n* gatsby-node\n*');
//
require('dotenv').config();
const path  = require("path");
const SingleFile = require('webpack-merge-and-include-globally');
const resolveJsonTextContent = require('./services/resolveJsonTextContent');
const config = require('./gatsby-config');

/*#region -- */
const _setup = require('./gatsby-setup');
_setup.utils();
const _byd = {
    env: process.env.BUILD_ENV,
    area: process.env.BUILD_ENV === 'prod' ? 'prod' : 'dev',
    pages: {},
    scripts: _setup.scripts
};
const templates = _setup.templates;
/*#endregion*/

exports.createPages = async function({ actions, graphql }) {
    console.log("\n-- createPages");
    //
    const DATA = await graphql(`
            query MyQuery {
                allFile(filter: {extension: {eq: "json"}, dir: {regex: "/(static/content)/"}}) {
                    nodes {
                        dir
                        relativePath
                    }
                }
            }
        `).then(
            ({data}) => {
                const { allFile } = data;
                return allFile.nodes.map(
                        (file) => {
                            if (file.relativePath.startsWith('_')) {
                                return false;
                            }
                        console.log(file.relativePath)
                            return require(
                                path.resolve('.' + file.dir.split(__dirname)[1] + '/' + file.relativePath)
                            )
                        }
                    ).filter(Boolean)
            }
        ).catch( 
            (err)=> console.log(err) 
        );
    try {
        function FinalDataItem({ frontmatter, body }) {
            const absoluteUrl = function () {
                if (_byd.env === 'development') {
                    return (process.env.DEV_URL + frontmatter.slug) || '!link';
                }
                return (process.env.PROD_URL + frontmatter.slug) || '!link';
            }()
            return {
                title: frontmatter.title || '!title',
                description: frontmatter.description || '!description',
                image: frontmatter.image || '!image',
                theme: frontmatter.theme || '!theme',
                slug: frontmatter.slug || '!slug',
                url: absoluteUrl || '!link',
                body: resolveJsonTextContent(body)
            };
        };
        for (let i = 0; i < DATA.length; i++) {
            if (DATA[i].body !== '') {
                const node = DATA[i];
                if (!!node.frontmatter.template) {
                    if (i === 0) {
                        DATA.forEach(
                            (node) => _byd.pages[node.frontmatter.name] = new FinalDataItem(node)
                        );
                    };
                    actions.createPage({
                        path: (
                            node.frontmatter.slug == '' ? '/' : node.frontmatter.slug
                        ),
                        component: (
                            path.resolve(templates[node.frontmatter.template])
                        ),
                        context: {
                            content: resolveJsonTextContent(node.body),
                            pages: _byd.pages,
                            location: _byd.area
                        }
                    });
                }
            }
        }
    } catch (err) {
        console.log(err)
        return;
    }
};
exports.onCreatePage = ({ page, actions }) => {
    console.log(`-- onCreatePage -> ${page.path}`);
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
