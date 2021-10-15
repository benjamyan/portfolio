// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
// console.log('*\n* gatsby-browser\n*');
//
const React = require('react');
const ReactDOM = require('react-dom');

exports.onClientEntry = () => {
    // console.log("onClientEntry");
    //
    const randomString = ()=> Math.random().toString(36).slice(2);
    const renderDumpId = '_render_' + randomString() + '_' + randomString();
    window.document.body.insertAdjacentHTML(
        'beforeend',
        `<div id="${renderDumpId}" style="display:none!important;"></div>`
    );
    window._byd = {
        sbStoryMap: global.STORY_MAP,
        pageData: [],
        buildEnv: global.SB_ENV,
        buildLocation: global.Location,
        proxies: {},
        renderDiv: window.document.getElementById(renderDumpId),
        renderedPages: {}
    };
};
exports.onInitialClientRender = () => {
    // console.log("onInitialClientRender");
    window.initMain()
        .catch(
            err => console.warn(err)
        );
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
                const Component = res.component;
                const resJson = processJsonResponse(res);
                const SLUG = resJson.slug;
                renderDiv.insertAdjacentHTML(
                    'beforeend', 
                    `<div data-pageslug="${SLUG}"></div>`
                );
                renderedPages[SLUG] = renderDiv.querySelector(`div[data-pageslug="${SLUG}"]`);
                ReactDOM.render(
                    <Component pageContext={resJson._base.json.pageContext} />,
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