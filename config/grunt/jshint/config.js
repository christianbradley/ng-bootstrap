"use strict";

module.exports = {

  options: require("./default-options.js"),

  // Use JSON lint?
  json: {
    options: { strict: false },
    files: { src: ["**/*.json"] },
  },

  scripts: require("./scripts.js"),
  specs: require("./specs.js"),
  browser: require("./browser.js")

};
