import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta
          httpEquiv="x-ua-compatible"
          content="ie=edge"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          httpEquiv="Cache-control"
          content="no-cache"
        />
        { /* PRELOAD */ }
        <link
          rel="preload"
          as="font"
          href="https://fonts.googleapis.com/css?family=Open+Sans"
        />
        <link
          rel="preload"
          as="font"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" /> 
        {/* <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon/favicon-16x16.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/static/favicon/ms-icon-144x144.png"
        />
        <link
          rel="manifest"
          href="/static/favicon/manifest.json"
        /> */}
        <meta
          name="msapplication-TileColor"
          content="#ffffff"
        />
        <meta
          name="theme-color"
          content="#ffffff"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript>
          Please enable javascript for the full experience.
        </noscript>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script type="text/javascript" src="../scripts/JustifyText.js" />
        <script type="text/javascript" src="../scripts/app.js" />
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
