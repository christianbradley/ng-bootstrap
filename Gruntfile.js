"use strict";

function ProjectFiles() {
  var self = this;
  var glob = require("glob");
  var path = require("path");
  var files = {};

  function isProjectFile(path) {
    return !path.match("vendor");
  }

  function filesOfType(type) {
    var root = path.resolve(__dirname);
    var locals = glob.sync(root + "/*." + type);
    var recurse = glob.sync(root + "/!(node_modules|bower_components)/**/*." + type);
    return locals.concat(recurse).filter(isProjectFile);
  }

  function inAppScriptsDir(path) { return path.match("app/scripts/"); }
  function inSpecsDir(path) { return path.match("spec/"); }

  this.ofType = function(type) {
    return files[type] || (files[type] = filesOfType(type));
  };

  this.html = function() {
    return self.ofType("html");
  };

  this.json = function() {
    return self.ofType("json");
  };

  this.js = function() {
    return self.ofType("js");
  };

  this.browser = function() {
    return self.js().filter(inAppScriptsDir);
  };

  this.specs = function() {
    return self.js().filter(inSpecsDir);
  };

  this.scripts = function() {
    return self.js().filter(function(path) {
      return !inAppScriptsDir(path) && !inSpecsDir(path);
    });
  };

}

module.exports = function(grunt) {
  var files = new ProjectFiles();

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmllint: { all: files.ofType("html") },
    jsonlint: { all: files.ofType("json") },
    jshint: require("./config/grunt/jshint/config.js")(files)
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('build', ['jshint', 'jsonlint', 'htmllint']);
  grunt.registerTask('default', ['build']);
};

