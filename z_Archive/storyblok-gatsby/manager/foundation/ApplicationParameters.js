// const StoryblokClient = require('storyblok-js-client');
// const CLIENT = new StoryblokClient({
//     oauthToken: ENV.OAUTH_TOKEN
// });
//
const getPathOfDesiredPayloads = (destination)=> {
    // Defines the path to the object you want to pass to SB
    switch (destination) {
        case ('tasks'): {
            return [ 
                'storyblok/webhooks' 
            ];
        };
        default : {
            return [
                'gatsby/src'
            ];
        };
    };
};
const getTypeOfPayloadAsString = (destination)=> {
    // Define name of object containing the payload passed to SB
    switch (destination) {
        case ('tasks'): {
            return 'task';
        };
        default: {
            return 'component';
        };
    };
};

module.exports = async function ApplicationParameters(args) {
    try {
        const GIVEN = {
            action: args.action ? args.action : 'add',
            type: args.type ? args.type : 'components',
            src: args.src ? args.src : null
        };
        this.params = {
            action: GIVEN.action,
            destination: function() {
                return GIVEN.type
            }(),
            space: process.env.SPACE_ID,
            src: GIVEN.src,
            path: function() {
                return getPathOfDesiredPayloads(GIVEN.type)
            }(),
            type: function() {
                return getTypeOfPayloadAsString(GIVEN.type)
            }(),
            backup: function() {
                if (Object.entries(args).length == 1 || typeof args.backup != 'undefined') {
                    return true;
                }
                return false;
            }()
        };
        return this.params;
        // if (this.params.action === 'update' || this.params.action === 'delete') {
                // const self = this;
        //     try {
        //         const response = await sbClient.get(`spaces/${self.params.space}/${self.params.destination}`);
        //         self.params.existing = response.data;
        //     } catch (err) {
        //         console.log(err.response);
        //     };
        // };
    } catch (err) {
        console.log(err);
        console.trace();
        return process.exit(1);
    };
};