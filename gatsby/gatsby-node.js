console.log('*\n*gatsby-node\n*');
//
const express = require('express');
const path  = require("path");
const ENV = process.env.NODE_ENV;
//
exports.onCreateWebpackConfig = ({ actions, getConfig, plugins })=> {
    console.log("\n-- onCreateWebpackConfig");
    actions.setWebpackConfig({
        node: { 
            fs: 'empty'
        },
        resolve: {
            fallback: {
                'fs': false,
                'os': require.resolve('os-browserify/browser'),
                'path': require.resolve('path-browserify')
            }
        }
    });
};
exports.onCreateDevServer = ({ app }) => {
    console.log("\n-- onCreateDevServer");
    app.use(
        express.json({type: '*/*'})
    );
};
exports.createPages = async function({ actions, graphql }) {
    console.log("\n-- createPages");
    const { createPage } = actions;
    const DATA = await graphql(`
            query MyQuery {
                allStoryblokEntry {
                    nodes {
                        full_slug
                        id
                        uuid
                        field_component
                        content
                    }
                }
            }
        `).then(
            (data) => JSON.parse(
                JSON.stringify(data.data.allStoryblokEntry.nodes)
            )
        ).catch(
            (err)=> console.log(err)
        );
    let newData = [];
    for (const node in DATA) {
        newData.push(DATA[node]);
    };
    return newData.forEach(
        node=> {
            const TEMPLATE = function() {
                const DEFAULT_PATH = `./src/pages/_templates/StandardLayout.js`;
                switch (node.field_component) {
                    default: {
                        return DEFAULT_PATH;
                    };
                };
            }();
            return createPage({
                path: node.full_slug,
                component: path.resolve(TEMPLATE),
                context: {
                    data: node,
                    location: {
                        search: /*ENV === 'development' && */'_storyblok'
                    }
                }
            });
        }
    );
};
exports.onCreatePage = ({ page, actions }) => {
    console.log(`-- onCreatePage - ${page.path}`);
    console.log(process.env.NODE_ENV)
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