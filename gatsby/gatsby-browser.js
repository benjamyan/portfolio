console.log('*\n* gatsby-browser\n*');
//
exports.disableCorePrefetching = () => true;
exports.onInitialClientRender = () => {
    // console.l;og("ReactDOM.render has executed");
    window.initFront()
        .then(
            () => console.log("DOM Loaded")
        ).catch(
            err => console.warn(err)
        );
};