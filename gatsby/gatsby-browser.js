// console.log('*\n* gatsby-browser\n*');
//
// exports.disableCorePrefetching = () => true;
exports.onClientEntry = () => {
    console.log("We've started!");
}
exports.onInitialClientRender = () => {
    console.log("ReactDOM.render has executed")
}