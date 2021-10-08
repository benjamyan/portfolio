import React from 'react';
import { Helmet } from 'react-helmet';

const OgMetaTags = ({ site }) => {
  return <></>;
  /*
  const siteSplit = site.split('/');
  const siteName = (function () {
    // 
  }());
  return (
    <>
      <meta
        property="og:site_name"
        content=""
      />
      <meta
        property="og:type"
        content=""
      />
      <meta
        property="og:url"
        content=""
      />
    </>
  );
  */
};
const SeoMetaTags = ({ meta }) => {
  return <></>;
  /*
  return (
    <>
      <meta
        name="twitter:image"
        content={meta.image}
      />
      <meta
        name="twitter:description"
        content={meta.description}
      />
      <meta
        name="description"
        content={meta.description}
      />
      <meta
        name="twitter:title"
        content={meta.title}
      />
      <meta
        name="og:title"
        content={meta.title}
      />
      <title>{ meta.title }</title>
    </>
  );
  */
};

export default function Meta({ site, meta }) {
  return (
    <>
      <Helmet>
        <OgMetaTags site={site} />
        <SeoMetaTags meta={ meta } />
      </Helmet>
    </>
  );
}
