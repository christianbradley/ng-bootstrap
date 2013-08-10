"use strict";

var options = require("./jshint.options.js");
options.ignores = ['node_modules/**', 'app/components/**'];

var config = {
  options: options,

  json: {
    options: { strict: false },
    files: { src: ["**/*.json"] },
  },

  scripts: {
    options: {
      node: true,
      ignores: ['node_modules/**', 'app/components/**', 'spec/**', 'app/scripts/**']
    },
    files: { src: ['**/*.js'] }
  },

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

  browser: {
    options: {
      browser: true,
      globals: { require: true, define: true }
    },
    files: { src: ['app/scripts/**/*.js'] }
  }

};

module.exports = config;

