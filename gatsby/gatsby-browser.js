// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
// console.log('*\n* gatsby-browser\n*');
//
const React = require('react');
const ReactDOM = require('react-dom');

exports.onClientEntry = () => {
    // console.log("onClientEntry");
    //
    // assign our global variables and other desirables to the window
    window._byd = {
        sbStoryMap: global.STORY_MAP,   // list of all stories
        pageData: [],   // page data as its passed through gatsby
        buildEnv: global.SB_ENV,    // the build env of gatsby
        buildLocation: global.Location,
        proxies: {},        // object proxies watching for changes
        renderDiv: window.document.getElementById(renderDumpId),    // node to render pages into
        renderedPages: {}   // object of rendered pages
    };
    //
    // build dump for html needing to be preloaded somewhere
    const randomString = () => Math.random().toString(36).slice(2);
    const renderDumpId = '_render_' + randomString() + '_' + randomString();
    window.document.body.insertAdjacentHTML(
        'beforeend',
        `<div id="${renderDumpId}" style="display:none!important;"></div>`
    );
};
exports.onInitialClientRender = () => {
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
exports.onPrefetchPathname = ({...props})=> {
    // console.log("onPrefetchPathname")
    // console.log(props)
};
exports.onPostPrefetchPathname = async ({ pathname, ...props })=> {
    // console.log("onPostPrefetchPathname");
    const processJsonResponse = (res)=> {
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
                return proxies.pageData.push( resJson );
            }
        ).catch(
            err=> console.log(err)
        );
};