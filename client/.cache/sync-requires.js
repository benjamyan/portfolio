
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/benjamin/Working/portfolio/client/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/home/benjamin/Working/portfolio/client/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/home/benjamin/Working/portfolio/client/src/pages/index.js")),
  "component---src-pages-templates-project-js": preferDefault(require("/home/benjamin/Working/portfolio/client/src/pages/templates/project.js"))
}

