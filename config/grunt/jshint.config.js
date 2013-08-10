"use strict";

var options = require("./jshint.options.js");

var config = {
  options: options,

  specs: {
    options: {
      browser: true,
      globals: {
        // RequireJs
        require: true,
        define: true,
        // Jasmine
        expect: true,
        describe: true,
        it: true
      }
    },
    files: { src: ['spec/**/*.js'] }
  },

  scripts: {
    options: {
      browser: true,
      globals: { require: true, define: true }
    },
    files: { src: ['app/scripts/**/*.js'] }
  },

  config: {
    options: { node: true },
    files: { src: ['*.js', 'config/**/*.js'] }
  }

};

module.exports = config;

