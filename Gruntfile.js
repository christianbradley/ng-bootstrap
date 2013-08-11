module.exports = function(grunt) {
  "use strict";

  var config = { pkg: grunt.file.readJSON('package.json') };

  config.htmllint = { src: ["app/**/*.{htm,html}"] };
  config.jsonlint = { src: ["*.json", "config/**/*.json", "spec/**/*.json", "app/**/*.json" ] };

  // JsHint:
  config.jshint = {
    options: require("./config/grunt/jshint/default-options.js")
  };

  // JsHint: Configuration
  config.jshint.configScripts = {
    options: { node: true },
    files: { src: ["*.js", "config/**/*.js"] }
  };

  // JsHint:
  config.jshint.specs = {
    files: { src: "spec/**/*.js" },
    options: {
      browser: true,
      globals: { require: true, define: true, describe: true, it: true, expect: true }
    }
  };

  // JsHint: Browser
  config.jshint.browser = {
    files: { src: ["app/scripts/**/*.js", "!app/scripts/vendor/**/*.js"] },
    options: {
      browser: true,
      globals: { require: true, define: true }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-html');

  grunt.registerTask('build', ['jshint', 'jsonlint', 'htmllint']);
  grunt.registerTask('default', ['build']);
};

