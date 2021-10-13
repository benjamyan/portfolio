console.log('*\n* gatsby-browser\n*');
//
// exports.disableCorePrefetching = () => true;
exports.onClientEntry = () => {
    // console.log("\nonClientEntry");
    window.sbGlobal = {
        sbStoryMap: JSON.stringify(global.SB_STORY_MAP),
        currentEnv: JSON.stringify(global.NODE_ENV)
    };
};
exports.onInitialClientRender = () => {
    // console.log("\nonInitialClientRender");
    window.initFront()
        .then(
            () => console.log("Frontned finished")
        ).catch(
            err => console.warn(err)
        );
};