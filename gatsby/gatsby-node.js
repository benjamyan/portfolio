// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
console.log('*\n* gatsby-node\n*');
//
require('dotenv').config();
const config = require('./gatsby-config');
const express = require('express');
const path  = require("path");
const SingleFile = require('webpack-merge-and-include-globally');
console.log(process.env.SB_ENV)
const _byd = {
    buildEnv: process.env.SB_ENV,
    buildArea: process.env.SB_ENV === 'dev' ? '_storyblok' : '_benyan',
    sbStoryMap: {},
    globalComponents: {},
    clientScripts: config.siteMetadata.clientScripts
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
                // if (config.flags.SB_ENV === 'development') {
                if (_byd.buildEnv === 'development') {
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
                        _byd.globalComponents[item.slug] = item;
                        return;
                    };
                    _byd.sbStoryMap[item.slug] = new FinalDataItem(item);
                });
            };
            if (TEMPLATE) {
                return createPage({
                    path: node.full_slug,
                    component: path.resolve(TEMPLATE),
                    context: {
                        data: node,
                        pages: _byd.sbStoryMap,
                        globals: _byd.globalComponents,
                        location: {
                            search: _byd.buildArea
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
    if (_byd.buildEnv === 'dev' && page.path === `/404/`) {
        const { createPage } = actions;
        page.matchPath = `/*`;
        createPage(page);
    };
};
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    console.log("\n-- onCreateWebpackConfig");
    if (_byd.buildEnv === 'production') {
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
            plugins.define({ // Allows usage of env variables through webpack globals
                __BYD__: {
                    ENV: JSON.stringify(_byd.buildEnv),
                    AREA: JSON.stringify(_byd.buildArea),
                    SCRIPTS: JSON.stringify(_byd.clientScripts),
                    STORIES: JSON.stringify(_byd.sbStoryMap),
                    LINKS: {
                        SERVE: JSON.stringify(process.env.SERVE_URL),
                        DEV: JSON.stringify(process.env.DEV_URL),
                        STAGE: JSON.stringify(process.env.STAGE_URL),
                        PROD: JSON.stringify(process.env.PROD_URL),
                    }
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