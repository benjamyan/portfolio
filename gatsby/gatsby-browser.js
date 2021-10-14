// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
// console.log('*\n* gatsby-browser\n*');
//
// exports.disableCorePrefetching = () => true;
exports.onClientEntry = () => {
    // console.log("\n-- onClientEntry");
    window._byd = {
        sbStoryMap: global.STORY_MAP,
        buildEnv: global.SB_ENV
    };
};
exports.onInitialClientRender = () => {
    // console.log("\n-- onInitialClientRender");
    window.initMain()
        .catch(
            err => console.warn(err)
        );
};