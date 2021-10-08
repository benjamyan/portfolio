const storyblokRequire = require('../helpers/storyblokRequire');

class BlokRequest {
    constructor(params, content, src) {
        this.action = params.action.toLowerCase();
        this.payload = {
            destination: `spaces/${params.space}/${params.destination}/`,
            filename: src,
            content: function() {
                const contentKey = params.type.toString();
                return {
                    [contentKey]: content
                };
            }()
        };
    };
};

async function getStoryBloks(items, params) {
    const schemaArr = [];
    if (params.src) {
        items = items.map(
            item=> item.indexOf('/' + params.src + '.js') > -1 ? item : false
        ).filter(Boolean);
    };
    for (let i = 0; i < items.length; i++) {
        const blok = await storyblokRequire(items[i]);
        if (blok.length > 0) {
            schemaArr.push({
                file: items[i],
                data: blok
            });
        };
    };
    return schemaArr
};

module.exports = async function(blokItems, params) {
    const storyblokSchemas = await getStoryBloks(blokItems, params);
    return storyblokSchemas.flatMap(
        blok=> {
            const blokRequests = [];
            for (const item of blok.data) {
                blokRequests.push(
                    new BlokRequest( params, item, blok.file )
                );
            };
            return blokRequests;
        }
    );
}