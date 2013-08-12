module.exports = function(grunt) {
  "use strict";

  function currentBranchCommand(cmd) {
    return [
      "git rev-parse --abbrev-ref HEAD",
      "awk -F'/' '{print $2}'",
      "xargs " + cmd
    ].join(" | ");
  }

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

  config.exec = {
    options: {
      stdout: true,
      stderr: true,
    },

    startHotfix: {
      cmd: function(name) { return "git flow hotfix start " + name; }
    },

    finishHotfix: {
      cmd: function(name) { return "git flow hotfix finish " + name; }
    },

    finishCurrentHotfix: {
      cmd: function() { return currentBranchCommand("git flow hotfix finish"); }
    },

    startFeature: {
      cmd: function(name) { return "git flow feature start " + name; }
    },

    finishFeature: {
      cmd: function(name) { return "git flow feature finish " + name; }
    },

    finishCurrentFeature: {
      cmd: function() { return currentBranchCommand("git flow feature finish"); }
    },

    pullFeature: {
      cmd: function(remote, name) { return "git flow feature pull " + remote + " " + name; }
    },

    publishFeature: {
      cmd: function(name) { return "git flow feature publish " + name; }
    },

    publishCurrentFeature: {
      cmd: function() { return currentBranchCommand("git flow feature publish"); },
    },

    startRelease: {
      cmd: function(version) { return "git flow release start " + version; }
    },

    finishRelease: {
      cmd: function(name) { return "git flow release finish " + name; }
    },

    finishCurrentRelease: {
      cmd: function() { return currentBranchCommand("git flow release finish"); },
    }

  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('feature:start', ['exec:startFeature']);
  grunt.registerTask('feature:finish', ['build', 'exec:finishFeature']);
  grunt.registerTask('feature:finish:current', ['build', 'exec:finishCurrentFeature']);

  grunt.registerTask('feature:pull', ['exec:pullFeature']);
  grunt.registerTask('feature:publish', ['build', 'exec:publishFeature']);
  grunt.registerTask('feature:publish:current', ['build', 'exec:publishCurrentFeature']);

  grunt.registerTask('hotfix:start', ['exec:startHotfix']);
  grunt.registerTask('hotfix:finish', ['exec:finishHotfix']);
  grunt.registerTask('hotfix:finish:current', ['exec:finishCurrentHotfix']);

  grunt.registerTask('release:start', ['exec:startRelease']);
  grunt.registerTask('release:finish', ['build', 'exec:finishRelease']);
  grunt.registerTask('release:finish:current', ['build', 'exec:finishCurrentRelease']);

  grunt.registerTask('build', ['jshint', 'jsonlint', 'htmlhint', 'karma']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ['build']);

};
