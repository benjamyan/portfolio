const fs = require('fs');
const path = require('path');

module.exports = async function(params) {
    const fileArr = [];
    function getFiles(dir) {
        const FILES = fs.readdirSync(dir);
        for (let i in FILES){
            let name = dir + '/' + FILES[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name, fileArr);
            } else {
                fileArr.push(name);
            };
        };
    };
    for (let i = 0; i < params.path.length; i++) {
        getFiles(`${path.resolve(__dirname, '../..')}/${params.path[i]}`)
    };
    return fileArr.map(
        file=> file.endsWith('.js') && file
    ).filter(Boolean);
};