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

  config["feature:list"] = { options: { flags: ["--verbose"] } };
  config["feature:start"] = { options: { flags: ["--showcommands", "--fetch"] } };
  config["feature:finish"] = { options: { flags: ["--showcommands", "--nokeep"] } };
  config["feature:publish"] = { options: { flags: ["--showcommands"] } };
  config["feature:track"] = { options: { flags: ["--showcommands"] } };
  config["feature:diff"] = { options: { flags: ["--showcommands"] } };
  config["feature:rebase"] = { options: { flags: ["--showcommands"] } };
  config["feature:checkout"] = { options: { flags: ["--showcommands"] } };
  config["feature:pull"] = { options: { flags: ["--showcommands"] } };

  config["release:list"] = { options: { flags: ["--verbose"] } };
  config["release:start"] = { options: { flags: ["--fetch --showcommands"] } };
  config["release:finish"] = { options: { flags: ["--showcommands", "--fetch", "--push"] } };
  config["release:publish"] = { options: { flags: ["--showcommands"] } };
  config["release:track"] = { options: { flags: ["--showcommands"] } };

  config["hotfix:list"] = { options: { flags: ["--verbose"] } };
  config["hotfix:start"] = { options: { flags: ["--fetch --showcommands"] } };
  config["hotfix:finish"] = { options: { flags: ["--showcommands", "--fetch", "--push"] } };
  config["hotfix:publish"] = { options: { flags: ["--showcommands"] } };

  grunt.initConfig(config);

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('build', ['test']);
  grunt.registerTask('lint', ['jshint', 'jsonlint', 'htmlhint']);
  grunt.registerTask('test', ['lint', 'karma']);
  grunt.registerTask('default', ['build']);

};
