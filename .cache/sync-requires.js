const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/home/lewis/gatsbychat/src/pages/404.js"))),
  "component---src-pages-home-js": hot(preferDefault(require("/home/lewis/gatsbychat/src/pages/Home.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/lewis/gatsbychat/src/pages/index.js")))
}

