module.exports = function(grunt) {
  "use strict";

  var config = {};

  config.pkg = grunt.file.readJSON('package.json');

  // HTML Lint
  config.htmlhint = { src: ["app/**/*.{htm,html}"] };

  // JSONLint
  config.jsonlint = { src: ["*.json", "config/**/*.json", "spec/**/*.json", "app/**/*.json" ] };

  // JsHint:
  config.jshint = {
    options: grunt.file.readJSON('config/jshint/jshint.config.json')
  };

  // JsHint: Configuration
  config.jshint.configs = {
    options: { node: true },
    files: { src: ["*.js", "config/**/*.js"] }
  };

  // JsHint: Specs
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

  // Karma Tests
  config.karma = {
    continuous: {
      configFile: 'config/karma/karma.config.js',
      singleRun: true,
      browsers: ['PhantomJS']
    }
  };

  // Connect Server
  config.connect = {
    server: {
      port: 8000,
      base: './app'
    }
  };

  grunt.initConfig(config);

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('build', ['jshint', 'jsonlint', 'htmlhint', 'karma']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ['build']);

};
