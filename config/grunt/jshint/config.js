"use strict";

module.exports = function(files) {

  return {
    options: require("./default-options.js"),

    scripts: {
      options: { node: true },
      files: { src: files.scripts() }
    },

    specs: {
      options: {
        browser: true,
        globals: { require: true, define: true, describe: true, it: true, expect: true }
      },
      files: { src: files.specs() }
    },


    browser: {
      options: {
        browser: true,
        globals: { require: true, define: true }
      },
      files: { src: files.browser() }
    }

  };

};
