module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: require("./config/grunt/jshint/config.js")
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};

