import { sbGet, sbUpdate } from './storyblokManagement';

export default async function (data, storyObj) {
  const updateObject = (function () {
    return {
      story: {
        name: storyObj.name,
        slug: storyObj.full_slug,
        content: {
          ...storyObj.content,
          _gatsbyApi: (function () {
            const apiObj = {};
            for (const api in sbConfig.gatsbyApi) {
              if (api.startsWith('_')) {
                apiObj[api] = sbConfig.gatsbyApi[api];
              } else {
                apiObj[api] = data.space.domain + sbConfig.gatsbyApi[api];
              }
            }
            return apiObj;
          }()),
        },
      },
      force_update: 1,
    };
  }());
  return sbUpdate(
    `spaces/${sbConfig.spaceId}/stories/${storyObj.id}`,
    updateObject,
    (data) => {
      updateLocalStory(data.story);
      sbGet(
        `cdn/stories/${data.story.id}`,
        {},
      );
    },
  );
}
