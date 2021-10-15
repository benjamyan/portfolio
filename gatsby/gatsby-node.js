// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
console.log('*\n* gatsby-node\n*');
//
require('dotenv').config();
const express = require('express');
const path  = require("path");
const SingleFile = require('webpack-merge-and-include-globally');
const ENV = process.env.NODE_ENV;
//
const _sb = {
    storyMap: {},
    globalComponents: {}
};
exports.createPages = async function({ actions, graphql }) {
    console.log("\n-- createPages");
    //
    const { createPage } = actions;
    const DATA = await graphql(`
            query MyQuery {
                allStoryblokEntry {
                    nodes {
                        full_slug
                        slug
                        id
                        uuid
                        field_component
                        content
                    }
                }
            }
        `).then(
            (data) => {
                const initial = JSON.parse(
                    JSON.stringify(data.data.allStoryblokEntry.nodes)
                );
                return Array.from(Object.values(initial))
            }
        ).catch( 
            (err)=> console.log(err) 
        );
    function FinalDataItem(data) {
        const { theme, details } = JSON.parse(data.content);
        return {
            title: details.title,
            description: details.description,
            image: details.page_image,
            theme: theme.color,
            slug: data.slug,
            full_slug: data.full_slug,
            link: function() {
                if (process.env.SB_ENV === 'development') {
                    return process.env.DEV_URL + data.full_slug;
                }
                return process.env.PROD_URL + data.full_slug;
            }()
        };
    };
    DATA.forEach(
        (node, i, dataArr)=> {
            const TEMPLATE = function () {
                switch (node.field_component) {
                    case 'templates_standard_layout':
                        return `./src/pages/_templates/StandardLayout.js`;
                    case 'templates_project_layout':
                        return `./src/pages/_templates/ProjectLayout.js`;
                    default:
                        return false;
                };
            }();
            if (i === 0) {
                dataArr.forEach( (item)=> {
                    if (item.field_component === 'global') {
                        return _sb.globalComponents[item.slug] = item;
                    };
                    return _sb.storyMap[item.slug] = new FinalDataItem(item)
                });
            };
            if (TEMPLATE) {
                return createPage({
                    path: node.full_slug,
                    component: path.resolve(TEMPLATE),
                    context: {
                        data: node,
                        pages: _sb.storyMap,
                        globals: _sb.globalComponents,
                        location: {
                            search: ENV === 'development' ? '_storyblok' : 'benyan'
                        }
                    }
                });
            };
        }
    );
};
exports.onCreatePage = ({ page, actions }) => {
    console.log(`-- onCreatePage -> ${page.path}`);
    /*
    Overrides the default 404 page so gatsby serves up a rendered page in storyblok
    *
    Make this env dependent. If in prod, just serve a normal 404 page.
    */
    if (ENV == 'development' && page.path === `/404/`) {
        const { createPage } = actions;
        page.matchPath = `/*`;
        createPage(page);
    };
};
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    console.log("\n-- onCreateWebpackConfig");
    const staticScripts = __dirname + '/static/_scripts/';
    actions.setWebpackConfig({
        plugins: [
            new SingleFile({
                // Concat our client scripts into single file
                files: {
                    "scripts/main.js": [
                        path.resolve(staticScripts, 'utils.js'),
                        path.resolve(staticScripts, 'initial.js'),
                        path.resolve(staticScripts, 'Navigation.js'),
                        path.resolve(staticScripts, 'CatalogModal.js'),
                        path.resolve(staticScripts, 'StickyElement.js'),
                        path.resolve(staticScripts, 'MagicText.js'),
                        path.resolve(staticScripts, 'CustomKerning.js'),
                        path.resolve(staticScripts, 'app.js')
                    ]
                }
            }),
            plugins.define({
                // Allows usage of env variables through webpack globals
                global: {
                    SB_ENV: JSON.stringify(process.env.SB_ENV),
                    SERVE_URL: JSON.stringify(process.env.SERVE_URL),
                    DEV_URL: JSON.stringify(process.env.DEV_URL),
                    STAGE_URL: JSON.stringify(process.env.STAGE_URL),
                    PROD_URL: JSON.stringify(process.env.PROD_URL),
                    STORY_MAP: JSON.stringify(_sb.storyMap)
                }
            })
        ]
    });
};
exports.onCreateDevServer = ({ app }) => {
    console.log("\n-- onCreateDevServer");
    app.use(
        express.json({ type: '*/*' })
    );
    app.post('/publish', function (req, res) {
        console.log(req.body);
        res.send(
            `200 - /publish`
        );
    });
};