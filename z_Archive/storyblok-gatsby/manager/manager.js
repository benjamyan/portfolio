/*
Central manager for all StoryBlok related dev operations
*/
require('dotenv');
const fsp = require('fs').promises;
const path = require('path');
const ARGV = require('minimist')(process.argv.slice(2));
//
const AppParamsFromCliArgs  = require('./foundation/ApplicationParameters');
const getSbSchemaFromFiles  = require('./foundation/parseFilesForSbSchemas');
const arrayOfSbPayloads     = require('./request/requestPayloads');
const storyblokRequest      = require('./request/apiRequestCalls');
//
// Backup
const backupStoryblok = async (params)=> {
    try {
        if (!params.backup) return;
        console.log("\n*********************\nStarting backup\n");
        const getData = await storyblokRequest({
            action: 'get',
            destination: `spaces/${params.space}/${params.destination}/`,
            payload: {}
        });
        const timestamp = JSON.stringify(new Date()).replace(/(:)|(\.)/g, '-').toLowerCase();
        const filename = `space${params.space}--${timestamp.replace(/(")/g, '')}.json`;
        const filepath = path.resolve(__dirname, '..');
        await fsp.writeFile(
            `${filepath}/storyblok/backup/${filename}`, 
            JSON.stringify(getData.data)
        );
        console.log(`-- File created: ${filename}`);
        console.log("\nBackup done");
        return;
    } catch (err) {
        console.error(err);
        return process.exit(1);
    };
};
//
// Main
(async function main() {
    // const StoryblokClient = require('storyblok-js-client');
    // const sbManager = new StoryblokClient({
    //     oauthToken: process.env.OAUTH_TOKEN
    // });
    // sbManager.get(`spaces/${process.env.SPACE_ID}/component_groups/`, {})
    //     .then(response => {
    //         console.log(response.data.component_groups)
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // return
    const AppParams = await AppParamsFromCliArgs(ARGV);
    backupStoryblok(AppParams)
        .then(
            async ()=> {
                console.log(`\n*********************\n\nStarting: ${AppParams.action} ${params.type}\n`);
                const gatsbyBlokItems = await getSbSchemaFromFiles(AppParams);
                const sbRequestPayloads = await arrayOfSbPayloads(gatsbyBlokItems, AppParams);
                for (let i = 0; i < sbRequestPayloads.length; i++) {
                    const REQUEST = sbRequestPayloads[i];
                    await storyblokRequest(REQUEST);
                };
                console.log("\n*********************\n\nDone!\n");
                return process.exit(0);
            }
        ).catch(
            (err)=> {
                console.error(err);
                return process.exit(1);
            }
        );
})();