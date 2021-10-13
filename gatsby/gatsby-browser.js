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
    window.initFront()
        .then(
            ()=> console.log("END initFront")
        ).catch(
            err => console.warn(err)
        );
};