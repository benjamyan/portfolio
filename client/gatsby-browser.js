// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
// console.log('*\n* gatsby-browser\n*');
//
// eslint-disable-next-line
const _byd = GATSBY_BYD;
const React = require('react');
const ReactDOM = require('react-dom');

exports.onClientEntry = () => {
    // console.log("onClientEntry");
    //
    // the dump for html needing to be preloaded somewhere
    const randomString = () => Math.random().toString(36).slice(2);
    const DUMP_ID = '_render_' + randomString() + '_' + randomString();
    window.document.body.insertAdjacentHTML(
        'beforeend',
        `<div id="${DUMP_ID}" style="display:none!important;"></div>`
    );
    //
    // assign our global variables and other desirables to the window
    window._byd = {
        env: _byd.ENV,    // the build env of gatsby -- FORMERLY buildEnv
        location: _byd.AREA,     // domain the build is meant for  -- FORMERLY buildLocation
        pages: _byd.PAGES,   // list of all pages -- FORMERLY: sbStoryMap
        pageData: [],   // page data as its passed through gatsby -- FORMERLY buildEnv
        proxies: {},        // object proxies watching for changess -- FORMERLY buildEnv
        shitass: {    // node to render pages into -- FORMERLY shitass
            container: window.document.getElementById(DUMP_ID),
            ref: {}     // a directory of rendered elements
        }
    };
};
exports.onInitialClientRender = () => {
    /**
    
    */
    // console.log("onInitialClientRender");
    try {
        window.initMain()
            // .then(
            //     ()=> console.log('All done!')
            // );
    } catch (err) {
        console.log(err)
    }
};
exports.onPostPrefetchPathname = async ({ pathname, loadPage })=> {
    /**
    When Gatsby prefetches link data, make the request for the page here
    and render the resulting page into the dom.
    *
    @param pathname <String>
    - The abs link (?) to the page being prefetched
    @param loadPage <Function>
    - Function to fetch and load data for gatsby links
    */
    // console.log("onPostPrefetchPathname");
    try {
        const { shitass, proxies } = window._byd;
        const createshitassNode = (slug)=>  {
            // creates the html element to render our page contents into
            //
            const datasetPageslug = `data-pageslug="${slug}"`;
            shitass.container.insertAdjacentHTML(
                'beforeend', `<div ${ datasetPageslug }></div>`
            );
            return (
                shitass.container.querySelector(`[${datasetPageslug}]`)
            );
        };
        const newPageData = await loadPage(pathname)
            .then(
                (res)=> {
                    const context = res.json.pageContext;
                    const slug = context.data.slug;
                    console.log(res)
                    return {
                        slug: slug,
                        path: pathname,
                        body: JSON.parse(context.data.content).body,
                        _base: res,
                        _render: createshitassNode(slug)
                    };
                }
            ).catch(
                err=> console.log(err)
            );
        const { slug, _render, _base } = newPageData;
        const Component = _base.component;
        ReactDOM.render(
            <Component
                pageContext={ _base.json.pageContext }
                restrictRender={ 'main' }
            />,
            _render
        );
        shitass.ref[slug] = _render;
        proxies.pageData.push(newPageData);
    } catch (err) {
        console.log(err)
    }
};