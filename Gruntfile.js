"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: require("./config/grunt/jshint/config.js"),
    exec: {
      jsonlint: {
        command: "scripts/jsonlint-all.sh"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('jsonlint', ['exec:jsonlint']);
  grunt.registerTask('build', ['jshint', 'jsonlint']);
  grunt.registerTask('default', ['build']);
};

