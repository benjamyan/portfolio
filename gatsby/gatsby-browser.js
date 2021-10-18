// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
// console.log('*\n* gatsby-browser\n*');
//
const React = require('react');
const ReactDOM = require('react-dom');

exports.onClientEntry = () => {
    // console.log("onClientEntry");
    //
    // the dump for html needing to be preloaded somewhere
    const randomString = () => Math.random().toString(36).slice(2);
    const renderDumpId = '_render_' + randomString() + '_' + randomString();
    window.document.body.insertAdjacentHTML(
        'beforeend',
        `<div id="${renderDumpId}" style="display:none!important;"></div>`
    );
    //
    // assign our global variables and other desirables to the window
    window._byd = {
        sbStoryMap: global.STORY_MAP,   // list of all stories
        pageData: [],   // page data as its passed through gatsby
        buildEnv: global.SB_ENV,    // the build env of gatsby
        buildLocation: global.Location,     // domain the build is meant for
        proxies: {},        // object proxies watching for changess
        renderDump: {    // node to render pages into
            container: window.document.getElementById(renderDumpId),
            ref: {}     // a directory of rendered elements
        }
        // renderedPages: {}   // object of rendered pages
    };
};
exports.onInitialClientRender = () => {
    /**
    
    */
    // console.log("onInitialClientRender");
    try {
        window.initMain()
            .then(
                ()=> console.log('All done!')
            );
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
        const { renderDump, proxies } = window._byd;
        const createRenderDumpNode = (slug)=>  {
            // creates the html element to render our page contents into
            //
            const datasetPageslug = `data-pageslug="${slug}"`;
            renderDump.container.insertAdjacentHTML(
                'beforeend', `<div ${ datasetPageslug }></div>`
            );
            return (
                renderDump.container.querySelector(`[${datasetPageslug}]`)
            );
        };
        const newPageData = await loadPage(pathname)
            .then(
                (res)=> {
                    const context = res.json.pageContext;
                    const slug = context.data.slug;
                    return {
                        slug: slug,
                        path: pathname,
                        body: JSON.parse(context.data.content).body,
                        _base: res,
                        _render: createRenderDumpNode(slug)
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
        renderDump.ref[slug] = _render;
        proxies.pageData.push(newPageData);
        /*
        const processJsonResponse = (res) => {
            const resData = res.json.pageContext;
            return {
                _base: res,
                slug: resData.data.slug,
                path: pathname,
                body: JSON.parse(resData.data.content).body
            }
        };
        return await props.loadPage(pathname)
            .then(
                (res) => {
                    const { renderDiv, renderedPages, proxies } = window._byd;
                    const resJson = processJsonResponse(res);
                    const SLUG = resJson.slug;
                    const Component = res.component;
                    renderDiv.insertAdjacentHTML(
                        'beforeend',
                        `<div data-pageslug="${SLUG}"></div>`
                    );
                    renderedPages[SLUG] = renderDiv.querySelector(`div[data-pageslug="${SLUG}"]`);
                    ReactDOM.render(
                        <Component
                            pageContext={resJson._base.json.pageContext}
                            restrictRender={'main'}
                        />,
                        renderedPages[SLUG]
                    );
                    renderedPages[SLUG].innerHTML =
                        renderedPages[SLUG].querySelector('[data-maincontent]').innerHTML
                    return proxies.pageData.push(resJson);
                }
            ).catch(
                err => console.log(err)
            );
        */
    } catch (err) {
        console.log(err)
    }
};