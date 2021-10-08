require('dotenv').config();
const replace = require('replace-in-file');
const StoryblokClient = require('storyblok-js-client');
const sbManager = new StoryblokClient({
    oauthToken: process.env.OAUTH_TOKEN
});
const addIdToFile = async function (item, resData) {
    try {
        const options = {
            files: item.filename,
            from: /sb_schema_id: 0/g,
            to: `id: ${resData.component.id}`,
        };
        return await replace(options);
    } catch (error) {
        console.error('Error during ID replacement: ', error);
    }
};

const storyblokGet = async function(item) {
    try {
        const sbGetRequest = await sbManager.get(item.destination, {});
        return sbGetRequest;
    } catch (err) {
        console.log(err);
    };
};
const storyblokAdd = async function(item) {
    console.log(`\nAdding: ${item.content.component.name}`);
    await sbManager.post(item.destination, item.content)
        .then( async (res)=> {
            console.log(`-- Added`);
            await addIdToFile(item, res.data);
            console.log(`-- ID updated`);
        }).catch( (err)=> {
            console.log(`-- ERR ${err.response.status} -- ${err.response.statusText}`);
            console.log(item.filename);
        });
};
const storyblokUpdate = async function(item) {
    console.log(`\nUpdating: ${item.content.component.name}`);
    const sbDestination = item.destination + item.content.component.id;
    await sbManager.put(sbDestination, item.content)
        .then( ()=> {
            console.log("-- Updated");
        }).catch( (err)=> {
            console.log(`-- ERR ${err.response.status} -- ${err.response.statusText}`);
            console.log(item.filename);
        });
};
const storyblokDelete = async function(item) {
    console.log(`\nDeleting: ${item.content.component.name}`);
    const sbDestination = item.destination + item.content.component.id;
    await sbManager.delete(sbDestination)
        .then( 
            ()=> console.log("-- Deleted")
        ).catch( 
            (err)=> console.log(`-- ERR ${err.response.status} -- ${err.response.statusText}`)
        );
};

module.exports = async function(sbPayload, callback=false) {
    try {
        const item = sbPayload.payload;
        switch (sbPayload.action) {
            case ('get'): {
                const sbGetData = await storyblokGet(sbPayload);
                if (callback) {
                    return callback(sbGetData);
                };
                return sbGetData;
            };
            case ('add'): {
                await storyblokAdd(item);
                break;
            };
            case ('update'): {
                await storyblokUpdate(item);
                break;
            };
            case ('delete'): {
                await storyblokDelete(item);
                break;
            };
            default: {
                console.warn("Err!");
            };
        };
    } catch (err) {
        console.error(err)
    };
};