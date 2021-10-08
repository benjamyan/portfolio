/*
This component is currently used to serve up rendered page views for storyblok
In the future, an environmental variable will need to be used
1. If is development, serve up the storyblok viewer
2. If in production, serve up the custom 404 page.
*/

import DOMContent from './_templates';

export default function NonExistentPage({ location }) {
  console.log('NonExistentPage');
  const pageContext = {
    location,
  };
  return DOMContent(pageContext);
}
