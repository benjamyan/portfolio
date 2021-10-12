console.log('*\n* gatsby-node\n*');
//
require('dotenv').config();
const express = require('express');
const { parse } = require('path');
const path  = require("path");
const ENV = process.env.NODE_ENV;
//
exports.onCreateWebpackConfig = ({ actions, getConfig, plugins })=> {
    // console.log("\n-- onCreateWebpackConfig");
    /*
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
    */
};
exports.onCreateDevServer = ({ app }) => {
    console.log("\n-- onCreateDevServer");
    app.use(
        express.json({type: '*/*'})
    );
    app.post('/publish', function (req, res) {
        /*
        Publishes all or specified pages
        *
        Request body: 
        Response body: Array of strings/objects
        */
        console.log(req.body);
        res.send(
            `200 - /publish`
        );
    });
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
    const finalData = {};
    function FinalDataItem(data) {
        const { 
            theme = '', 
            details = [] 
        } = JSON.parse(data.content);
        const {
            slug, full_slug, field_component
        } = data;
        if (details.length > 0 && field_component.indexOf('global') === -1) {
            const { title, description, image } = details[0];
            return {
                title,
                description,
                image: {
                    filename: image.filename,
                    alt: image.alt
                } || false,
                theme: theme.color,
                slug: slug,
                full_slug: full_slug,
                link: function() {
                    if (ENV === 'development') {
                        return process.env.DEV_URL + full_slug;
                    }
                    return process.env.PROD_URL + full_slug;
                }()
            };
        };
        return false;
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
                dataArr.map(
                    item=> finalData[item.slug] = new FinalDataItem(item)
                );
            };
            if (TEMPLATE) {
                const pageContextData = function() {
                    let finalNode = { ...node },
                        initialDetails;
                    finalNode.content = JSON.parse(finalNode.content);
                    initialDetails = { ...finalNode.content.details[0] };
                    finalNode.content.details = { 
                        pages: { ...finalData },
                        current: initialDetails
                    };
                    finalNode.content = JSON.stringify(finalNode.content);
                    return finalNode;
                }();
                return createPage({
                    path: node.full_slug,
                    component: path.resolve(TEMPLATE),
                    context: {
                        data: node,
                        location: {
                            search: ENV === 'development' ? '_storyblok' : 'benyan.dev'
                        }
                    }
                });
            };
        }
    );
};
exports.onCreatePage = ({ page, actions }) => {
    console.log(`-- onCreatePage - ${page.path}`);
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