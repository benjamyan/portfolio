import StoryblokClient from 'storyblok-js-client';
import config from '../../../gatsby-config';
//
const sbConfig = config.plugins.find(
  (item) => item.resolve === 'gatsby-source-storyblok',
).options;
const StoryblokCDN = new StoryblokClient({
  authToken: sbConfig.accessToken,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});
const StoryblokMGMT = new StoryblokClient({
  oauthToken: sbConfig.oauthToken,
});
//
async function sbGet(urlPath, sbObject = {}, callback = false) {
  // https://www.storyblok.com/docs/api/content-delivery#topics/introduction
  // console.log("sbGet");
  StoryblokCDN.get(urlPath, {
    token: sbConfig.accessToken,
    version: sbConfig.version,
    resolve_relations: sbConfig.resolveRelations,
    ...sbObject,
  })
    .then(({ data }) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
async function sbUpdate(urlPath, sbObject = {}, callback = false) {
  // https://www.storyblok.com/docs/api/management#topics/authentication
  // console.log("sbUpdate");
  StoryblokMGMT.put(urlPath, {
    ...sbObject,
  })
    .then(({ data }) => {
      if (callback) {
        callback(data);
      }
    })
    .catch(
      (err) => console.log(err),
    );
}
//
export {
  sbGet,
  sbUpdate,
};
