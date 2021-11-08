// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
// console.log('*\n* gatsby-browser\n*');
//
const React = require('react');
const ReactDOM = require('react-dom');
// eslint-disable-next-line
const _byd = GATSBY_BYD;
const setup = require('./gatsby-setup');
setup.utils();

exports.onClientEntry = () => {
    // console.log("onClientEntry");
    //
    // the dump for html needing to be preloaded somewhere
    const DUMP_ID = '_render_' + global.randomStr() + '_' + global.randomStr();
    window.document.body.insertAdjacentHTML(
        'beforeend',
        `<div id="${DUMP_ID}" style="display:none!important;"></div>`
    );
    //
    // assign our global variables and other desirables to the window
    window._byd = {
        env: _byd.ENV,    // the build env of gatsby -- FORMERLY buildEnv
        location: _byd.AREA,     // domain the build is meant for  -- FORMERLY buildLocation
        // pages: _byd.PAGES,  // list of all pages -- FORMERLY: sbStoryMap
        // pageData: [],   // page data as its passed through gatsby
        proxies: {},        // object proxies watching for changess
        pages: {
            initialData: _byd.PAGES,
            activePage: [ 'initial' ],
            activeView: 'walkthrough',
            walkthrough_order: setup.walkthroughOrder,
            portfolio_order: setup.portfolioOrder
        },
        renders: {    // node to render HTML into -- FORMERLY renders
            container: window.document.getElementById(DUMP_ID),
            ref: {}     // a directory of rendered elements
        }
    };
};
exports.onInitialClientRender = () => {
    // console.log("onInitialClientRender");
    try {
        window.initMain()
    } catch (err) {
        console.log(err)
    }
};
exports.onPostPrefetchPathname = async ({ pathname, loadPage })=> {
    // console.log("onPostPrefetchPathname");
    /**
    When Gatsby prefetches link data, make the request for the page here
    and render the resulting page into the dom.
    *
    @param pathname <String>
    - The abs link (?) to the page being prefetched
    @param loadPage <Function>
    - Function to fetch and load data for gatsby links
    */
    try {
        const { renders, proxies } = window._byd;
        const createrendersNode = (slug)=>  {
            // creates the html element to render our page contents into
            //
            const datasetPageslug = `data-pageslug="${slug}"`;
            renders.container.insertAdjacentHTML(
                'beforeend', `<div ${ datasetPageslug }></div>`
            );
            return (
                renders.container.querySelector(`[${datasetPageslug}]`)
            );
        };
        const newPageData = await loadPage(pathname)
            .then(
                (res)=> {
                    const { content } = res.json.pageContext;
                    if (!!content) {
                        const slug = content.data.slug || false;
                        return {
                            slug: slug,
                            path: pathname,
                            body: JSON.parse(content.data.content).body,
                            _base: res,
                            _render: createrendersNode(slug)
                        };
                    } throw '!slug';
                }
            ).catch(
                err=> console.log(err)
            );
        if (!!newPageData) {
            const { slug, _render, _base } = newPageData;
            const Component = _base.component;
            ReactDOM.render(
                <Component
                    pageContext={_base.json.pageContext}
                    restrictRender={'main'}
                />,
                _render
            );
            renders.ref[slug] = _render;
            proxies.pageData.push(newPageData);
        } else throw '!page-data';
    } catch (err) {
        console.log(err)
    }
};
exports.onRouteUpdate = ({ location, prevLocation }) => {
    console.log("Gatsby onRouteUpdate")
};