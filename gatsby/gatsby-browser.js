// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
// console.log('*\n* gatsby-browser\n*');
//
exports.onClientEntry = () => {
    // console.log("onClientEntry");
    window._byd = {
        sbStoryMap: global.STORY_MAP,
        pageData: [],
        buildEnv: global.SB_ENV
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
    // console.log("onPostPrefetchPathname")
    const processJsonResponse = (res)=> {
        const resData = res.json.pageContext;
        return {
            slug: resData.data.slug,
            path: pathname,
            body: JSON.parse(resData.data.content).body
        }
    };
    return await props.loadPage(pathname)
        .then(
            (res) => {
                const pageJson = processJsonResponse(res);
                window._byd.pageData.push(
                    pageJson
                );
            }
        ).catch(
            err=> console.log(err)
        );
};