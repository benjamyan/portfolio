module.exports = function(str) {
    try {
        return str
            // wrap keys without quote with valid double quote
            .replace(/([\$\w]+)\s*:/g, function (_, $1) { return '"' + $1 + '":' })
            // replacing single quote wrapped ones to double quote 
            .replace(/'([^']+)'/g, function (_, $1) { return '"' + $1 + '"' })
        // // replacing double quote wrapped with single quote
        // .replace(/"([^"]+)"/g, function(_, $1){return "'"+$1+"'"}) 
    } catch (err) {
        console.log("\n\nERR! convertStrToJsonCompatible.js")
        console.log(str)
        console.log("\n\nEND err")
    }
};