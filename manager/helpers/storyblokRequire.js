const fs        = require('fs');
const { once }  = require('events');
const readline  = require('readline');
//
const convertStrToJsonCompatible = require('./utils/convertStrToJsonCompatible');

const isSbLine = (line)=> {
    if (line.indexOf('export') > -1 && line.indexOf('storyblok') > -1) {
        return true;
    };
    return false;
};
const notSbLine = (line)=> {
    if (line.indexOf('function') > -1 || line.indexOf('export') > -1 || line.indexOf('propTypes') > -1) {
        return true
    }
    return false
};
const getStoryblokItemFromFile = async (path)=> {
    const finalCode = [];
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity
    });
    const processThenPushToFinal = (line)=> {
        if (line.indexOf('=') > -1) {
            return line.split('=')[1];
        };
        return line
    };
    let startFlag = false;
    rl.on('line', (line)=> {
        if (startFlag) {
            if (notSbLine(line)) {
                startFlag = false;
            } else {
                finalCode.push(
                    processThenPushToFinal(line)
                );
            };
        } else if (!startFlag && isSbLine(line)) {
            startFlag = true;
            finalCode.push(
                processThenPushToFinal(line)
            );
        };
    });
    return await once(rl, 'close') && finalCode;
};

module.exports = async function storyblokRequire(path) {
    let currentObj;
    try {
        const sbObject = await getStoryblokItemFromFile(path);
        if (sbObject.length > 5) {
            const testLineBeforeReturn = (line) => {
                if (typeof (line) == 'undefined') {
                    return false;
                } else if (line.indexOf(';') > -1) {
                    line = line.replace(';', '');
                };
                return line.trim();
            };
            const parseThenFilterSbObject = sbObject.map(
                (line) => testLineBeforeReturn(line)
            ).filter(Boolean).join('');
            currentObj = parseThenFilterSbObject;
            return JSON.parse(
                convertStrToJsonCompatible(parseThenFilterSbObject)
            );
        };
        return false
    } catch (err) {
        console.log("\n\nERR! storyblokRequire.js\n")
        console.log(currentObj);
        console.log('\n');
        console.log(err)
        console.log("\nEND err\n\n")
    };
};