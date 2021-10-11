// console.log('*\n* gatsby-browser\n*');
//
// exports.disableCorePrefetching = () => true;
exports.onInitialClientRender = () => {
    window.initFront()
        .then(
            () => console.log("DOM Loaded")
        ).catch(
            err => console.warn(err)
        );
};